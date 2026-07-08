import { chromium } from "playwright";
const BASE = "http://localhost:3304";
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
await shot("gallery-d","/galeriya",1440,900,500);
await shot("uslugi-m","/uslugi",390,844,600);
await shot("akademiya-m","/akademiya",390,844,1400);
await b.close();
console.log("done");
