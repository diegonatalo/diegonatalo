// Conteúdo das imagens do README. Mantenha igual ao portfólio (diegonatalo.dev):
// stack em lib/data/skills.ts, projetos em lib/data/projects.ts, trajetória em
// lib/data/experience.ts, education.ts e certificates.ts.

export const hero = {
  role: "Engenheiro de Software",
  description:
    "Construo produtos web de ponta a ponta, do front ao deploy, usando IA no fluxo de trabalho. Testes, CI e acessibilidade garantem que o que vai para produção seja bem acabado.",
  stats: [
    { value: "11", label: "Projetos" },
    { value: "28", label: "Tecnologias" },
    { value: "6", label: "Certificados" },
  ],
};

export const buttons = [
  { id: "portfolio", label: "Ver portfólio", primary: true },
  { id: "linkedin", label: "LinkedIn" },
  { id: "email", label: "E-mail" },
  { id: "curriculo", label: "Currículo" },
];

export const sections = [
  { id: "sobre", index: "01", eyebrow: "Sobre", title: "Quem sou eu", description: "Do suporte ao código: de onde venho e como trabalho." },
  { id: "stack", index: "02", eyebrow: "Stack", title: "Skills & Tecnologias", description: "O que uso de verdade nos meus projetos, com testes e CI em todos eles." },
  { id: "projetos", index: "03", eyebrow: "Portfólio", title: "Projetos em destaque", description: "Produtos completos, com login, banco e deploy." },
  { id: "trajetoria", index: "04", eyebrow: "Trajetória", title: "Experiência & formação", description: "Onde trabalhei, onde estudei e os cursos que mantêm a stack atualizada." },
  { id: "github", index: "05", eyebrow: "GitHub", title: "Atividade", description: "Commits, linguagens e sequência de contribuições." },
  { id: "contato", index: "06", eyebrow: "Contato", title: "Vamos conversar", description: "Respondo o mais breve possível." },
];

// logo: arquivo em images/tech/. reverse: logo branco que fica escuro no tema claro.
export const stack = [
  { title: "Front-end", items: [["React", "react"], ["Next.js", "nextjs", true], ["TypeScript", "typescript"], ["JavaScript", "javascript"], ["HTML5", "html5"], ["CSS3", "css3"]] },
  { title: "UI & Interação", items: [["Tailwind CSS", "tailwind"], ["Radix UI", "radix", true], ["dnd-kit"], ["D3.js", "d3"], ["Recharts"]] },
  { title: "Formulários & Estado", items: [["React Hook Form", "react-hook-form"], ["Zod", "zod"], ["Zustand"]] },
  { title: "Testes & Qualidade", items: [["Vitest", "vitest"], ["Testing Library", "testing-library"], ["Playwright", "playwright"], ["ESLint", "eslint"], ["GitHub Actions", "github-actions"]] },
  { title: "Back-end & Infra", items: [["Node.js", "nodejs"], ["PostgreSQL", "postgresql"], ["Neon", "neon"], ["Drizzle ORM", "drizzle"], ["Better Auth", "better-auth", true], ["Vercel", "vercel", true]] },
  { title: "IA & Fluxo", items: [["Claude Code", "claude"], ["Git", "git"], ["pnpm", "pnpm"]] },
];

export const projects = [
  {
    id: "encaixe",
    title: "Encaixe",
    image: "encaixe.webp",
    summary: "Agenda para quem atende com hora marcada: grade da semana, presença com um toque, crédito de reposição e mensalidade do mês.",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    id: "pede-ai",
    title: "Pede Aí",
    image: "pede-ai.webp",
    summary: "Do QR code da mesa direto para a fila da cozinha e do bar, com aviso ao garçom e a conta dividida pelo que cada um pediu.",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    id: "entendendo-algoritmos",
    title: "Entendendo Algoritmos",
    image: "entendendo-algoritmos.webp",
    summary: "Os capítulos do livro em visualizações interativas: mude a entrada, avance passo a passo e veja cada decisão.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];

// Selos das organizações: arquivo em images/orgs/, cor de fundo e quanto do selo a logo ocupa.
const orgs = {
  wsnet: { file: "wsnet.png", background: "#0a1140", scale: 1 },
  wsAcademy: { file: "wsacademy.png", background: "#0b1a3a", scale: 1 },
  ifsp: { file: "ifsp.svg", background: "#ffffff", scale: 0.64 },
  etec: { file: "etec-cps.svg", background: "#ffffff", scale: 0.8 },
  vanderbilt: { file: "vanderbilt.svg", background: "#000000", scale: 0.62 },
  meta: { file: "meta.svg", background: "#ffffff", scale: 0.66 },
  google: { file: "google.png", background: "#ffffff", scale: 0.58 },
  rocketseat: { file: "rocketseat.svg", background: "#8257e5", scale: 0.6 },
  fiap: { file: "fiap.svg", background: "#000000", scale: 0.78 },
};

export const experience = [
  { org: orgs.wsnet, period: "2025 — 2026", title: "Assistente de Suporte Técnico N2", meta: "WSNET · Itanhaém, SP" },
  { org: orgs.wsnet, period: "2024 — 2025", title: "Assistente de Suporte Técnico N1", meta: "WSNET · Itanhaém, SP" },
  { org: orgs.wsAcademy, period: "2025 — 2026", title: "Instrutor Convidado", meta: "WS Academy · Itanhaém, SP" },
];

export const education = [
  { org: orgs.ifsp, period: "2019 — 2022", title: "Tecnólogo em Análise e Desenvolvimento de Sistemas", meta: "IFSP · Cubatão, SP · Concluído" },
  { org: orgs.etec, period: "2016 — 2018", title: "Técnico em Informática para Internet", meta: "Etec · Itanhaém, SP · Concluído" },
];

export const certificates = [
  { org: orgs.vanderbilt, title: "Generative AI Software Engineering Specialization", meta: "Vanderbilt University · Coursera · 2026", studying: true },
  { org: orgs.rocketseat, title: "Metodologias Ágeis", meta: "Rocketseat · 5h · 2026" },
  { org: orgs.meta, title: "Meta React Native Specialization", meta: "Coursera · 202h · 2024" },
  { org: orgs.meta, title: "Meta Front-End Developer Professional Certificate", meta: "Coursera · 231h · 2023" },
  { org: orgs.google, title: "Google Fundamentos do design da experiência do usuário (UX)", meta: "Coursera · 20h · 2023" },
  { org: orgs.rocketseat, title: "Ignite React.js", meta: "Rocketseat · 100h · 2022" },
  { org: orgs.fiap, title: "Design Thinking", meta: "FIAP · 40h · 2021" },
];

export const contact = {
  email: "diegonatalo@gmail.com",
  footer: "© 2026 Diego Natalo · Feito para o garoto que um dia sonhou com isso.",
};
