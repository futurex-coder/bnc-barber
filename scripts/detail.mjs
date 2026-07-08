import { chromium } from "playwright";
const BASE = "http://localhost:3101";
const b = await chromium.launch();
async function shot(name, path, w, h, y=0){
  const ctx = await b.newContext({ viewport:{width:w,height:h}});
  const p = await ctx.newPage();
  await p.goto(BASE+path,{waitUntil:"networkidle"});
  await p.waitForTimeout(900);
  if(y) await p.evaluate(yy=>window.scrollTo(0,yy), y);
  await p.waitForTimeout(600);
  await p.screenshot({path:`screenshots/detail-${name}.png`});
  await ctx.close();
}
await shot("hero-d","/",1440,900);
await shot("acad-d","/akademiya",1440,900,700);
await shot("loc-d","/lokacii/zdravets-iztok",1440,900,650);
await shot("ekip-d","/ekip",1440,900,500);
await shot("hero-m","/",390,844);
await shot("uslugi-d","/uslugi",1440,900,500);
await b.close();
console.log("done");
