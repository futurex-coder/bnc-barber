/**
 * ── CONTENT SOURCE OF TRUTH ──────────────────────────────────────────────
 * Everything editable on the site lives here: locations, barbers, services,
 * academy, events, reviews, FAQ, navigation. Components read from these
 * structures — no copy is hardcoded in JSX.
 *
 * Items marked `NEEDS YOU` are realistic, on-brand placeholders meant to be
 * swapped for real data. See PROGRESS.md → "NEEDS YOU".
 * ─────────────────────────────────────────────────────────────────────────
 */

/* ------------------------------------------------------------------ Types */

export type Location = {
  slug: string;
  name: string;
  status: "open" | "coming-soon";
  addressLine: string;
  district: string;
  city: string;
  postalCode?: string;
  /** Geo coords for maps + JSON-LD. Placeholder for coming-soon. */
  geo?: { lat: number; lng: number };
  /** Weekly hours. `null` = closed that day. */
  hours: { day: string; open: string | null; close: string | null }[];
  phone: string;
  /** Human blurb for the location card + detail page. */
  blurb: string;
  /** Longer intro on the detail page. */
  description: string;
  mapEmbedQuery: string;
  priceRange: string;
};

export type Barber = {
  slug: string;
  name: string;
  role: string;
  /** Short one-liner for cards. */
  tagline: string;
  bio: string;
  instagram?: { handle: string; url: string };
  locationSlug: string;
  /** Signature specialities shown as chips. */
  specialties: string[];
  yearsExperience: number;
  /** Real data flag — placeholders are clearly marked. */
  isPlaceholder?: boolean;
};

export type Service = {
  name: string;
  description: string;
  durationMin: number;
  price: number; // in BGN (лв.)
  category: "Коса" | "Брада" | "Комбо" | "Академия";
  popular?: boolean;
};

export type AcademyModule = {
  number: string;
  title: string;
  summary: string;
  points: string[];
};

export type EventItem = {
  date: string; // ISO
  label: string;
  title: string;
  href?: string;
};

export type Review = {
  author: string;
  rating: number;
  text: string;
  source: "Google" | "Fresha" | "Instagram";
  date: string;
};

export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

/* -------------------------------------------------------------- Locations */

export const locations: Location[] = [
  {
    slug: "zdravets-iztok",
    name: "Здравец Изток",
    status: "open",
    addressLine: "ул. Нови Сад 4",
    district: "Здравец Изток",
    city: "Русе",
    postalCode: "7005",
    geo: { lat: 43.856, lng: 25.9714 }, // NEEDS YOU: verify exact coords
    hours: [
      { day: "Понеделник", open: "10:00", close: "20:00" },
      { day: "Вторник", open: "10:00", close: "20:00" },
      { day: "Сряда", open: "10:00", close: "20:00" },
      { day: "Четвъртък", open: "10:00", close: "20:00" },
      { day: "Петък", open: "10:00", close: "20:00" },
      { day: "Събота", open: "09:00", close: "18:00" },
      { day: "Неделя", open: null, close: null },
    ],
    phone: "0882 031 790",
    blurb:
      "Флагманът ни в сърцето на Здравец Изток. Място, в което столът е твой, а времето — само за теб.",
    description:
      "Първият дом на Bonnie & Clyde. Тук започна всичко — прецизни подстрижки, оформяне на брада и усещане за ритуал, а не за конвейер. Топла светлина, добра музика и бръснари, които слушат преди да хванат машинката.",
    mapEmbedQuery: "ул. Нови Сад 4, Русе, Здравец Изток",
    priceRange: "25–70 лв.",
  },
  {
    slug: "center",
    name: "Център",
    status: "coming-soon",
    addressLine: "Очаквай скоро", // NEEDS YOU: real address
    district: "Център",
    city: "Русе",
    hours: [
      { day: "Понеделник", open: null, close: null },
      { day: "Вторник", open: null, close: null },
      { day: "Сряда", open: null, close: null },
      { day: "Четвъртък", open: null, close: null },
      { day: "Петък", open: null, close: null },
      { day: "Събота", open: null, close: null },
      { day: "Неделя", open: null, close: null },
    ],
    phone: "0882 031 790",
    blurb:
      "Вторият ни адрес — в центъра на Русе. Скоро отваряме врати. Следи Instagram за датата.",
    description:
      "Разрастваме се. Втори салон Bonnie & Clyde идва в центъра на Русе — със същия стандарт, същата музика и същото отношение. Мястото се подготвя в момента.",
    mapEmbedQuery: "Център, Русе",
    priceRange: "25–70 лв.",
  },
];

/* ---------------------------------------------------------------- Barbers */

