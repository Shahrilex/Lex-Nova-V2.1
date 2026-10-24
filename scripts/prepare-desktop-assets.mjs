import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const staticRoot = join(root, ".vercel", "output", "static");
const desktopRoot = join(root, "desktop", "LexNova.Desktop", "Web");
const serverBundle = join(root, ".vercel", "output", "functions", "__server.func", "index.mjs");

if (!existsSync(staticRoot) || !existsSync(serverBundle)) {
  throw new Error("Production output is missing. Run npm run build before preparing the desktop package.");
}

const assets = readdirSync(join(staticRoot, "assets"));
const entry = assets.find((name) => /^index-[\w-]+\.js$/.test(name));
const styles = assets.find((name) => /^styles-[\w-]+\.css$/.test(name));

if (!entry || !styles) {
  throw new Error("Could not locate the production JavaScript or stylesheet entry.");
}

rmSync(desktopRoot, { recursive: true, force: true });
mkdirSync(desktopRoot, { recursive: true });
cpSync(staticRoot, desktopRoot, { recursive: true });

const server = (await import(pathToFileURL(serverBundle).href)).default;
const response = await server.fetch(new Request("https://appassets.example/?desktop=1"));
if (!response.ok) throw new Error(`Could not render the offline desktop start page (HTTP ${response.status}).`);

const renderedDocument = await response.text();
if (!renderedDocument.includes("Jurist Assistant") || !renderedDocument.includes(`/assets/${styles}`) || !renderedDocument.includes(`/assets/${entry}`)) {
  throw new Error("The rendered desktop start page is missing its app shell or production assets.");
}
const desktopBootstrap = `<script>(function(){var p=new URL(location.href).searchParams.get("route")||"/?desktop=1";if(!p.startsWith("/")||p.startsWith("//")||p.includes("\\\\"))p="/?desktop=1";var q=new URLSearchParams({desktop:"1"});if(p!=="/")q.set("desktopRoute",p);history.replaceState(null,"","/?"+q.toString());})();</script>`;
const document = renderedDocument.replace("<head>", `<head>${desktopBootstrap}`);
if (document === renderedDocument) throw new Error("Could not attach the offline desktop bootstrap to the rendered page.");

writeFileSync(join(desktopRoot, "index.html"), document, "utf8");
console.log(`[desktop] prepared the offline app and rendered start page in ${desktopRoot}`);
