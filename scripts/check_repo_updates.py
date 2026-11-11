#!/usr/bin/env python3
"""Relatorio de atualizacoes dos repositorios principais da Vitrine.

Le os 12 projetos definidos em assets/js/data.js, identifica o link do
"Repositorio principal" de cada um (sempre o primeiro item da lista
`links`) e consulta a API do GitHub para saber qual foi o ultimo commit
no branch padrao de cada repositorio.

Especificamente, o script compara o SHA do blob do arquivo README de
cada repositorio (e nao o ultimo commit do repositorio como um todo),
para apontar apenas os grupos cujo README mudou desde a ultima
verificacao - que e a fonte usada para alimentar os campos de data.js.

O resultado e comparado com o estado salvo na execucao anterior
(scripts/.repo-status-cache.json) e, ao final, os grupos com README
alterado sao gravados em repositorio_atualizados.txt (na raiz do
repositorio). Nenhum arquivo do site (data.js, imagens etc.) e alterado
por este script - e somente um relatorio.

Uso:
    python scripts/check_repo_updates.py

Autenticacao (necessaria para repositorios privados):
    O script tenta obter um token, nesta ordem:
      1. Variavel de ambiente GITHUB_TOKEN ou GH_TOKEN.
      2. `gh auth token`, se o GitHub CLI estiver instalado e logado
         (`gh auth login`).
    Sem token, apenas repositorios publicos sao verificados (e o limite
    da API cai para 60 requisicoes/hora).
"""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
import urllib.error
import urllib.request
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

ROOT_DIR = Path(__file__).resolve().parent.parent
DATA_JS_PATH = ROOT_DIR / "assets" / "js" / "data.js"
CACHE_PATH = Path(__file__).resolve().parent / ".repo-status-cache.json"
RELATORIO_PATH = ROOT_DIR / "repositorio_atualizados.txt"

GITHUB_API = "https://api.github.com"
GITHUB_URL_RE = re.compile(r'url:\s*"(https://github\.com/[^"/]+/[^"/]+)[^"]*"')
SLUG_RE = re.compile(r'slug:\s*"([^"]*)"')
NOME_RE = re.compile(r'nome:\s*"([^"]*)"')


@dataclass
class Projeto:
    slug: str
    nome: str
    owner: str
    repo: str
    repo_url: str


def extrair_projetos(conteudo: str) -> list[Projeto]:
    """Divide o array `projetos` em blocos de objeto de nivel superior.

    Usa contagem de chaves (profundidade) em vez de regex ganancioso,
    porque cada projeto tem objetos e listas aninhadas (integrantes,
    links, etc.) com o mesmo caractere `{`.
    """
    inicio_array = conteudo.index("const projetos")
    inicio_colchete = conteudo.index("[", inicio_array)

    blocos: list[str] = []
    profundidade = 0
    inicio_objeto = None
    dentro_string = False
    aspas = ""
    escapado = False

    i = inicio_colchete
    while i < len(conteudo):
        ch = conteudo[i]

        if dentro_string:
            if escapado:
                escapado = False
            elif ch == "\\":
                escapado = True
            elif ch == aspas:
                dentro_string = False
        else:
            if ch in ("'", '"', "`"):
                dentro_string = True
                aspas = ch
            elif ch == "{":
                if profundidade == 0:
                    inicio_objeto = i
                profundidade += 1
            elif ch == "}":
                profundidade -= 1
                if profundidade == 0 and inicio_objeto is not None:
                    blocos.append(conteudo[inicio_objeto : i + 1])
                    inicio_objeto = None
            elif ch == "]" and profundidade == 0:
                # Fim do array `projetos`.
                break

        i += 1

    projetos: list[Projeto] = []
    for bloco in blocos:
        slug_match = SLUG_RE.search(bloco)
        nome_match = NOME_RE.search(bloco)
        url_match = GITHUB_URL_RE.search(bloco)

        if not (slug_match and url_match):
            print(
                f"  [aviso] nao foi possivel extrair slug/URL de um bloco; "
                f"pulando. Trecho: {bloco[:80]!r}",
                file=sys.stderr,
            )
            continue

        repo_url = url_match.group(1)
        path_parts = urlparse(repo_url).path.strip("/").split("/")
        if len(path_parts) < 2:
            continue
        owner, repo = path_parts[0], path_parts[1]

        projetos.append(
            Projeto(
                slug=slug_match.group(1),
                nome=nome_match.group(1) if nome_match else slug_match.group(1),
                owner=owner,
                repo=repo,
                repo_url=f"https://github.com/{owner}/{repo}",
            )
        )

    return projetos


