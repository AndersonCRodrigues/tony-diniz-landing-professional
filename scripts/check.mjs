import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const load = (file) => readFile(resolve(root, file), "utf8");
const app = await load("src/App.jsx");
const css = await load("src/index.css");
const vite = await load("vite.config.js");
const html = await load("index.html");
const testimonials = await load("src/data/depoimentos.js");
const instagramIcon = await load("src/components/InstagramIcon.jsx");
const checks = [
  ["Tailwind v4 importado", css.includes('@import "tailwindcss"')],
  ["Tokens definidos em @theme", css.includes("@theme")],
  ["Plugin Vite do Tailwind configurado", vite.includes('from "@tailwindcss/vite"')],
  ["Plugin React configurado", vite.includes("react()")],
  ["Idioma pt-BR declarado", html.includes('lang="pt-BR"')],
  ["Navegação acessível", app.includes('aria-expanded={menuOpen}') && app.includes('aria-current=')],
  ["CTA móvel não recebe foco quando oculto", app.includes('tabIndex={hasScrolled ? 0 : -1}')],
  ["WhatsApp configurado", app.includes("5521975340558")],
  ["Instagram usa ícone local, sem export inexistente", !/\bInstagram\s*,/.test(app) && app.includes("InstagramIcon") && instagramIcon.includes("<svg")],
  ["Depoimentos separados em dados", testimonials.includes("export const depoimentos")],
  ["Caminhos de imagens sem sufixos temporários", !/-v\d+\.webp/.test(testimonials)],
  ["Recortes são definitivos, sem segundo reposicionamento no navegador", !testimonials.includes("fotoPosicao") && !String(await load("src/components/Depoimentos.jsx")).includes("objectPosition")],
  ["Fotos em componente com proporção padronizada 4:5", (await load("src/components/Depoimentos.jsx")).includes("h-40 sm:w-32")],
  ["Seções principais preservadas", ["inicio", "jornada", "metodo", "servicos", "contato"].every((id) => app.includes(`id="${id}"`))],
  ["SEO: canonical alinhada ao redirecionamento www", html.includes('rel="canonical" href="https://www.tonydinizpersonal.com.br/"')],
  ["SEO: Open Graph possui URL e imagem", html.includes('property="og:url"') && html.includes('property="og:image"')],
  ["SEO: dados estruturados distinguem modalidades", html.includes('"@type": "Service"') && html.includes('Treinos enviados pelo WhatsApp')],
  ["SEO: serviços visíveis incluem WhatsApp", app.includes('title: "Treinos pelo WhatsApp"')],
  ["SEO: sitemap e robots presentes", (await load("public/sitemap.xml")).includes('www.tonydinizpersonal.com.br') && (await load("public/robots.txt")).includes('sitemap.xml')],
];
for (const asset of ["public/favicon.png", "public/logo-icon.png", "public/tony-training.webp", "public/tony-portrait.webp", ...[1, 2, 3, 4].flatMap((n) => [`public/alunos/aluno-${n}.webp`, `assets/fotos-originais/aluno-${n}.jpeg`])]) {
  try { await access(resolve(root, asset)); checks.push([`Imagem encontrada: ${asset}`, true]); }
  catch { checks.push([`Imagem encontrada: ${asset}`, false]); }
}
// Lista de ícones usados nesta versão: checagem estática, NÃO valida as exportações do pacote.
// As exportações e a integração real são verificadas apenas por npm run build.
const allowedLucideIcons = new Set([
  "Activity", "ArrowDown", "ArrowRight", "ArrowUpRight", "Award", "Check",
  "ClipboardCheck", "Dumbbell", "HeartPulse", "MapPin", "Menu",
  "MessageCircle", "ShieldCheck", "Target", "Users", "X", "Quote",
]);
for (const [fileName, source] of [["src/App.jsx", app], ["src/components/Depoimentos.jsx", await load("src/components/Depoimentos.jsx")]]) {
  for (const match of source.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']lucide-react["']/gs)) {
    for (const name of match[1].split(",").map((v) => v.trim()).filter(Boolean)) {
      checks.push([`Ícone ${name} presente na lista estática (${fileName})`, allowedLucideIcons.has(name)]);
    }
  }
}
// Verifica o arquivo WebP efetivamente entregue, sem depender de Pillow ou bundler.
const webpDimension = async (relPath) => {
  const buffer = await readFile(resolve(root, relPath));
  if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") return null;
  const type = buffer.toString("ascii", 12, 16);
  if (type === "VP8 ") {
    if (buffer.toString("hex", 23, 26) !== "9d012a") return null;
    return [buffer.readUInt16LE(26) & 0x3fff, buffer.readUInt16LE(28) & 0x3fff];
  }
  if (type === "VP8L") {
    const a = buffer[21], b = buffer[22], c = buffer[23], d = buffer[24];
    return [1 + (((b & 0x3f) << 8) | a), 1 + (((d & 0x0f) << 10) | (c << 2) | (b >> 6))];
  }
  if (type === "VP8X") return [1 + buffer.readUIntLE(24, 3), 1 + buffer.readUIntLE(27, 3)];
  return null;
};
for (let n = 1; n <= 4; n++) {
  try {
    const dim = await webpDimension(`public/alunos/aluno-${n}.webp`);
    checks.push([`Recorte do aluno ${n}: 480x600`, dim?.[0] === 480 && dim?.[1] === 600]);
  } catch {
    checks.push([`Recorte do aluno ${n}: 480x600`, false]);
  }
}
for (const [name, ok] of checks) console.log(`${ok ? "✓" : "✗"} ${name}`);
if (checks.some(([, ok]) => !ok)) process.exitCode = 1;
else console.log(`\n${checks.length} verificações de estrutura aprovadas.`);
