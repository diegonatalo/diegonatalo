// Gera as imagens do README (PNG, em 2x) nas versões clara e escura.
// Uso: pnpm install && pnpm generate. Usa o Edge ou o Chrome já instalado
// (BROWSER_CHANNEL=chrome para trocar), sem baixar navegador.
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import * as content from "./content.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, "..", "assets");
const WIDTH = 880;

const themes = {
  dark: {
    bg: "#060b0e", card: "#0b1317", fg: "#e7f1ee", muted: "#9db1aa", subtle: "#7b8f88",
    border: "#26353b", accent: "#38e8a8", accent2: "#5aa9ff", accentFg: "#03130d",
    accentSoft: "rgba(56,232,168,0.10)", accentLine: "rgba(56,232,168,0.40)",
    glow1: "rgba(52,232,168,0.20)", glow2: "rgba(59,130,246,0.20)",
    ring: "rgba(231,241,238,0.10)", reverse: "none",
  },
  light: {
    bg: "#f4f8f6", card: "#ffffff", fg: "#0a1512", muted: "#3f524c", subtle: "#5a6c66",
    border: "#d8e3de", accent: "#0a7a57", accent2: "#2563eb", accentFg: "#ffffff",
    accentSoft: "rgba(10,122,87,0.08)", accentLine: "rgba(10,122,87,0.35)",
    glow1: "rgba(16,185,129,0.22)", glow2: "rgba(59,130,246,0.16)",
    ring: "rgba(10,21,18,0.10)", reverse: "invert(1)",
  },
};

