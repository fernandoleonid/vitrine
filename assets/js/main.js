"use strict";

const app = document.getElementById("app");
const menu = document.getElementById("menu");
const botaoMenu = document.getElementById("menu-toggle");

const estado = {
  periodo: "Todos",
  enviado: false,
};

const ICONES = {
  arrow: "fas fa-arrow-right",
  chevron: "fas fa-chevron-down",
  menu: "fas fa-bars",
  close: "fas fa-times",
  code: "fas fa-code",
  users: "fas fa-users",
  briefcase: "fas fa-briefcase",
  layers: "fas fa-layer-group",
  check: "fas fa-check",
  external: "fas fa-external-link-alt",
  mail: "fas fa-envelope",
  calendar: "fas fa-calendar-alt",
  clock: "fas fa-clock",
  linkedin: "fab fa-linkedin",
};

const ICONES_TECNOLOGIAS = {
  html: "fab fa-html5",
  html5: "fab fa-html5",
  css: "fab fa-css3-alt",
  css3: "fab fa-css3-alt",
  javascript: "fab fa-js",
  js: "fab fa-js",
  react: "fab fa-react",
  "node.js": "fab fa-node-js",
  node: "fab fa-node-js",
  mysql: "fas fa-database",
  kotlin: "fas fa-code",
  "android studio": "fab fa-android",
  "api rest": "fas fa-server",
  rest: "fas fa-server",
  vite: "fas fa-bolt",
  "next.js": "fas fa-layer-group",
  "inteligência artificial": "fas fa-brain",
  "inteligencia artificial": "fas fa-brain",
};

function icone(nome, tamanho = 20) {
  const classe = ICONES[nome] || `fas ${nome}`;
  const estilo = `style="display: inline-block; font-size: ${tamanho}px; width: ${tamanho}px; text-align: center;"`;
  return `<i class="${classe}" aria-hidden="true" ${estilo}></i>`;
}

function iconeTecnologia(tecnologia) {
  const chave = tecnologia.trim().toLocaleLowerCase("pt-BR");
  const classe = ICONES_TECNOLOGIAS[chave] || "fas fa-code";
  return `<i class="${classe}" aria-hidden="true"></i>`;
}

function botaoLink(destino, conteudo, variante = "primary", extra = "") {
  return `<a href="${destino}" class="button button--${variante} ${extra}">${conteudo}</a>`;
}

function tituloSecao({ sobretitulo, titulo, texto, alinhamento = "left" }) {
  return `
    <div class="section-title section-title--${alinhamento}">
      <span class="eyebrow">${sobretitulo}</span>
      <h2>${titulo}</h2>
      ${texto ? `<p>${texto}</p>` : ""}
    </div>`;
}

function heroPagina({ sobretitulo, titulo, texto }) {
  return `
    <section class="page-hero">
      <div class="page-hero-lines"></div>
      <div class="container">
        <span class="eyebrow eyebrow--light">${sobretitulo}</span>
        <h1>${titulo}</h1>
        <p>${texto}</p>
      </div>
    </section>`;
}

function textoEdicao() {
  return `${edicaoAtual.ano} · ${edicaoAtual.semestre}`;
}

function etiquetasProjeto(projeto) {
  return projeto.tecnologias.length ? projeto.tecnologias : projeto.areas;
}

function tagsIntegrantes(projeto) {
  const integrantes = projeto.integrantes
    .map((integrante) => ({
      ...integrante,
      nome: integrante.nome.trim().split(/\s+/).slice(0, 2).join(" "),
    }))
    .filter(({ nome }) => nome);

  if (!integrantes.length) return "";
  return `<div class="tags">${integrantes
    .map(({ nome, link }) =>
      link
        ? `<a href="${link}" target="_blank" rel="noopener noreferrer" aria-label="Perfil de ${nome}">${nome}</a>`
        : `<span>${nome}</span>`
    )
    .join("")}</div>`;
}

function estadoVazio(titulo, texto) {
  return `
    <div class="empty-state">
      <span class="eyebrow">Acervo em catalogação</span>
      <h3>${titulo}</h3>
      <p>${texto}</p>
    </div>`;
}

function tags(lista, classe = "") {
  if (!lista.length) return "";
  return `<div class="tags ${classe}">${lista
    .map((item) => `<span>${item}</span>`)
    .join("")}</div>`;
}

