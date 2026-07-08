import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const OUT = "screenshots";
mkdirSync(OUT, { recursive: true });

const routes = [
  ["home", "/"],
  ["lokacii", "/lokacii"],
  ["lokacii-zdravets", "/lokacii/zdravets-iztok"],
  ["lokacii-center", "/lokacii/center"],
  ["ekip", "/ekip"],
  ["uslugi", "/uslugi"],
  ["akademiya", "/akademiya"],
  ["galeriya", "/galeriya"],
  ["za-nas", "/za-nas"],
  ["kontakti", "/kontakti"],
  ["404", "/nope-404"],
];

const breakpoints = [
  ["mobile", 390, 844],
  ["tablet", 768, 1024],
  ["desktop", 1440, 900],
];

const errors = [];

const browser = await chromium.launch();
for (const [bpName, w, h] of breakpoints) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
    reducedMotion: process.env.REDUCED === "1" ? "reduce" : "no-preference",
  });
  const page = await ctx.newPage();
  let current = "";
  page.on("console", (m) => {
    // The /nope-404 route intentionally returns a 404 document; its own
    // "Failed to load resource: 404" console line is expected, not a defect.
    if (m.type() !== "error") return;
    if (current === "404" && /Failed to load resource/.test(m.text())) return;
    errors.push(`[${bpName}] console.error: ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`[${bpName}] pageerror: ${e.message}`));

  for (const [name, path] of routes) {
    current = name;
    await page.goto(BASE + path, { waitUntil: "networkidle" }).catch((e) => {
      errors.push(`[${bpName}] goto ${path}: ${e.message}`);
    });
    // let reveals settle
    await page.waitForTimeout(700);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/${name}-${bpName}.png`, fullPage: true });
  }
  await ctx.close();
}
await browser.close();

if (errors.length) {
  console.log("⚠️  Issues found:");
  for (const e of errors) console.log("  " + e);
  process.exitCode = 1;
} else {
  console.log("✅ No console/page errors across all routes and breakpoints.");
}