const mime = { ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2" };
const dataUri = async (...parts) => {
  const file = path.join(here, ...parts);
  const data = await readFile(file);
  return `data:${mime[path.extname(file)]};base64,${data.toString("base64")}`;
};
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const fonts = {
  display: await dataUri("fonts", "bricolage-grotesque.woff2"),
  sans: await dataUri("fonts", "geist.woff2"),
  mono: await dataUri("fonts", "geist-mono.woff2"),
};
const logo = await dataUri("images", "logo.svg");

const css = (t) => `
@font-face { font-family: "Bricolage"; src: url(${fonts.display}) format("woff2"); font-weight: 100 900; }
@font-face { font-family: "Geist"; src: url(${fonts.sans}) format("woff2"); font-weight: 100 900; }
@font-face { font-family: "Geist Mono"; src: url(${fonts.mono}) format("woff2"); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: transparent; font-family: "Geist", sans-serif; color: ${t.fg}; -webkit-font-smoothing: antialiased; }
#shot { display: inline-block; }
.display { font-family: "Bricolage", sans-serif; font-weight: 700; letter-spacing: -0.02em; }
.mono { font-family: "Geist Mono", monospace; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; }
.panel { width: ${WIDTH}px; border-radius: 18px; border: 1px solid ${t.border}; background: ${t.bg}; position: relative; overflow: hidden; }
.card { border-radius: 12px; border: 1px solid ${t.border}; background: ${t.card}; }
.glow { position: absolute; border-radius: 50%; filter: blur(60px); }
.gradient { background: linear-gradient(90deg, ${t.accent}, ${t.accent2}); -webkit-background-clip: text; background-clip: text; color: transparent; }
.chip { display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px 3px 7px; border-radius: 999px; border: 1px solid ${t.border}; background: ${t.bg}; font-family: "Geist Mono", monospace; font-size: 12px; white-space: nowrap; }
.dot { width: 14px; height: 14px; display: grid; place-items: center; }
.dot::after { content: ""; width: 5px; height: 5px; border-radius: 50%; background: ${t.accent}; }
.badge { flex-shrink: 0; overflow: hidden; display: grid; place-items: center; box-shadow: inset 0 0 0 1px ${t.ring}; }
.badge img { object-fit: contain; display: block; }
.tag { flex-shrink: 0; padding: 2px 8px; border-radius: 999px; border: 1px solid ${t.accentLine}; background: ${t.accentSoft}; color: ${t.accent}; font-family: "Geist Mono", monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; }
`;

const badge = async (org, size, radius) => `
  <span class="badge" style="width:${size}px;height:${size}px;border-radius:${radius}px;background:${org.background}">
    <img src="${await dataUri("images", "orgs", org.file)}" style="width:${org.scale * 100}%;height:${org.scale * 100}%" alt="">
  </span>`;

const blocks = {
  async banner(t) {
    const { hero } = content;
    return `
    <div class="panel" style="border-radius:22px;padding:36px 40px 30px">
      <div class="glow" style="top:-140px;left:-120px;width:420px;height:420px;background:${t.glow1}"></div>
      <div class="glow" style="bottom:-160px;right:-120px;width:420px;height:420px;background:${t.glow2}"></div>
      <div style="position:relative;display:flex;flex-direction:column;gap:22px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div style="display:flex;align-items:center;gap:12px">
            <img src="${logo}" style="width:44px;height:44px" alt="">
            <span class="display" style="font-size:21px;letter-spacing:0">diego <span style="color:${t.accent}">natalo.</span></span>
          </div>
          <span class="mono" style="display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;border:1px solid ${t.accentLine};background:${t.accentSoft};color:${t.accent};font-size:12px">
            <span style="width:7px;height:7px;border-radius:50%;background:${t.accent}"></span>Aberto a oportunidades</span>
        </div>
        <div>
          <h1 class="display" style="font-size:76px;line-height:1;letter-spacing:-0.03em">Diego <span class="gradient">Natalo</span></h1>
          <p class="display" style="margin-top:14px;font-size:26px;font-weight:600;letter-spacing:-0.01em">${esc(hero.role)}</p>
          <p style="margin-top:10px;max-width:640px;font-size:16px;line-height:1.6;color:${t.muted}">${esc(hero.description)}</p>
        </div>
        <div style="display:flex;gap:28px;padding-top:18px;border-top:1px solid ${t.border}">
          ${hero.stats.map((s) => `<p style="display:flex;align-items:baseline;gap:8px"><span class="display" style="font-size:26px">${s.value}</span><span class="mono" style="color:${t.subtle}">${s.label}</span></p>`).join("")}
        </div>
      </div>
    </div>`;
  },

  async header(t, section) {
    return `
    <div class="panel" style="display:flex;align-items:flex-end;justify-content:space-between;gap:24px;padding:18px 22px;border-radius:16px">
      <div>
        <p class="mono" style="color:${t.subtle}"><span style="color:${t.accent}">${section.index} · </span>${esc(section.eyebrow)}</p>
        <h2 class="display" style="margin-top:4px;font-size:28px">${esc(section.title)}</h2>
      </div>
      <p style="max-width:330px;text-align:right;font-size:13px;line-height:1.5;color:${t.muted}">${esc(section.description)}</p>
    </div>`;
  },

  async button(t, button) {
    const style = button.primary
      ? `background:${t.accent};color:${t.accentFg};border:1px solid ${t.accent}`
      : `background:${t.card};color:${t.fg};border:1px solid ${t.border}`;
    const arrow = button.primary
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>`
      : "";
    return `<span style="display:inline-flex;align-items:center;gap:8px;height:44px;padding:0 20px;border-radius:999px;font-size:15px;font-weight:500;${style}">${esc(button.label)}${arrow}</span>`;
  },

  async stack(t) {
    const cats = await Promise.all(
      content.stack.map(async (cat) => {
        const chips = await Promise.all(
          cat.items.map(async ([name, file, reverse]) => {
            const icon = file
              ? `<img src="${await dataUri("images", "tech", `${file}.svg`)}" style="width:14px;height:14px;object-fit:contain;filter:${reverse ? t.reverse : "none"}" alt="">`
              : `<span class="dot"></span>`;
            return `<span class="chip">${icon}${esc(name)}</span>`;
          }),
        );
        return `<div class="card" style="padding:14px">
          <p class="mono" style="color:${t.accent}">${esc(cat.title)}</p>
          <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:6px">${chips.join("")}</div>
        </div>`;
      }),
    );
    return `<div class="panel" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;padding:10px">${cats.join("")}</div>`;
  },

  async project(t, project) {
    const image = await dataUri("images", "projects", project.image);
    return `
    <div style="width:282px;height:362px;display:flex;flex-direction:column;overflow:hidden;border-radius:18px;border:1px solid ${t.border};background:${t.card}">
      <div style="padding:10px 10px 0;background:${t.bg}">
        <img src="${image}" style="width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top;display:block;border-radius:10px 10px 0 0;border:1px solid ${t.border};border-bottom:0" alt="">
      </div>
      <div style="flex:1;padding:14px 16px 16px;display:flex;flex-direction:column;gap:8px;border-top:1px solid ${t.border}">
        <h3 class="display" style="font-size:19px">${esc(project.title)}</h3>
        <p style="font-size:13px;line-height:1.55;color:${t.muted};min-height:60px">${esc(project.summary)}</p>
        <div style="display:flex;flex-wrap:wrap;gap:5px">${project.stack.map((s) => `<span style="padding:2px 8px;border-radius:999px;border:1px solid ${t.border};font-family:'Geist Mono',monospace;font-size:11px;color:${t.muted}">${esc(s)}</span>`).join("")}</div>
      </div>
    </div>`;
  },

  async trajetoria(t) {
    const row = async (item, i) => `
      <div style="display:flex;gap:12px;padding:12px 0;${i ? `border-top:1px solid ${t.border}` : ""}">
        ${await badge(item.org, 36, 10)}
        <div>
          <p style="font-family:'Geist Mono',monospace;font-size:11px;letter-spacing:0.06em;color:${t.accent}">${esc(item.period)}</p>
          <p style="margin-top:3px;font-size:14px;font-weight:600;line-height:1.35">${esc(item.title)}</p>
          <p style="margin-top:2px;font-size:12px;color:${t.subtle}">${esc(item.meta)}</p>
        </div>
      </div>`;
    const column = async (title, items) => `
      <div class="card" style="padding:4px 16px">
        <p class="mono" style="padding:12px 0 10px;border-bottom:1px solid ${t.border};color:${t.subtle}">${title}</p>
        ${(await Promise.all(items.map(row))).join("")}
      </div>`;
    const certs = await Promise.all(
      content.certificates.map(async (c) => `
        <div style="display:flex;align-items:center;gap:12px;min-height:52px;padding:8px 0;border-bottom:1px solid ${t.border}">
          ${await badge(c.org, 30, 8)}
          <div style="flex:1;min-width:0">
            <p style="font-size:13px;font-weight:600;line-height:1.35">${esc(c.title)}</p>
            <p style="margin-top:2px;font-size:12px;color:${t.subtle}">${esc(c.meta)}</p>
          </div>
          ${c.studying ? `<span class="tag">Cursando</span>` : ""}
        </div>`),
    );
    return `
    <div class="panel" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:10px">
      ${await column("Experiência", content.experience)}
      ${await column("Formação acadêmica", content.education)}
      <div class="card" style="grid-column:1/-1;padding:4px 16px 8px">
        <p class="mono" style="padding:12px 0 10px;border-bottom:1px solid ${t.border};color:${t.subtle}">Cursos &amp; certificados</p>
        <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:24px">${certs.join("")}</div>
      </div>
    </div>`;
  },

  async contato(t) {
    return `
    <div class="panel" style="display:flex;align-items:center;justify-content:space-between;gap:24px;padding:28px 32px;border-radius:20px;background:${t.card}">
      <div class="glow" style="top:-120px;left:-100px;width:300px;height:300px;background:${t.glow1}"></div>
      <div style="position:relative">
        <h3 class="display" style="font-size:30px">Tem um projeto em <span class="gradient">mente?</span></h3>
        <p style="margin-top:8px;font-size:14px;color:${t.muted}">Estou aberto a novas oportunidades e parcerias.</p>
      </div>
      <p style="position:relative;display:flex;align-items:center;gap:8px;font-family:'Geist Mono',monospace;font-size:13px">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${t.accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
        ${esc(content.contact.email)}</p>
    </div>`;
  },

  async footer(t) {
    return `
    <div style="width:${WIDTH}px;display:flex;align-items:center;justify-content:center;gap:10px;padding:6px 0;color:${t.subtle}">
      <img src="${logo}" style="width:20px;height:20px" alt="">
      <span class="mono" style="letter-spacing:0.06em">${esc(content.contact.footer)}</span>
    </div>`;
  },
};

// Lista de imagens: nome do arquivo → bloco.
const jobs = [
  ["banner", (t) => blocks.banner(t)],
  ...content.buttons.map((b) => [`btn-${b.id}`, (t) => blocks.button(t, b), "single"]),
  ...content.sections.map((s) => [`h-${s.id}`, (t) => blocks.header(t, s)]),
  ["stack", (t) => blocks.stack(t)],
  ...content.projects.map((p) => [`p-${p.id}`, (t) => blocks.project(t, p)]),
  ["trajetoria", (t) => blocks.trajetoria(t)],
  ["contato", (t) => blocks.contato(t)],
  ["footer", (t) => blocks.footer(t)],
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL ?? "msedge" });
const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: WIDTH + 40, height: 800 } });

// Imagens com link não trocam de tema no GitHub (ele desmonta o <picture> dentro de
// um link), então os botões saem numa versão só, a escura, que funciona nos dois fundos.
for (const [name, render, mode] of jobs) {
  const variants = mode === "single" ? [["", themes.dark]] : Object.entries(themes).map(([k, t]) => [`-${k}`, t]);
  for (const [suffix, t] of variants) {
    const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>${css(t)}</style></head>
      <body><div id="shot">${await render(t)}</div></body></html>`;
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const file = path.join(outDir, `${name}${suffix}.png`);
    await page.locator("#shot").screenshot({ path: file, omitBackground: true });
    console.log(`✓ assets/${name}${suffix}.png`);
  }
}

await browser.close();