function visualProjeto(projeto, grande = false) {
  const numero = String(projetos.indexOf(projeto) + 1).padStart(2, "0");
  const videoPitch = grande ? urlVideoPitch(projeto.videoPitch) : "";

  if (videoPitch) {
    return `
      <div class="project-visual project-visual--large">
        <iframe src="${videoPitch}" title="Vídeo pitch do projeto ${projeto.nome}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
      </div>`;
  }

  if (projeto.imagem) {
    const imagem =
      window.location.hostname === "fernandoleonid.github.io"
        ? `/vitrine/${projeto.imagem.replace(/^\.\//, "")}`
        : projeto.imagem;

    return `
      <div class="project-visual ${grande ? "project-visual--large" : ""}">
        <img class="visual-imagem ${projeto.imagemAjuste === "contain" ? "visual-imagem--contain" : ""}" src="${imagem}"
             alt="Imagem do projeto ${projeto.nome}" loading="lazy" />
      </div>`;
  }

  return `
    <div class="project-visual accent-${projeto.destaque} ${grande ? "project-visual--large" : ""}"
         role="img"
         aria-label="Ilustração abstrata do projeto ${projeto.nome}">
      <div class="visual-grid"></div>
      <span class="visual-orb visual-orb--one"></span>
      <span class="visual-orb visual-orb--two"></span>
      <div class="visual-window">
        <span></span><span></span><span></span>
        <div class="visual-chart"><i></i><i></i><i></i><i></i></div>
      </div>
      <span class="visual-index">${numero}</span>
    </div>`;
}

function urlVideoPitch(valor) {
  if (typeof valor !== "string" || !valor.trim()) return "";

  let url;
  try {
    url = new URL(valor);
  } catch {
    return "";
  }

  let id = "";
  if (url.hostname === "youtu.be") {
    id = url.pathname.split("/")[1] || "";
  } else if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname)) {
    if (url.pathname === "/watch") {
      id = url.searchParams.get("v") || "";
    } else {
      id = url.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)\/?$/)?.[1] || "";
    }
  }

  return /^[\w-]{11}$/.test(id)
    ? `https://www.youtube-nocookie.com/embed/${id}`
    : "";
}

function cardProjeto(projeto) {
  return `
    <article class="project-card">
      ${visualProjeto(projeto)}
      <div class="project-card__body">
        <div class="card-meta">
          <span>${projeto.categoria}</span>
          <span>Turma&nbsp;${projeto.turma}</span>
        </div>
        <h3>${projeto.nome}</h3>
        <p>${projeto.descricaoCurta}</p>
        ${tagsIntegrantes(projeto)}
        <a href="#/projeto/${projeto.slug}" class="card-link">
          Conhecer projeto ${icone("arrow", 18)}
        </a>
      </div>
    </article>`;
}

function previaAcervo() {
  const cards = acervo
    .map(
      (item, indice) => `
      <a href="#/acervo" class="archive-card">
        <span class="archive-number">0${acervo.length - indice}</span>
        <div>
          <small>Edição</small>
          <h3>${item.edicao}</h3>
          <p>${item.quantidade} projetos · ${item.temas.slice(0, 2).join(" e ")}</p>
        </div>
        <span class="round-arrow">${icone("chevron")}</span>
      </a>`
    )
    .join("");

  const conteudo = acervo.length
    ? `<div class="archive-grid">${cards}</div>`
    : estadoVazio(
        "Os projetos de semestres anteriores serão publicados aqui.",
        "A estrutura do acervo está pronta e será preenchida à medida que as edições anteriores forem catalogadas."
      );

  const botao = acervo.length
    ? botaoLink("#/acervo", `Ver acervo completo ${icone("arrow", 18)}`, "text")
    : "";

  return `
    <section class="section archive-preview">
      <div class="container">
        <div class="section-head">
          ${tituloSecao({
            sobretitulo: "Memória e evolução",
            titulo: "Projetos de semestres anteriores",
            texto:
              "Acompanhe a evolução das ideias, tecnologias e talentos ao longo das edições.",
          })}
          ${botao}
        </div>
        ${conteudo}
      </div>
    </section>`;
}

