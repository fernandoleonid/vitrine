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
    imagem: "/assets/images/2026-2/ecowayer.svg",
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
    imagem: "/assets/images/2026-2/vibeeco.svg",
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
    imagem: "/assets/images/2026-2/nexus.jpg",
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
    imagem: "/assets/images/2026-2/dialoga.svg",
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
];

/*
  ACERVO (edições anteriores)
  A estrutura da página está pronta. Enquanto a lista estiver vazia,
  a vitrine exibe a mensagem "Acervo em catalogação".

  Para catalogar uma edição, adicione um item neste formato:
  { edicao: "2025 · 2º semestre", quantidade: 12, temas: ["Educação", "Saúde"] },
*/
const acervo = [];