export const barbers: Barber[] = [
  {
    slug: "alex",
    name: "Алекс",
    role: "Основател и майстор бръснар",
    tagline: "Фейдове, които не прощават грешки.",
    bio: "Алекс започна Bonnie & Clyde с една идея — че подстрижката е ритуал, не услуга. Прецизни фейдове, чисти линии и око, което забелязва всеки милиметър. Когато не е зад стола, преподава в Академията.",
    instagram: { handle: "alexx_cutzz", url: "https://instagram.com/alexx_cutzz" },
    locationSlug: "zdravets-iztok",
    specialties: ["Skin fade", "Класически бръснач", "Оформяне на брада"],
    yearsExperience: 9,
  },
  {
    slug: "martin",
    name: "Мартин", // NEEDS YOU: real name/handle/bio
    role: "Старши бръснар",
    tagline: "Текстура, поток и класика с характер.",
    bio: "Мартин работи бавно там, където трябва, и бързо там, където може. Силен е в текстурни, естествено изглеждащи подстрижки и в класическото мъжко оформяне.",
    instagram: { handle: "bonnienclyde_ruse", url: "https://instagram.com/bonnienclyde_ruse" },
    locationSlug: "zdravets-iztok",
    specialties: ["Scissor work", "Класика", "Brush styling"],
    yearsExperience: 6,
    isPlaceholder: true,
  },
  {
    slug: "kris",
    name: "Крис", // NEEDS YOU: real name/handle/bio
    role: "Бръснар и инструктор в Академията",
    tagline: "Младата ръка с най-стабилната линия.",
    bio: "Крис премина през Академията и остана. Прецизен по природа, обича чистите контури и работата с бръснач, и помага в обучението на новите випуски.",
    instagram: { handle: "bonnienclyde_ruse", url: "https://instagram.com/bonnienclyde_ruse" },
    locationSlug: "zdravets-iztok",
    specialties: ["Line-up", "Hot towel", "Обучение"],
    yearsExperience: 4,
    isPlaceholder: true,
  },
];

/* --------------------------------------------------------------- Services */

export const services: Service[] = [
  {
    name: "Мъжка подстрижка",
    description: "Консултация, измиване, подстригване и стайлинг. Твоят ритуал от началото до края.",
    durationMin: 45,
    price: 35,
    category: "Коса",
    popular: true,
  },
  {
    name: "Skin fade",
    description: "Изчистен преход до кожата с прецизна детайлна работа по контурите.",
    durationMin: 50,
    price: 40,
    category: "Коса",
    popular: true,
  },
  {
    name: "Детска подстрижка",
    description: "За джентълмени до 12 г. Спокойно темпо и търпение.",
    durationMin: 40,
    price: 25,
    category: "Коса",
  },
  {
    name: "Оформяне на брада",
    description: "Оформяне с машинка и бръснач, горещ пешкир и олио за завършек.",
    durationMin: 30,
    price: 25,
    category: "Брада",
    popular: true,
  },
  {
    name: "Кралско бръснене",
    description: "Класическо бръснене с бръснач, горещи и студени кърпи. Пълен ритуал.",
    durationMin: 40,
    price: 35,
    category: "Брада",
  },
  {
    name: "Коса + брада",
    description: "Пълният пакет — подстрижка и оформена брада в едно посещение.",
    durationMin: 70,
    price: 55,
    category: "Комбо",
    popular: true,
  },
  {
    name: "Баща + син",
    description: "Един стол, две поколения. Подстрижка за двама.",
    durationMin: 75,
    price: 55,
    category: "Комбо",
  },
  {
    name: "Оформяне на вежди",
    description: "Прецизно почистване и оформяне за завършен вид.",
    durationMin: 15,
    price: 10,
    category: "Брада",
  },
];

/* ---------------------------------------------------------------- Academy */

export const academyIntro = {
  eyebrow: "Академия Bonnie & Clyde",
  title: "Стани бръснар. По занаята, не по видеа.",
  lead: "Практическо обучение от активни бръснари. Работиш върху истински клиенти, под око на ментор, докато линията ти спре да трепери. Малки групи, реален стол, реална обратна връзка.",
  priceNote: "Инвестиция: цена и дати при консултация", // NEEDS YOU: real price + dates
  duration: "8 седмици · присъствено в Русе", // NEEDS YOU: confirm
  ctaLabel: "Запиши консултация",
};

export const academyModules: AcademyModule[] = [
  {
    number: "01",
    title: "Основи и хигиена",
    summary: "Инструменти, безопасност, стерилизация и стойка зад стола.",
    points: ["Машинки, ножици, бръснач", "Дезинфекция и хигиена", "Ергономия и хват"],
  },
  {
    number: "02",
    title: "Fade техники",
    summary: "От low до high fade — контрол на прехода и на числата.",
    points: ["Low / mid / high fade", "Skin fade", "Blend без линии"],
  },
  {
    number: "03",
    title: "Ножица и текстура",
    summary: "Scissor over comb, точкуване и естествена текстура.",
    points: ["Scissor over comb", "Point cutting", "Дълга коса"],
  },
  {
    number: "04",
    title: "Брада и бръснач",
    summary: "Оформяне, симетрия и класическо бръснене с горещ пешкир.",
    points: ["Line-up с бръснач", "Оформяне на брада", "Hot towel ритуал"],
  },
  {
    number: "05",
    title: "Клиент и стол",
    summary: "Консултация, комуникация и изграждане на редовни клиенти.",
    points: ["Консултация", "Работа с възражения", "Задържане на клиенти"],
  },
  {
    number: "06",
    title: "Бизнесът",
    summary: "Резервации, цени, соц. мрежи и първите ти клиенти.",
    points: ["Fresha и календар", "Instagram портфолио", "Ценообразуване"],
  },
];