def localizar_gh() -> str | None:
    """Procura o executavel `gh` no PATH e em locais comuns de instalacao.

    Necessario porque o PATH da maquina so e atualizado em terminais
    abertos *depois* da instalacao do GitHub CLI; um terminal ja aberto
    (ou um processo filho herdando o ambiente antigo) nao encontra `gh`
    mesmo que ele esteja instalado.
    """
    encontrado = shutil.which("gh")
    if encontrado:
        return encontrado

    candidatos = [
        Path(os.environ.get("ProgramFiles", r"C:\Program Files")) / "GitHub CLI" / "gh.exe",
        Path(os.environ.get("ProgramFiles(x86)", r"C:\Program Files (x86)")) / "GitHub CLI" / "gh.exe",
        Path.home() / "AppData/Local/Microsoft/WinGet/Packages",  # verificado abaixo via glob
    ]
    for candidato in candidatos[:2]:
        if candidato.is_file():
            return str(candidato)

    winget_dir = candidatos[2]
    if winget_dir.is_dir():
        for gh_exe in winget_dir.glob("GitHub.cli_*/gh.exe"):
            return str(gh_exe)

    return None


def obter_token() -> tuple[str | None, str]:
    """Retorna (token, origem) tentando env vars e depois o GitHub CLI."""
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if token:
        return token, "variavel de ambiente"

    gh_path = localizar_gh()
    if not gh_path:
        return None, "nenhum"

    try:
        resultado = subprocess.run(
            [gh_path, "auth", "token"],
            capture_output=True,
            text=True,
            timeout=10,
            check=False,
        )
        token = resultado.stdout.strip()
        if resultado.returncode == 0 and token:
            return token, f"gh auth token ({gh_path})"
    except (FileNotFoundError, subprocess.TimeoutExpired):
        pass

    return None, "nenhum"


def github_get(path: str, token: str | None) -> dict:
    req = urllib.request.Request(f"{GITHUB_API}{path}")
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("User-Agent", "vitrine-check-repo-updates")
    if token:
        req.add_header("Authorization", "Bearer " + token)
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode("utf-8"))


def consultar_readme(projeto: Projeto, token: str | None) -> dict:
    """Retorna metadados do README (sha do blob, caminho e URL), sem
    baixar o conteudo completo - usado para detectar mudanca."""
    readme_info = github_get(f"/repos/{projeto.owner}/{projeto.repo}/readme", token)
    return {
        "repo_url": projeto.repo_url,
        "readme_path": readme_info.get("path", ""),
        "readme_sha": readme_info.get("sha", ""),
        "readme_html_url": readme_info.get("html_url", ""),
    }


def consultar_ultimo_commit_do_readme(projeto: Projeto, readme_path: str, token: str | None) -> dict:
    """Busca data/mensagem do ultimo commit que tocou o README. So e
    chamado para os repositorios que mudaram, para enriquecer o relatorio."""
    commits = github_get(
        f"/repos/{projeto.owner}/{projeto.repo}/commits?path={readme_path}&per_page=1",
        token,
    )
    if not commits:
        return {"commit_date": "", "commit_message": ""}
    commit = commits[0].get("commit", {})
    mensagem = commit.get("message", "")
    return {
        "commit_date": commit.get("author", {}).get("date", ""),
        "commit_message": mensagem.splitlines()[0] if mensagem else "",
    }


def carregar_cache() -> dict:
    if CACHE_PATH.exists():
        return json.loads(CACHE_PATH.read_text(encoding="utf-8"))
    return {}


def salvar_cache(cache: dict) -> None:
    CACHE_PATH.write_text(
        json.dumps(cache, indent=2, ensure_ascii=False, sort_keys=True),
        encoding="utf-8",
    )


def escrever_relatorio_txt(
    mudaram: list[tuple["Projeto", dict, dict | None]],
    verificado_em: str,
) -> None:
    linhas = [
        "Relatorio de READMEs atualizados - Vitrine",
        f"Gerado em: {verificado_em}",
        "",
    ]

    if not mudaram:
        linhas.append("Nenhum repositorio teve o README alterado desde a ultima verificacao.")
    else:
        linhas.append(f"{len(mudaram)} grupo(s) com README atualizado:")
        linhas.append("")
        for projeto, atual, anterior in mudaram:
            linhas.append(f"- {projeto.nome} [{projeto.slug}]")
            linhas.append(f"  Repositorio: {projeto.repo_url}")
            linhas.append(f"  README: {atual.get('readme_html_url') or projeto.repo_url}")
            if anterior is None:
                linhas.append("  Motivo: primeira verificacao (sem historico anterior)")
            else:
                linhas.append("  Motivo: novo commit no README")
            if atual.get("commit_date"):
                linhas.append(f"  Ultima alteracao: {atual['commit_date']}")
            if atual.get("commit_message"):
                linhas.append(f"  Ultimo commit: {atual['commit_message']}")
            linhas.append("")

    RELATORIO_PATH.write_text("\n".join(linhas).rstrip() + "\n", encoding="utf-8")