function paginaInicio() {
  const pontosEmpresa = [
    ["Conheça novos talentos", "em início de carreira."],
    ["Compartilhe sua visão", "sobre produto e tecnologia."],
    ["Fortaleça a formação", "profissional na região."],
  ]
    .map(
      ([destaque, resto]) => `
      <div>
        <span>${icone("check")}</span>
        <p><strong>${destaque}</strong> ${resto}</p>
      </div>`
    )
    .join("");

  return `
    <main>
      <section class="section projects-section" id="projetos">
        <div class="container">
          <div class="section-head">
            ${tituloSecao({
              sobretitulo: "Portfólio da edição",
              titulo: "Projetos do semestre",
              texto:
                "Soluções criadas por estudantes para desafios observados em diferentes contextos e setores.",
            })}
            <div class="edition-chip"><span>${edicaoAtual.ano}</span><strong>${edicaoAtual.numero}</strong></div>
          </div>
          <div class="projects-grid">${projetos.map(cardProjeto).join("")}</div>
        </div>
      </section>

      <section class="section company-section">
        <div class="container company-card">
          <div class="company-copy">
            <span class="eyebrow eyebrow--light">Conexão com o mercado</span>
            <h2>Sua experiência pode fazer parte desta jornada.</h2>
            <p>
              Gestores, recrutadores e profissionais de tecnologia são
              convidados a conhecer os projetos e contribuir com uma banca de
              TCC.
            </p>
            ${botaoLink("#/banca", `Quero participar ${icone("arrow", 19)}`, "secondary")}
          </div>
          <div class="company-points">${pontosEmpresa}</div>
        </div>
      </section>

      ${previaAcervo()}
    </main>`;
}

function paginaProjeto(projeto) {
  const proximo = projetos[(projetos.indexOf(projeto) + 1) % projetos.length];
  const marcas = (lista) =>
    lista.map((item) => `<div>${icone("check", 18)}<span>${item}</span></div>`).join("");

  const blocos = [];

  if (projeto.problema) {
    blocos.push(["O problema", `<p>${projeto.problema}</p>`]);
  }
  if (projeto.solucao) {
    blocos.push(["A solução", `<p>${projeto.solucao}</p>`]);
  }
  if (projeto.funcionalidades.length) {
    blocos.push([
      "Principais funcionalidades",
      `<div class="features-grid">${marcas(projeto.funcionalidades)}</div>`,
    ]);
  }
  if (projeto.ods.length) {
    blocos.push([
      "Alinhamento com as ODS da ONU",
      `<div class="features-grid">${marcas(projeto.ods)}</div>`,
    ]);
  }
  if (projeto.tecnologias.length) {
    const lista = projeto.tecnologias
      .map(
        (tec, indice) => `
        <div>
          <span>0${indice + 1}</span>
          <strong>${iconeTecnologia(tec)}${tec}</strong>
        </div>`
      )
      .join("");
    blocos.push(["Tecnologias utilizadas", `<div class="tech-detail">${lista}</div>`]);
  }
  if (projeto.links.length) {
    const lista = projeto.links
      .map(
        (item) =>
          `<a href="${item.url}" target="_blank" rel="noopener noreferrer"><span>${item.rotulo}</span>${icone("external", 16)}</a>`
      )
      .join("");
    blocos.push(["Links do projeto", `<div class="features-grid">${lista}</div>`]);
  }
  if (projeto.integrantes.length) {
    const lista = projeto.integrantes
      .map(
        (pessoa, indice) => `
        <article>
          <div class="member-avatar accent-${projeto.destaque}">${String.fromCharCode(65 + indice)}</div>
          <small>${pessoa.funcao}</small>
          <h3>${pessoa.nome}</h3>
          ${pessoa.contribuicao ? `<p>${pessoa.contribuicao}</p>` : ""}
          ${
            pessoa.link
              ? `<a class="profile-placeholder" href="${pessoa.link}" target="_blank" rel="noopener noreferrer">${icone("linkedin", 16)} Perfil profissional</a>`
              : `<span class="profile-placeholder">${icone("linkedin", 16)} Link profissional mediante autorização</span>`
          }
        </article>`
      )
      .join("");
    blocos.push(["Equipe", `<div class="member-grid">${lista}</div>`]);
  }
  if (!blocos.length) {
    blocos.push([
      "Informações em atualização",
      "<p>Os detalhes deste projeto estão sendo organizados pela equipe e serão publicados em breve.</p>",
    ]);
  }

  const blocosHtml = blocos
    .map(
      ([titulo, corpo], indice) => `
      <div class="content-block">
        <span class="block-number">${String(indice + 1).padStart(2, "0")}</span>
        <div>
          <h2>${titulo}</h2>
          ${corpo}
        </div>
      </div>`
    )
    .join("");

  return `
    <main>
      <section class="project-hero">
        <div class="container">
          <a href="#/" class="back-link">← Voltar para projetos</a>
          <div class="project-hero-grid">
            <div>
              <div class="hero-kicker">
                <span class="status-dot"></span> Turma ${projeto.turma} · Edição ${textoEdicao()}
              </div>
              <span class="eyebrow">${projeto.categoria}</span>
              <h1>${projeto.nome}</h1>
              <p>${projeto.descricaoCurta}</p>
              ${tags(etiquetasProjeto(projeto), "tags--large")}
            </div>
            ${visualProjeto(projeto, true)}
          </div>
        </div>
      </section>

      <section class="section project-detail">
        <div class="container project-content">
          <div class="detail-main">${blocosHtml}</div>

          <aside class="project-aside">
            <span class="eyebrow">Ficha do projeto</span>
            <dl>
              <div><dt>Edição</dt><dd>${textoEdicao()}</dd></div>
              ${projeto.equipe ? `<div><dt>Equipe</dt><dd>${projeto.equipe}</dd></div>` : ""}
              <div><dt>Turma</dt><dd>Período da ${projeto.turma.toLowerCase()}</dd></div>
              <div><dt>Curso</dt><dd>Desenvolvimento de Sistemas</dd></div>
              ${projeto.inicio ? `<div><dt>Início</dt><dd>${projeto.inicio}</dd></div>` : ""}
              <div>
                <dt>Status</dt>
                <dd><span class="status-dot"></span> ${projeto.status}</dd>
              </div>
            </dl>
            ${botaoLink("#/banca", `Participar da banca ${icone("arrow", 18)}`)}
          </aside>
        </div>
      </section>

      <section class="next-project">
        <div class="container">
          <span>Próximo projeto</span>
          <a href="#/projeto/${proximo.slug}">
            <strong>${proximo.nome}</strong>
            ${icone("arrow", 28)}
          </a>
        </div>
      </section>
    </main>`;
}

