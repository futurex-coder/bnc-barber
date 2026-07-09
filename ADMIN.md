# Администрация (CMS) — Bonnie & Clyde

Целият сайт вече се управлява от вградена администрация, захранвана от **Supabase**.
Промените се виждат **веднага** на сайта (публичните страници четат от базата при
всяко зареждане).

---

## Вход

- **Адрес:** [`/admin`](https://bnc-barber.vercel.app/admin) (пренасочва към `/admin/login`)
- **Имейл:** `yoan.sv.dimitrov@gmail.com`
- **Парола:** `BncBarber2026!`  ← **смени я** след първия вход (виж по-долу).

Само вписани администратори могат да редактират. Публиката вижда само крайния сайт.

---

## Какво управляваш

| Секция | Път | Съдържа |
| --- | --- | --- |
| **Екип** | `/admin/team` | Бръснари: ред (drag), име, роля/стаж, описание (rich text), тагове, Instagram, линк за резервация, локация, **галерия със снимки**, профилна снимка. |
| **Услуги** | `/admin/services` | Име, категория, цена, времетраене, тагове, описание, **линк за резервация** (отваря се при клик върху услугата), етикет „Топ“. |
| **Локации** | `/admin/locations` | Адрес, **карта** (постави Google Maps линк → взима координати), работно време, контакти, описание, **снимки**, назначен екип. |
| **Академия** | `/admin/academy` | Описание, начални дати, продължителност, **модули** (име, описание, акценти, ред) и **галерия**. |
| **Събития** | `/admin/events` | Времева лента (timeline) от събития + **гост артисти** (име, дати, Instagram, категория, тагове, локация, снимка, описание). |
| **Галерия** | `/admin/gallery` | Обща галерия — качване и **подредба с drag & drop**. |
| **За нас** | `/admin/about` | Описание (rich text), въведение, снимка, ценности. |
| **Контакти** | `/admin/contacts` | Телефон, имейл, Instagram, Fresha/Cal.com линкове. Адресите и картите идват от **Локации**. |

Всички описания се редактират с **форматиран текст** (получер, курсив, заглавия,
списъци, връзки). Снимките се качват в Supabase Storage и се сервират оптимизирано.

---

## Как е устроено

- **База данни:** Supabase Postgres (проект `bnc-barber`, ref `qqaiagnnebjkzmxfyjvu`).
- **Достъп:** Row-Level Security — публиката има само право на четене; писането е
  позволено само на администратори (`is_admin()` + таблица `admin_users`).
  В приложението **няма таен ключ** — сигурността е на ниво база.
- **Снимки:** публичен bucket `media` в Supabase Storage.
- **Данни за четене:** [`src/lib/content.ts`](src/lib/content.ts) (публични страници).
- **Данни за писане:** Server Actions в [`src/lib/admin/actions/`](src/lib/admin/actions/),
  всяка проверява админ права преди запис.
- **Свежест:** публичните страници са `force-dynamic` — четат от базата при всяка
  заявка, затова редакциите се виждат мигновено.

Таблиците: `locations`, `location_images`, `barbers`, `barber_images`, `services`,
`academy_settings`, `academy_modules`, `academy_images`, `events`, `guests`,
`gallery`, `about_settings`, `site_settings`, `admin_users`.

---

## Настройка на средата (env)

`.env.local` (и Vercel → Project → Settings → Environment Variables):

```
NEXT_PUBLIC_SUPABASE_URL=https://qqaiagnnebjkzmxfyjvu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_3zrObCRbbNfiwcPZTPi2-A_sZqwQHOW
NEXT_PUBLIC_SITE_URL=https://bnc-barber.vercel.app
```

Ключът `anon`/`publishable` е безопасен за браузъра — RLS пази писането.

---

## Поддръжка

### Смяна на паролата
Supabase Dashboard → Authentication → Users → избери потребителя → *Reset password*
(или *Send magic link*). Алтернативно — от кода със Supabase Admin API.

### Добавяне на нов администратор
1. Supabase Dashboard → Authentication → Add user (имейл + парола).
2. SQL: `insert into public.admin_users (user_id, email) select id, email from auth.users where email = 'нов@имейл';`

### Препоръчана защита (по избор)
Supabase Dashboard → Authentication → Policies → включи **Leaked password
protection** (проверка срещу HaveIBeenPwned).

---

## Локална разработка

```bash
npm install
npm run dev     # http://localhost:3000  → /admin за администрацията
```

Регенериране на типовете след промяна по схемата:
`supabase gen types typescript` (или Supabase MCP `generate_typescript_types`)
→ запиши в [`src/lib/supabase/types.ts`](src/lib/supabase/types.ts).