def main() -> int:
    # Evita mojibake ao imprimir acentos no console do Windows (cp1252/cp437).
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8")

    token, origem_token = obter_token()
    if token:
        print(f"[info] autenticado via {origem_token}.\n", file=sys.stderr)
    else:
        print(
            "[aviso] nenhum token do GitHub encontrado (defina GITHUB_TOKEN "
            "ou faca login com `gh auth login`). Repositorios privados vao "
            "aparecer como erro 404 e o limite cai para 60 requisicoes/hora.\n",
            file=sys.stderr,
        )

    conteudo = DATA_JS_PATH.read_text(encoding="utf-8")
    projetos = extrair_projetos(conteudo)

    if not projetos:
        print("Nenhum projeto encontrado em data.js.", file=sys.stderr)
        return 1

    cache = carregar_cache()
    novo_cache = dict(cache)

    mudaram: list[tuple[Projeto, dict, dict | None]] = []
    sem_mudanca: list[Projeto] = []
    com_erro: list[tuple[Projeto, str]] = []

    for projeto in projetos:
        try:
            estado_atual = consultar_readme(projeto, token)
        except urllib.error.HTTPError as exc:
            restante = exc.headers.get("X-RateLimit-Remaining") if exc.headers else None
            if exc.code in (403, 429) and restante == "0":
                reset = exc.headers.get("X-RateLimit-Reset")
                com_erro.append((projeto, "limite de requisicoes da API esgotado"))
                print(
                    "\n[erro] Limite de requisicoes da API do GitHub esgotado "
                    f"(reset em {reset or '?'}, epoch Unix). "
                    "Interrompendo verificacoes restantes - rode novamente "
                    "mais tarde ou com um token autenticado (veja o aviso "
                    "acima sobre GITHUB_TOKEN / gh auth login).\n",
                    file=sys.stderr,
                )
                for restante_projeto in projetos[projetos.index(projeto) + 1 :]:
                    com_erro.append((restante_projeto, "nao verificado (limite de API esgotado)"))
                break
            if exc.code == 404:
                com_erro.append((projeto, "README nao encontrado (404)"))
            else:
                com_erro.append((projeto, f"HTTP {exc.code} ({exc.reason})"))
            continue
        except urllib.error.URLError as exc:
            com_erro.append((projeto, str(exc.reason)))
            continue

        estado_anterior = cache.get(projeto.slug)
        mudou = estado_anterior is None or estado_anterior.get("readme_sha") != estado_atual["readme_sha"]

        if mudou:
            try:
                enriquecido = consultar_ultimo_commit_do_readme(
                    projeto, estado_atual["readme_path"], token
                )
                estado_atual.update(enriquecido)
            except (urllib.error.HTTPError, urllib.error.URLError):
                pass  # relatorio ainda funciona sem essa informacao extra
            mudaram.append((projeto, estado_atual, estado_anterior))
        else:
            sem_mudanca.append(projeto)

        novo_cache[projeto.slug] = estado_atual

    salvar_cache(novo_cache)
    verificado_em = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    escrever_relatorio_txt(mudaram, verificado_em)

    print(f"Relatorio de atualizacoes - {len(projetos)} grupo(s) verificado(s)\n")

    if mudaram:
        print(f"README MUDOU ({len(mudaram)}):")
        for projeto, atual, anterior in mudaram:
            motivo = "primeira verificacao (sem histórico anterior)" if anterior is None else "novo commit no README"
            print(f"  - {projeto.nome} [{projeto.slug}] ({motivo})")
            print(f"      repo: {projeto.repo_url}")
            if atual.get("commit_date"):
                print(f"      ultima alteracao: {atual['commit_date']}")
            if atual.get("commit_message"):
                print(f"      ultimo commit: {atual['commit_message']}")
        print()
    else:
        print("README MUDOU (0): nenhum grupo com README atualizado.\n")

    print(f"[info] relatorio salvo em {RELATORIO_PATH}\n", file=sys.stderr)

    if sem_mudanca:
        print(f"SEM MUDANCA ({len(sem_mudanca)}):")
        for projeto in sem_mudanca:
            print(f"  - {projeto.nome} [{projeto.slug}]")
        print()

    if com_erro:
        print(f"ERRO AO VERIFICAR ({len(com_erro)}):")
        for projeto, erro in com_erro:
            print(f"  - {projeto.nome} [{projeto.slug}]: {erro} ({projeto.repo_url})")
        if not token:
            print(
                "    (sem token de autenticacao: se algum destes for "
                "privado, configure GITHUB_TOKEN ou rode `gh auth login` "
                "e execute novamente)"
            )
        print()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