function paginaNaoEncontrada() {
  return heroPagina({
    sobretitulo: "Projeto não encontrado",
    titulo: "Este projeto não está no catálogo.",
    texto:
      "Volte para a página inicial e conheça os projetos disponíveis nesta edição.",
  });
}

function paginaAcervo() {
  const anos = [...new Set(acervo.map((item) => item.edicao.split(" · ")[0]))];
  const periodos = ["Todos", ...anos];

  const botoes = periodos
    .map(
      (periodo) =>
        `<button type="button" data-periodo="${periodo}" class="${estado.periodo === periodo ? "active" : ""}">${periodo}</button>`
    )
    .join("");

  const totalProjetos = acervo.reduce((soma, item) => soma + item.quantidade, 0);
  const resumo =
    estado.periodo === "Todos"
      ? `${totalProjetos} projetos em ${acervo.length} edições`
      : `Edições de ${estado.periodo}`;

  const itens = acervo
    .filter((item) => estado.periodo === "Todos" || item.edicao.startsWith(estado.periodo))
    .map((item, indice) => {
      const [ano, semestre] = item.edicao.split(" · ");
      return `
      <article>
        <div class="archive-year">
          <span>${ano}</span>
          <strong>${semestre}</strong>
        </div>
        <div class="archive-info">
          <small>Edição anterior</small>
          <h2>${item.edicao}</h2>
          <p>Uma coleção de projetos acadêmicos em ${item.temas.join(", ")}.</p>
          ${tags(item.temas)}
        </div>
        <div class="archive-total">
          <strong>${item.quantidade}</strong>
          <span>projetos</span>
          <button type="button" aria-label="Ver edição ${item.edicao}">${icone("arrow")}</button>
        </div>
        <span class="archive-list-index">0${indice + 1}</span>
      </article>`;
    })
    .join("");

  const conteudo = acervo.length
    ? `
      <div class="filter-bar">
        <div>${botoes}</div>
        <span>${resumo}</span>
      </div>
      <div class="archive-list">${itens}</div>`
    : estadoVazio(
        "Ainda não há edições anteriores catalogadas.",
        "Esta página está pronta para receber o histórico de projetos. Assim que as edições forem catalogadas, elas aparecerão aqui, organizadas por período."
      );

  return `
    <main>
      ${heroPagina({
        sobretitulo: "Acervo histórico",
        titulo: "Ideias que contam uma história.",
        texto:
          "Explore projetos de edições anteriores e acompanhe como nossos estudantes transformaram aprendizado em soluções.",
      })}
      <section class="section archive-page">
        <div class="container">${conteudo}</div>
      </section>
    </main>`;
}

