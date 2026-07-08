/** Global site constants: URL, name, defaults for metadata & OG. */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://bonnie-clyde-ruse.vercel.app";

export const SITE = {
  name: "Bonnie & Clyde",
  tagline: "Барбершоп & Академия",
  city: "Русе",
  shortDescription:
    "Bonnie & Clyde — барбершоп и академия в Русе. Прецизни подстрижки, оформяне на брада и обучение за нови бръснари.",
  locale: "bg_BG",
  lang: "bg",
  phone: "0882 031 790",
  phoneHref: "tel:+359882031790",
  phoneE164: "+359882031790",
  email: "hello@bonnieclyde.bg", // NEEDS YOU: placeholder
  instagram: {
    shop: { handle: "bonnienclyde_ruse", url: "https://instagram.com/bonnienclyde_ruse" },
    barber: { handle: "alexx_cutzz", url: "https://instagram.com/alexx_cutzz" },
  },
} as const;

export const OG = {
  width: 1200,
  height: 630,
} as const;