/* ----------------------------------------------------------------- Events */

export const events: EventItem[] = [
  {
    date: "2026-07-19",
    label: "Академия",
    title: "Отворен ден — виж как се работи в реален салон",
  },
  {
    date: "2026-07-26",
    label: "Нов випуск",
    title: "Записване за летния випуск на Академията",
  },
  {
    date: "2026-08-02",
    label: "Guest barber",
    title: "Гост-бръснар в Здравец Изток — цял ден демонстрации",
  },
  {
    date: "2026-08-15",
    label: "Скоро",
    title: "Отваряме салон Център — следи Instagram за датата",
  },
];

/* ---------------------------------------------------------------- Reviews */
// NEEDS YOU: replace with real Google/Fresha review text + authors.

export const reviews: Review[] = [
  {
    author: "Георги Д.",
    rating: 5,
    text: "Най-добрият fade, който съм имал. Алекс усеща какво искаш още преди да си го казал. Отношението е на друго ниво.",
    source: "Google",
    date: "2026-05-12",
  },
  {
    author: "Ивайло П.",
    rating: 5,
    text: "Ходя от година и няма нито едно разочарование. Чисто, точно, с добра музика и без бързане.",
    source: "Google",
    date: "2026-04-28",
  },
  {
    author: "Николай С.",
    rating: 5,
    text: "Записах се за брада, излязох с ново самочувствие. Горещият пешкир е задължителен.",
    source: "Fresha",
    date: "2026-06-03",
  },
  {
    author: "Мирослав К.",
    rating: 5,
    text: "Синът ми не сядаше при никого. Тук седи спокойно и излиза щастлив. Това говори всичко.",
    source: "Google",
    date: "2026-03-19",
  },
  {
    author: "Стефан А.",
    rating: 5,
    text: "Минах през Академията и вече работя зад собствен стол. Учат те на занаята, не на теория.",
    source: "Instagram",
    date: "2026-02-10",
  },
  {
    author: "Димитър В.",
    rating: 5,
    text: "Премиум усещане на нормална цена. Препоръчвам на всеки в Русе.",
    source: "Fresha",
    date: "2026-06-21",
  },
];

export const aggregateRating = {
  value: 4.9,
  count: 148, // NEEDS YOU: sync with real Google/Fresha count
} as const;

/* ------------------------------------------------------------------ Stats */

export const stats: Stat[] = [
  { value: 4.9, label: "Среден рейтинг", suffix: "★" },
  { value: 9, label: "Години зад стола", suffix: "+" },
  { value: 12000, label: "Подстрижки", suffix: "+" },
  { value: 30, label: "Завършили Академията", suffix: "+" },
];

/* ------------------------------------------------------------- Instagram */
// Static fallback grid. Swap `src` for real images; wire a live feed later.
export const instagramPosts = Array.from({ length: 6 }).map((_, i) => ({
  id: `ig-${i + 1}`,
  alt: `Работа на Bonnie & Clyde — публикация ${i + 1}`,
  href: "https://instagram.com/bonnienclyde_ruse",
}));

/* ---------------------------------------------------------------- Gallery */
// NEEDS YOU: real photos. Placeholders render as on-brand gradients.
export const galleryItems = Array.from({ length: 9 }).map((_, i) => ({
  id: `g-${i + 1}`,
  alt: `Галерия Bonnie & Clyde — снимка ${i + 1}`,
  tall: i % 4 === 0,
}));

/* -------------------------------------------------------------------- FAQ */

export const faqs = [
  {
    q: "Как да запазя час?",
    a: "Онлайн през Fresha — бутонът „Запази час“ те води директно към свободните часове. Може и по телефона на 0882 031 790.",
  },
  {
    q: "Мога ли да избера конкретен бръснар?",
    a: "Да. От страницата на екипа или директно във Fresha избираш бръснар и час, който ти е удобен.",
  },
  {
    q: "Приемате ли деца?",
    a: "Разбира се. Имаме детска подстрижка и пакет „баща + син“. Спокойно темпо, без бързане.",
  },
  {
    q: "Как работи Академията?",
    a: "Присъствено обучение в Русе с активни бръснари и работа върху реални клиенти. Започваш с безплатна консултация през Cal.com, за да видим дали си пасваме.",
  },
  {
    q: "Кога отваря салонът в Център?",
    a: "Подготвяме го в момента. Следи Instagram @bonnienclyde_ruse за точната дата.",
  },
];

/* --------------------------------------------------------------- Helpers */

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getBarber(slug: string): Barber | undefined {
  return barbers.find((b) => b.slug === slug);
}

export function barbersForLocation(slug: string): Barber[] {
  return barbers.filter((b) => b.locationSlug === slug);
}