function paginaSobre() {
  const principios = [
    ["01", "Protagonismo", "Cada estudante é apresentado como profissional em formação, com suas competências e contribuições."],
    ["02", "Aplicação prática", "Os projetos conectam conhecimentos técnicos a problemas e oportunidades do mundo real."],
    ["03", "Conexão", "A vitrine cria pontes entre a escola, profissionais, empresas e a comunidade de Jandira."],
  ]
    .map(
      ([numero, titulo, texto]) => `
      <article>
        <span>${numero}</span>
        <h3>${titulo}</h3>
        <p>${texto}</p>
      </article>`
    )
    .join("");

  return `
    <main>
      ${heroPagina({
        sobretitulo: "Sobre a iniciativa",
        titulo: "Uma vitrine para o presente. Um impulso para o futuro.",
        texto:
          "Um espaço criado para dar visibilidade ao processo, às soluções e, principalmente, aos talentos em formação.",
      })}

      <section class="section about-intro">
        <div class="container about-grid">
          <div>
            <span class="eyebrow">O que nos move</span>
            <h2>Aprender fazendo.<br />E mostrar o que se faz.</h2>
          </div>
          <div>
            <p>
              Esta vitrine apresenta trabalhos de conclusão do curso de
              Desenvolvimento de Sistemas das turmas da manhã e da tarde. A
              proposta aproxima estudantes, comunidade e mercado por meio de
              projetos que partem de desafios relevantes.
            </p>
            <p>
              A estrutura está preparada para receber os projetos de cada
              edição, com a identificação das equipes e dos integrantes
              mediante consentimento e revisão institucional.
            </p>
          </div>
        </div>
      </section>

      <section class="section principles">
        <div class="container">
          ${tituloSecao({
            sobretitulo: "Nossos princípios",
            titulo: "Tecnologia com propósito e autoria.",
            alinhamento: "center",
          })}
          <div class="principles-grid">${principios}</div>
        </div>
      </section>

      <section class="section about-course">
        <div class="container company-card">
          <div class="company-copy">
            <span class="eyebrow eyebrow--light">Formação profissional</span>
            <h2>Desenvolvimento de Sistemas</h2>
            <p>
              Uma formação orientada à criação de soluções digitais, combinando
              lógica, programação, bancos de dados, experiência do usuário e
              práticas de projetos.
            </p>
          </div>
          <div class="course-stats">
            <div><strong>2</strong><span>períodos<br />manhã e tarde</span></div>
            <div><strong>${projetos.length}</strong><span>projetos<br />nesta edição</span></div>
          </div>
        </div>
      </section>
    </main>`;
}

function formularioBanca() {
  return `
    <form id="form-banca">
      <div class="form-head">
        <span>Formulário de interesse</span>
        <strong>Conte um pouco sobre você.</strong>
        <p>Os campos abaixo são apenas demonstrativos nesta versão.</p>
      </div>
      <label>
        Nome completo
        <input required placeholder="Como podemos chamar você?" />
      </label>
      <label>
        E-mail profissional
        <input required type="email" placeholder="nome@empresa.com.br" />
      </label>
      <div class="form-row">
        <label>Empresa <input placeholder="Nome da organização" /></label>
        <label>Cargo <input placeholder="Sua função" /></label>
      </div>
      <label>
        Área de atuação
        <select>
          <option value="" disabled selected>Selecione uma área</option>
          <option>Desenvolvimento</option>
          <option>Produto e Design</option>
          <option>Dados</option>
          <option>Gestão de Tecnologia</option>
          <option>Recrutamento</option>
          <option>Outra área</option>
        </select>
      </label>
      <label>
        Mensagem <span>(opcional)</span>
        <textarea rows="4" placeholder="Compartilhe sua motivação ou disponibilidade."></textarea>
      </label>
      <button type="submit" class="button button--primary">
        Enviar interesse ${icone("arrow", 18)}
      </button>
      <small class="privacy-note">
        Ao enviar, você concorda com o uso destes dados para contato sobre as bancas.
      </small>
    </form>`;
}

function confirmacaoBanca() {
  return `
    <div class="form-success">
      <span>${icone("check", 28)}</span>
      <h2>Interesse registrado</h2>
      <p>
        Esta é uma confirmação demonstrativa. Em uma versão publicada, os dados
        seriam enviados ao canal oficial definido pela instituição.
      </p>
      <button type="button" data-acao="novo-envio">Preencher novamente</button>
    </div>`;
}

