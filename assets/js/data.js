"use strict";

/* ==========================================================
   data.js
   Conteúdo da vitrine. Para editar a página, altere apenas
   este arquivo.
   ========================================================== */

// Edição exibida na vitrine
const edicaoAtual = { ano: 2026, semestre: "2º semestre", numero: "02" };

/*
  MODELO DE PROJETO (copie e preencha)
  Campos vazios ("" ou []) não aparecem na página do projeto.

  {
    slug: "nome-sem-espacos",
    nome: "",
    equipe: "",                 // empresa ou equipe do projeto
    categoria: "",
    turma: "Manhã",             // "Manhã" ou "Tarde"
    descricaoCurta: "",
    status: "Em desenvolvimento",
    inicio: "",                 // ex.: "10/08/2026"
    areas: [],                  // ex.: ["Front-end", "Back-end", "Mobile"]
    tecnologias: [],            // quando preenchido, substitui "areas" nas etiquetas
    destaque: "cyan",           // cyan, blue, violet, green, orange ou pink
    problema: "",
    solucao: "",
    funcionalidades: [],
    ods: [],
    integrantes: [{ nome: "", funcao: "", contribuicao: "", link: "" }],
    links: [{ rotulo: "", url: "" }],
  }
*/

const projetos = [
  {
    slug: "fimap",
    nome: "Fimap", 
    equipe: "", 
    categoria: "A definir", 
    turma: "Manhã",
    descricaoCurta: "A Fimap é uma aplicação destinada ao mercado financeiro que tem como público alvo pessoas com necessidades de manipular seu dinheiro de uma melhor maneira, assim como entender sobre questões financeiras de maneira orgânica.", 
    status: "A definir", 
    inicio: "",
    areas: [],
    tecnologias: [],
    destaque: "cyan",
    problema: "",
    solucao: "",
    funcionalidades: [],
    ods: [],
    integrantes: [],
    links: [{ rotulo: "Repositório no GitHub", url: "https://github.com/Thuzs/Fimap" }],
  },
  {
    slug: "ecowayer",
    nome: "EcoWayer",
    imagem: "./assets/images/2026-2/ecowayer.svg",
    equipe: "Meraki",
    categoria: "Sustentabilidade e Economia Circular",
    turma: "Manhã",
    descricaoCurta:
      "Plataforma de economia circular que conecta pessoas e empresas para facilitar o descarte e o reaproveitamento de materiais.",
    status: "Em desenvolvimento",
    inicio: "10/08/2026",
    areas: ["Front-end", "Back-end", "Mobile"],
    tecnologias: [], // EDITAR: tecnologias utilizadas
    destaque: "green",
    problema: "", // EDITAR
    solucao:
      "Aplicativo em que os usuários encontram pontos de coleta seletiva e negociam itens recicláveis ou reutilizáveis por meio de doações, trocas ou vendas, com chat em tempo real moderado por inteligência artificial. Um sistema de recompensas converte ações ecológicas em pontos, que se transformam em cupons de desconto em parceiros.",
    funcionalidades: [
      "Pontos de coleta seletiva",
      "Doações, trocas e vendas de itens",
      "Chat em tempo real com moderação por IA",
      "Recompensas com pontos e cupons",
    ],
    ods: [
      "ODS 12: Consumo e Produção Responsáveis (meta 12.5)",
      "ODS 11: Cidades e Comunidades Sustentáveis",
    ],
    // Links profissionais: preencher somente com autorização de cada integrante
    integrantes: [
      {
        nome: "Jean Costa",
        funcao: "Back-end, Mobile e Gestão de Projetos",
        contribuicao: "",
        link: "", // README: https://github.com/Jean090504
      },
      {
        nome: "Maxwillian Santana",
        funcao: "Back-end e Mobile",
        contribuicao: "",
        link: "", // README: https://www.linkedin.com/in/maxw06/
      },
      {
        nome: "Fernanda Cardoso",
        funcao: "Banco de Dados",
        contribuicao: "",
        link: "", // README: https://www.linkedin.com/in/fernanda-mota-38435b37a/
      },
      {
        nome: "Aryely Hevylyn",
        funcao: "Front-end e Requisitos",
        contribuicao: "",
        link: "", // README: https://www.linkedin.com/in/aryely-hevylyn-ab9a3039a/
      },
      {
        nome: "Gustavo Vitor",
        funcao: "Banco de Dados",
        contribuicao: "",
        link: "", // README: https://www.linkedin.com/in/gustavo-souza08/
      },
    ],
    links: [
      { rotulo: "Repositório principal (Meraki)", url: "https://github.com/Jean090504/Meraki" },
      { rotulo: "Documentação do projeto", url: "https://drive.google.com/drive/folders/1FeubhHVvDEJGcV2y63dFbaCoqymqb3d4" },
      { rotulo: "Protótipos no Figma", url: "https://www.figma.com/design/JWe7ZSc4GvvOtADTrDhuNe/EcoWayer---TCC?node-id=175-2&t=MuRQZsqDPGva6A0u-1" },
      { rotulo: "WBS no Miro", url: "https://miro.com/app/board/uXjVHpR-YIM=/?share_link_id=475833631340" },
      { rotulo: "Planejamento de tarefas", url: "https://docs.google.com/spreadsheets/d/1HC-Cw-OUzVDbk_k5hwUcMqXAJ_WQQ-HHmuMfLBYcfXc/edit?gid=1709744959#gid=1709744959" },
      { rotulo: "Front-end", url: "https://github.com/Jean090504/EcoWayer_Front-end" },
      { rotulo: "Back-end", url: "https://github.com/Jean090504/EcoWayer_Back-end" },
      { rotulo: "Mobile", url: "https://github.com/Jean090504/EcoWayer_Mobile" },
    ],
  },
  {
    slug: "vibeeco",
    nome: "VibeEco",
    imagem: "./assets/images/2026-2/vibeeco.svg",
    equipe: "TechProton",
    categoria: "Sustentabilidade e Educação",
    turma: "Manhã",
    descricaoCurta:
      "Plataforma digital de conscientização e engajamento em sustentabilidade, com missões, desafios, gamificação e interação social.",
    status: "Em desenvolvimento",
    inicio: "10/08/2026",
    areas: ["Front-end", "Back-end", "Mobile", "Banco de dados"],
    tecnologias: [], // EDITAR: tecnologias utilizadas
    destaque: "blue",
    problema: "", // EDITAR
    solucao:
      "Plataforma que transforma o aprendizado sobre sustentabilidade em uma experiência interativa, contínua e participativa. Pode ser utilizada em escolas, universidades, empresas, ONGs e comunidades, com área de usuários (web e mobile) e área administrativa.",
    funcionalidades: [
      "Missões e desafios",
      "Conteúdos educativos e quiz",
      "Gamificação com XP, níveis, moedas, conquistas e ranking",
      "Feed da comunidade com publicações e comentários",
      "Recompensas",
      "Painel administrativo",
    ],
    ods: [],
    // Links profissionais: preencher somente com autorização de cada integrante
    integrantes: [
      {
        nome: "Pedro Sousa",
        funcao: "Gerente de Projeto e Mobile",
        contribuicao: "",
        link: "", // README: https://github.com/pedsousa06-ai
      },
      {
        nome: "Gabriel Sousa",
        funcao: "Front-end",
        contribuicao: "",
        link: "", // README: https://github.com/GabrielsrMelo
      },
      {
        nome: "Lucas Kolle",
        funcao: "Back-end",
        contribuicao: "",
        link: "", // README: https://github.com/Lucas-Kolle
      },
      {
        nome: "Ryller Feitosa",
        funcao: "Banco de Dados",
        contribuicao: "",
        link: "", // README: https://github.com/ryllerfeitosadba
      },
    ],
    links: [
      { rotulo: "Repositório principal", url: "https://github.com/pedsousa06-ai/VibeEco" },
      { rotulo: "Documentação", url: "https://github.com/pedsousa06-ai/VibeEco-Docs" },
      { rotulo: "EAP/WBS no Miro", url: "https://miro.com/app/board/uXjVHoWnbAk=/" },
      { rotulo: "Banco de dados", url: "https://github.com/pedsousa06-ai/VibeEco-DataBase" },
      { rotulo: "Back-end de usuários", url: "https://github.com/pedsousa06-ai/VibeEco-Back-End-Users" },
      { rotulo: "Back-end administrativo", url: "https://github.com/pedsousa06-ai/VibeEco-Back-End-Adm" },
      { rotulo: "Front-end de usuários", url: "https://github.com/pedsousa06-ai/VibeEco-Front-End-Users" },
      { rotulo: "Front-end administrativo", url: "https://github.com/pedsousa06-ai/VibeEco-Front-End-Adm" },
      { rotulo: "Mobile", url: "https://github.com/pedsousa06-ai/VibeEco-Mobile" },
    ],
  },
  {
    slug: "nexus",
    nome: "NEXUS",
    imagem: "./assets/images/2026-2/nexus.jpg",
    equipe: "", 
    categoria: "A definir", 
    turma: "Manhã",
    descricaoCurta: "Informações do projeto em atualização.",
    status: "A definir",
    inicio: "",
    areas: [],
    tecnologias: [],
    destaque: "violet",
    problema: "",
    solucao: "",
    funcionalidades: [],
    ods: [],
    integrantes: [],
    links: [{ rotulo: "Repositório no GitHub", url: "https://github.com/Daniele-SS/NEXUS" }],
  },
  {
    slug: "wattvision",
    nome: "WattVision", // EDITAR: nome oficial do projeto
    equipe: "", // EDITAR
    categoria: "A definir", // EDITAR
    turma: "Manhã",
    descricaoCurta: "Informações do projeto em atualização.", // EDITAR
    status: "A definir", // EDITAR
    inicio: "",
    areas: [],
    tecnologias: [],
    destaque: "orange",
    problema: "",
    solucao: "",
    funcionalidades: [],
    ods: [],
    integrantes: [],
    links: [{ rotulo: "Repositório no GitHub", url: "https://github.com/DiegodelPadua/WattVision" }],
  },
    {
    slug: "dialoga",
    nome: "DiaLoga",
    imagem: "./assets/images/2026-2/dialoga.svg",
    equipe: "Tenebrix",
    categoria: "Saúde Mental",
    turma: "Manhã",
    descricaoCurta:
      "Plataforma que conecta pessoas, profissionais e tecnologia para facilitar o acompanhamento da saúde mental.",
    status: "Em desenvolvimento",
    inicio: "", // EDITAR: o README não informa
    areas: ["Front-end", "Back-end", "Mobile"],
    tecnologias: [], // EDITAR: tecnologias utilizadas
    destaque: "pink",
    problema: "",
    solucao:
      "Solução digital que utiliza a tecnologia para facilitar a comunicação e o acompanhamento entre pacientes e profissionais, com recursos de organização das informações e uma experiência acessível e intuitiva, disponível na web e em dispositivos móveis.",
    funcionalidades: [], // EDITAR: o README não lista funcionalidades
    ods: [],
    // Links profissionais: preencher somente com autorização de cada integrante
    integrantes: [
      {
        nome: "Julio Augusto",
        funcao: "", // EDITAR
        contribuicao: "",
        link: "", // README: https://github.com/julioau15
      },
      {
        nome: "Mayara Martins",
        funcao: "", // EDITAR
        contribuicao: "",
        link: "", // README: https://github.com/maymandrade
      },
      {
        nome: "Allan de Souza",
        funcao: "", // EDITAR
        contribuicao: "",
        link: "", // README: https://github.com/Dilansty
      },
      {
        nome: "Brayan Alves",
        funcao: "", // EDITAR
        contribuicao: "",
        link: "", // README: https://github.com/Brayan717171
      },
      {
        nome: "Enzo Crepaldi",
        funcao: "", // EDITAR
        contribuicao: "",
        link: "", // README: https://github.com/Enzu666
      },
    ],
    links: [
      { rotulo: "Back-end", url: "https://github.com/julioau15/backend-dialoga" },
      { rotulo: "Front-end", url: "https://github.com/julioau15/frontend-dialoga" },
      { rotulo: "Mobile", url: "https://github.com/julioau15/mobile-dialoga" },
      { rotulo: "WBS no Miro", url: "https://miro.com/app/board/uXjVGCuHJpg=/?share_link_id=298370573967" },
      { rotulo: "Protótipo no Figma", url: "https://www.figma.com/design/dos9pmRgG1Zdsi4Jv2Dxz3/Dialoga?node-id=0-1&t=QK3UcpP9JNshBnxi-1" },
      { rotulo: "Requisitos", url: "https://drive.google.com/drive/folders/1XuusPIwLsKWHOKNhdne1bNy9m-hTny93?usp=drive_link" },
      { rotulo: "Documentação de testes", url: "https://drive.google.com/drive/folders/1yvb_ywmisuCXlRef_wMocq479RUoOCf7?usp=drive_link" },
    ],
  },
  {
    slug: "healthsystems",
    nome: "HealthSystems",
    equipe: "",
    categoria: "A definir",
    turma: "Tarde",
    descricaoCurta: "O repositório usa um template React + Vite, mas o README ainda não descreve a proposta do projeto.",
    status: "A definir",
    inicio: "",
    areas: [],
    tecnologias: ["React", "Vite"],
    destaque: "cyan",
    problema: "",
    solucao: "",
    funcionalidades: [],
    ods: [],
    integrantes: [{ nome: "Francisco Wala", funcao: "Líder/Responsável", contribuicao: "", link: "" }],
    links: [{ rotulo: "Repositório no GitHub", url: "https://github.com/FranciscoWala/TCC_HealthSystems_SenaiJandira" }],
  },
  {
    slug: "tcc-ds",
    nome: "Materna",
    equipe: "",
    categoria: "Doação de leite materno",
    turma: "Tarde",
    descricaoCurta: "Plataforma para conectar doadoras de leite materno a instituições responsáveis pela coleta, armazenamento, gestão e distribuição de leite humano.",
    status: "A definir",
    inicio: "",
    areas: ["Front-end", "Back-end", "Mobile"],
    tecnologias: [],
    destaque: "blue",
    problema: "",
    solucao: "",
    funcionalidades: [
      "Conexão entre doadoras de leite materno e instituições competentes",
      "Organização dos processos de coleta, armazenamento, gerenciamento e distribuição de leite humano",
    ],
    ods: [],
    integrantes: [
      { nome: "Bruno Haddad Alves", funcao: "Integrante", contribuicao: "", link: "https://github.com/Alveszx1" },
      { nome: "Cosme Cruz Ribeiro", funcao: "Integrante", contribuicao: "", link: "https://github.com/0xCosme" },
      { nome: "Estela Rufino Brito", funcao: "Integrante", contribuicao: "", link: "https://github.com/EstRufi" },
      { nome: "Evellyn Santiago de Souza", funcao: "Integrante", contribuicao: "", link: "https://github.com/evlynwn" },
      { nome: "Gustavo Vidal de Abreu", funcao: "Integrante", contribuicao: "", link: "https://github.com/gustavidal" },
    ],
    links: [
      { rotulo: "Repositório no GitHub", url: "https://github.com/gustavidal/tcc-ds" },
      { rotulo: "Documentação do projeto", url: "https://drive.google.com/drive/folders/1JHWTCX9ZNokSDTzxujf3_-QUXlZMfTwH?usp=sharing" },
      { rotulo: "Protótipos web no Figma", url: "https://www.figma.com/design/WngcQuhgkNVDAqnnDy7xYH/Prot%C3%B3tipos-Web---Institui%C3%A7%C3%A3o?node-id=0-1&t=HWu16BjKlSTmhdgX-1" },
      { rotulo: "Protótipos mobile no Figma", url: "https://www.figma.com/design/W64yJxuKHD2agLgkv2nI7S/Prot%C3%B3tipos-Mobile---Doadora?node-id=0-1&t=Coh8RlvCXnHgHF6T-1" },
      { rotulo: "EAP/WBS no Miro", url: "https://miro.com/app/board/uXjVHpdBP2k=/?share_link_id=947249599009" },
      { rotulo: "Modelagem conceitual", url: "https://drive.google.com/drive/folders/1bWsrCBoNuZ8AL59KFEOoFjzjGM4lVk4y?usp=sharing" },
      { rotulo: "Modelagem lógica", url: "https://drive.google.com/drive/folders/1dlD_CBtXXZBh-XgaUjULbEiZ8UyjupHn?usp=sharing" },
      { rotulo: "TAP", url: "https://github.com/gustavidal/tcc-ds/blob/main/TAP.md" },
      { rotulo: "Swagger e documentação da API", url: "https://drive.google.com/drive/folders/1E469t7uGYBsIuuygANjqv9Oh6KVr6tpj?usp=sharing" },
      { rotulo: "Back-end", url: "https://github.com/0xCosme/Materna-API" },
      { rotulo: "Front-end", url: "https://github.com/EstRufi/Materna-Front_End" },
      { rotulo: "Mobile", url: "https://github.com/gustavidal/materna-mobile" },
    ],
  },
  {
    slug: "4tech-andpanelas",
    nome: "Entre Panelas",
    equipe: "4Tech",
    categoria: "Culinária e Inteligência Artificial",
    turma: "Tarde",
    descricaoCurta: "Plataforma inteligente de receitas que ajuda pessoas com pouca experiência na cozinha a encontrar, adaptar e preparar receitas com apoio de inteligência artificial.",
    status: "Em desenvolvimento",
    inicio: "",
    areas: ["Front-end", "Back-end", "Mobile", "Inteligência artificial"],
    tecnologias: [],
    destaque: "orange",
    problema: "",
    solucao: "Plataforma de receitas que usa inteligência artificial para auxiliar na identificação de ingredientes, oferecer sugestões personalizadas e facilitar a interação com receitas.",
    funcionalidades: [
      "Identificação de ingredientes com apoio de inteligência artificial",
      "Sugestões personalizadas de receitas",
      "Interação com receitas",
    ],
    ods: [],
    integrantes: [{ nome: "Matheus Henry", funcao: "Líder/Responsável", contribuicao: "", link: "" }],
    links: [
      { rotulo: "Repositório principal no GitHub", url: "https://github.com/mthenryx/projeto-tcc-senai-4tech-andpanelas" },
      { rotulo: "WBS/EAP no Miro", url: "https://miro.com/welcomeonboard/MVRvSEdKK2ZRZmoraWNOZ0lxTi8rdGNqQUJhR21ZbE04TTE3cjYrejA4TzlKb1pESjg0d0xINjVjcG15SjFmclh5ZjRaelg3a1NQQ1lZL1J2bnRZU20vNVRMVHBINndZV2R2UkpPblNQOXI4bXZnSE1aM2RNTkNZT0dyZWYyMEFNakdSWkpBejJWRjJhRnhhb1UwcS9BPT0hdjE=?share_link_id=843116237482" },
      { rotulo: "Back-end", url: "https://github.com/enzzof08/projeto-tcc-senai-andpanelas-backend" },
      { rotulo: "Front-end", url: "https://github.com/mthenryx/projeto-tcc-senai-andpanelas-frontend" },
      { rotulo: "Inteligência artificial", url: "https://github.com/mthenryx/projeto-tcc-senai-andpanelas-ia-chefinho" },
      { rotulo: "Aplicativo mobile", url: "https://github.com/Fernando-68/projeto-tcc-andpanelas-mobile" },
    ],
  },
  {
    slug: "ecoleta-tcc",
    nome: "Ecoleta",
    equipe: "Equipe Ecoleta",
    categoria: "Sustentabilidade e Gestão de Resíduos",
    turma: "Tarde",
    descricaoCurta: "Plataforma que conecta estabelecimentos geradores de resíduos a empresas coletoras, organizando desde a oferta do material até a conclusão e o histórico da coleta.",
    status: "A definir",
    inicio: "",
    areas: ["Front-end", "Back-end", "Mobile", "Banco de dados"],
    tecnologias: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MySQL", "Kotlin", "Android Studio", "API REST"],
    destaque: "green",
    problema: "",
    solucao: "Estabelecimentos cadastram resíduos disponíveis; empresas coletoras enviam ofertas, e as coletas aceitas são agendadas, registradas e acompanhadas até a conclusão.",
    funcionalidades: [
      "Cadastro de resíduos por tipo, quantidade, data e horário",
      "Busca de resíduos e envio de ofertas por empresas coletoras",
      "Aceite ou recusa de ofertas e agendamento de coletas",
      "Registro da execução e histórico de cada coleta",
    ],
    ods: [],
    integrantes: [
      { nome: "Leandro dos Reis", funcao: "Gestor do Projeto", contribuicao: "", link: "https://github.com/leandrodosreis" },
      { nome: "Kauan", funcao: "Integrante", contribuicao: "", link: "https://github.com/KauanAlv" },
      { nome: "Jefferson", funcao: "Integrante", contribuicao: "", link: "https://github.com/JeffersonNeves0941" },
      { nome: "Gabriel", funcao: "Integrante", contribuicao: "", link: "https://github.com/Grplay215" },
    ],
    links: [
      { rotulo: "Repositório principal no GitHub", url: "https://github.com/leandrodosreis/Ecoleta-TCC" },
      { rotulo: "WBS/EAP no Miro", url: "https://miro.com/app/board/uXjVHpcQWO0=/?share_link_id=730846716903" },
      { rotulo: "Protótipos no Figma", url: "https://www.figma.com/design/b2gut0UcyvaG1Y6CXlJ366/Ecoleta?node-id=0-1&t=xCUTWxwZnZ52ffPF-1" },
      { rotulo: "Levantamento de requisitos", url: "https://drive.google.com/drive/folders/1zyuy07k8bvG0aa6KqY76FVzksKdMMlmA?usp=drive_link" },
      { rotulo: "Banco de dados", url: "https://github.com/KauanAlv/banco-de-dados-ecoleta" },
      { rotulo: "Back-end de coletores", url: "https://github.com/KauanAlv/back-end-coletores-ecoleta" },
      { rotulo: "Back-end de estabelecimentos", url: "https://github.com/KauanAlv/back-end-estabelecimentos-ecoleta" },
      { rotulo: "Front-end de estabelecimentos", url: "https://github.com/leandrodosreis/Front-Estabelecimento-Ecoleta" },
      { rotulo: "Front-end de coletores", url: "https://github.com/leandrodosreis/Front-Coletora-Ecoleta" },
    ],
  },
  {
    slug: "bloom-geral",
    nome: "Bloom",
    equipe: "",
    categoria: "A definir",
    turma: "Tarde",
    descricaoCurta: "Informações do projeto em atualização.",
    status: "A definir",
    inicio: "",
    areas: [],
    tecnologias: [],
    destaque: "pink",
    problema: "",
    solucao: "",
    funcionalidades: [],
    ods: [],
    integrantes: [{ nome: "Lucas", funcao: "Líder/Responsável", contribuicao: "", link: "" }],
    links: [{ rotulo: "Repositório no GitHub", url: "https://github.com/LucasAlexandreDev/bloom-geral" }],
  },
];

/*
  ACERVO (edições anteriores)
  A estrutura da página está pronta. Enquanto a lista estiver vazia,
  a vitrine exibe a mensagem "Acervo em catalogação".

  Para catalogar uma edição, adicione um item neste formato:
  { edicao: "2025 · 2º semestre", quantidade: 12, temas: ["Educação", "Saúde"] },
*/
const acervo = [];
