import { chromium } from "playwright";
const BASE = "http://localhost:3101";
const routes = ["/","/lokacii","/lokacii/zdravets-iztok","/ekip","/uslugi","/akademiya","/galeriya","/za-nas","/kontakti"];
const b = await chromium.launch();
const p = await (await b.newContext()).newPage();
p.on("response", r => { if (r.status()===404) console.log(r.status(), r.url()); });
for (const r of routes){ await p.goto(BASE+r,{waitUntil:"networkidle"}).catch(()=>{}); }
await b.close();