function paginaBanca() {
  const passos = [
    ["mail", "01", "Manifeste seu interesse", "Conte brevemente sobre seu perfil e área de atuação."],
    ["calendar", "02", "Alinhamos a agenda", "A equipe responsável entra em contato com datas e orientações."],
    ["users", "03", "Conheça os projetos", "Participe da apresentação e contribua com sua experiência."],
  ]
    .map(
      ([nomeIcone, numero, titulo, texto]) => `
      <div>
        <span>${icone(nomeIcone)}</span>
        <div>
          <small>${numero}</small>
          <h3>${titulo}</h3>
          <p>${texto}</p>
        </div>
      </div>`
    )
    .join("");

  return `
    <main>
      ${heroPagina({
        sobretitulo: "Conexão com o mercado",
        titulo: "Participe da banca. Amplie perspectivas.",
        texto:
          "Compartilhe sua experiência, conheça novos talentos e contribua para a formação de profissionais de tecnologia.",
      })}
      <section class="section jury-section">
        <div class="container jury-grid">
          <div class="jury-info">
            ${tituloSecao({
              sobretitulo: "Como funciona",
              titulo: "Uma troca que transforma.",
              texto:
                "A participação é uma oportunidade de dialogar com as equipes, avaliar suas soluções e oferecer feedbacks para a próxima etapa profissional.",
            })}
            <div class="jury-steps">${passos}</div>
            <div class="jury-note">
              ${icone("clock")}
              <p>
                <strong>Participação voluntária</strong><br />
                Datas, formato e duração serão confirmados pela organização.
              </p>
            </div>
          </div>
          <div class="jury-form-card" id="cartao-banca">
            ${estado.enviado ? confirmacaoBanca() : formularioBanca()}
          </div>
        </div>
      </section>
    </main>`;
}

function obterRota() {
  const hash = window.location.hash.replace("#/", "");
  if (hash.startsWith("projeto/")) return { tipo: "projeto", slug: hash.split("/")[1] };
  if (hash === "acervo") return { tipo: "acervo" };
  if (hash === "sobre") return { tipo: "sobre" };
  if (hash === "banca") return { tipo: "banca" };
  return { tipo: "home" };
}

function montarPagina(rota) {
  switch (rota.tipo) {
    case "acervo":
      return paginaAcervo();
    case "sobre":
      return paginaSobre();
    case "banca":
      return paginaBanca();
    case "projeto": {
      const projeto = projetos.find((item) => item.slug === rota.slug);
      return projeto ? paginaProjeto(projeto) : paginaNaoEncontrada();
    }
    default:
      return paginaInicio();
  }
}

function marcarMenuAtivo(rota) {
  menu.querySelectorAll("a[data-rota]").forEach((link) => {
    link.classList.toggle("active", link.dataset.rota === rota.tipo);
  });
}

function renderizar() {
  const rota = obterRota();
  app.innerHTML = montarPagina(rota);
  marcarMenuAtivo(rota);
}

function definirMenu(aberto) {
  menu.classList.toggle("is-open", aberto);
  botaoMenu.setAttribute("aria-expanded", String(aberto));
  botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  botaoMenu.innerHTML = icone(aberto ? "close" : "menu");
}

botaoMenu.addEventListener("click", () => {
  definirMenu(!menu.classList.contains("is-open"));
});

menu.addEventListener("click", () => definirMenu(false));

window.addEventListener("hashchange", () => {

  if (window.location.hash === "#projetos" && app.querySelector("#projetos")) return;

  renderizar();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

app.addEventListener("click", (evento) => {
  const botaoPeriodo = evento.target.closest("[data-periodo]");
  if (botaoPeriodo) {
    estado.periodo = botaoPeriodo.dataset.periodo;
    renderizar();
    return;
  }

  if (evento.target.closest("[data-acao='novo-envio']")) {
    estado.enviado = false;
    renderizar();
  }
});

app.addEventListener("submit", (evento) => {
  if (evento.target.id !== "form-banca") return;
  evento.preventDefault();
  estado.enviado = true;
  renderizar();
});

document.querySelectorAll("[data-icone]").forEach((marcador) => {
  marcador.outerHTML = icone(marcador.dataset.icone, Number(marcador.dataset.tamanho) || 20);
});

definirMenu(false);
renderizar();