import { chromium } from "playwright";
const b = await chromium.launch();
const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
await p.goto("http://localhost:3303/galeriya",{waitUntil:"networkidle"});
const info = await p.evaluate(() => {
  const tiles = [...document.querySelectorAll('[role="img"][class*="img-fallback"]')];
  const t = tiles[0];
  if(!t) return {tiles:tiles.length};
  const mono = t.querySelector('span > span');
  return {
    tiles: tiles.length,
    monoText: mono?.textContent,
    monoColor: mono ? getComputedStyle(mono).color : "NO MONO",
    baseBgLast: getComputedStyle(t).backgroundImage.split('linear-gradient')[1]?.slice(0,80),
  };
});
console.log(JSON.stringify(info,null,2));
await b.close();
