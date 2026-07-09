/**
 * ── CONTENT READ LAYER ────────────────────────────────────────────────────
 * Server-side reads from Supabase, mapped into clean view-models that mirror
 * the shapes the public pages already used (see the old src/data/site.ts).
 * All content is now editable through the admin at /admin.
 *
 * Reads use the anon key with public-read RLS. Functions are wrapped in
 * React.cache so a single request de-dupes repeated calls.
 * ──────────────────────────────────────────────────────────────────────────
 */
import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";

/* ------------------------------------------------------------------- Types */

export type Img = { url: string; alt: string };
export type Hour = { day: string; open: string | null; close: string | null };

export type Location = {
  id: string;
  slug: string;
  name: string;
  status: "open" | "coming-soon";
  addressLine: string;
  district: string;
  city: string;
  postalCode: string;
  geo?: { lat: number; lng: number };
  phone: string;
  email: string;
  blurb: string;
  description: string; // rich HTML
  mapEmbedQuery: string;
  priceRange: string;
  hours: Hour[];
  freshaUrl: string;
  images: Img[];
};

export type Barber = {
  id: string;
  slug: string;
  name: string;
  role: string;
  tagline: string;
  bio: string; // rich HTML
  instagram?: { handle: string; url: string };
  locationSlug?: string;
  locationName?: string;
  locationFreshaUrl?: string;
  specialties: string[];
  yearsExperience: number;
  bookingUrl: string;
  avatarUrl: string;
  isPlaceholder: boolean;
  images: Img[];
};

export type Service = {
  id: string;
  name: string;
  description: string; // rich HTML
  durationMin: number;
  price: number;
  category: string;
  tags: string[];
  bookingUrl: string;
  popular: boolean;
};

export type AcademyModule = {
  id: string;
  number: string;
  title: string;
  summary: string; // rich HTML
  points: string[];
};

export type AcademyStartDate = { date: string; label: string };

export type Academy = {
  eyebrow: string;
  title: string;
  lead: string; // rich HTML
  description: string; // rich HTML
  priceNote: string;
  duration: string;
  startDates: AcademyStartDate[];
  ctaLabel: string;
  ctaUrl: string;
  modules: AcademyModule[];
  images: Img[];
};

export type EventItem = {
  id: string;
  date: string;
  label: string;
  title: string;
  href: string;
};

export type Guest = {
  id: string;
  slug: string;
  name: string;
  discipline: string;
  style: string;
  bio: string; // rich HTML
  instagram?: { handle: string; url: string };
  from: string;
  to: string;
  locationSlug?: string;
  locationName?: string;
  specialties: string[];
  imageUrl: string;
  featured: boolean;
  isPlaceholder: boolean;
};

export type GalleryItem = {
  id: string;
  url: string;
  alt: string;
  tall: boolean;
};

export type AboutValue = { title: string; text: string };
export type About = {
  eyebrow: string;
  title: string;
  lead: string;
  body: string; // rich HTML
  values: AboutValue[];
  imageUrl: string;
};

export type SiteSettings = {
  businessName: string;
  tagline: string;
  city: string;
  phone: string;
  email: string;
  instagramShop: { handle: string; url: string };
  instagramBarber: { handle: string; url: string };
  calcomUrl: string;
  defaultFreshaUrl: string;
  contactsIntro: string;
};

/* ---------------------------------------------------------------- Mappers */

function sortImages<T extends { sort_order: number }>(rows: T[] | null | undefined) {
  return [...(rows ?? [])].sort((a, b) => a.sort_order - b.sort_order);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapLocation(row: any): Location {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    status: row.status,
    addressLine: row.address_line ?? "",
    district: row.district ?? "",
    city: row.city ?? "",
    postalCode: row.postal_code ?? "",
    geo:
      row.lat != null && row.lng != null
        ? { lat: row.lat, lng: row.lng }
        : undefined,
    phone: row.phone ?? "",
    email: row.email ?? "",
    blurb: row.blurb ?? "",
    description: row.description ?? "",
    mapEmbedQuery: row.map_embed_query ?? "",
    priceRange: row.price_range ?? "",
    hours: Array.isArray(row.hours) ? row.hours : [],
    freshaUrl: row.fresha_url ?? "",
    images: sortImages(row.images).map((i: any) => ({ url: i.url, alt: i.alt ?? "" })),
  };
}

function mapBarber(row: any): Barber {
  const handle = row.instagram_handle ?? "";
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    role: row.role ?? "",
    tagline: row.tagline ?? "",
    bio: row.bio ?? "",
    instagram:
      handle || row.instagram_url
        ? { handle, url: row.instagram_url ?? "" }
        : undefined,
    locationSlug: row.location?.slug ?? undefined,
    locationName: row.location?.name ?? undefined,
    locationFreshaUrl: row.location?.fresha_url ?? undefined,
    specialties: row.specialties ?? [],
    yearsExperience: row.years_experience ?? 0,
    bookingUrl: row.booking_url ?? "",
    avatarUrl: row.avatar_url ?? "",
    isPlaceholder: !!row.is_placeholder,
    images: sortImages(row.images).map((i: any) => ({ url: i.url, alt: i.alt ?? "" })),
  };
}

function mapService(row: any): Service {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? "",
    durationMin: row.duration_min ?? 0,
    price: Number(row.price ?? 0),
    category: row.category ?? "",
    tags: row.tags ?? [],
    bookingUrl: row.booking_url ?? "",
    popular: !!row.popular,
  };
}

function mapGuest(row: any): Guest {
  const handle = row.instagram_handle ?? "";
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    discipline: row.discipline ?? "",
    style: row.style ?? "",
    bio: row.bio ?? "",
    instagram:
      handle || row.instagram_url
        ? { handle, url: row.instagram_url ?? "" }
        : undefined,
    from: row.from_date ?? "",
    to: row.to_date ?? "",
    locationSlug: row.location?.slug ?? undefined,
    locationName: row.location?.name ?? undefined,
    specialties: row.specialties ?? [],
    imageUrl: row.image_url ?? "",
    featured: !!row.featured,
    isPlaceholder: !!row.is_placeholder,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* --------------------------------------------------------------- Queries */

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const supabase = createPublicClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  const r = data ?? ({} as Record<string, unknown>);
  return {
    businessName: (r.business_name as string) ?? "Bonnie & Clyde",
    tagline: (r.tagline as string) ?? "Барбершоп & Академия",
    city: (r.city as string) ?? "Русе",
    phone: (r.phone as string) ?? "",
    email: (r.email as string) ?? "",
    instagramShop: {
      handle: (r.instagram_shop_handle as string) ?? "",
      url: (r.instagram_shop_url as string) ?? "",
    },
    instagramBarber: {
      handle: (r.instagram_barber_handle as string) ?? "",
      url: (r.instagram_barber_url as string) ?? "",
    },
    calcomUrl: (r.calcom_url as string) ?? "",
    defaultFreshaUrl: (r.default_fresha_url as string) ?? "",
    contactsIntro: (r.contacts_intro as string) ?? "",
  };
});

export const getLocations = cache(async (): Promise<Location[]> => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("locations")
    .select("*, images:location_images(*)")
    .order("sort_order");
  return (data ?? []).map(mapLocation);
});

export const getLocation = cache(async (slug: string): Promise<Location | undefined> => {
  const locations = await getLocations();
  return locations.find((l) => l.slug === slug);
});

export const getBarbers = cache(async (): Promise<Barber[]> => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("barbers")
    .select("*, location:locations(slug,name,fresha_url), images:barber_images(*)")
    .order("sort_order");
  return (data ?? []).map(mapBarber);
});

export const getBarber = cache(async (slug: string): Promise<Barber | undefined> => {
  const barbers = await getBarbers();
  return barbers.find((b) => b.slug === slug);
});

export const barbersForLocation = cache(async (slug: string): Promise<Barber[]> => {
  const barbers = await getBarbers();
  return barbers.filter((b) => b.locationSlug === slug);
});

export const getServices = cache(async (): Promise<Service[]> => {
  const supabase = createPublicClient();
  const { data } = await supabase.from("services").select("*").order("sort_order");
  return (data ?? []).map(mapService);
});

export const getAcademy = cache(async (): Promise<Academy> => {
  const supabase = createPublicClient();
  const [{ data: s }, { data: mods }, { data: imgs }] = await Promise.all([
    supabase.from("academy_settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("academy_modules").select("*").order("sort_order"),
    supabase.from("academy_images").select("*").order("sort_order"),
  ]);
  const settings = s ?? ({} as Record<string, unknown>);
  const startDates = Array.isArray(settings.start_dates)
    ? (settings.start_dates as AcademyStartDate[])
    : [];
  return {
    eyebrow: (settings.eyebrow as string) ?? "",
    title: (settings.title as string) ?? "",
    lead: (settings.lead as string) ?? "",
    description: (settings.description as string) ?? "",
    priceNote: (settings.price_note as string) ?? "",
    duration: (settings.duration as string) ?? "",
    startDates,
    ctaLabel: (settings.cta_label as string) ?? "Запиши консултация",
    ctaUrl: (settings.cta_url as string) ?? "",
    modules: (mods ?? []).map((m) => ({
      id: m.id,
      number: m.number ?? "",
      title: m.title,
      summary: m.summary ?? "",
      points: m.points ?? [],
    })),
    images: (imgs ?? []).map((i) => ({ url: i.url, alt: i.alt ?? "" })),
  };
});

export const getEvents = cache(async (): Promise<EventItem[]> => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });
  return (data ?? []).map((e) => ({
    id: e.id,
    date: e.date,
    label: e.label ?? "",
    title: e.title,
    href: e.href ?? "",
  }));
});

export const getGuests = cache(async (): Promise<Guest[]> => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("guests")
    .select("*, location:locations(slug,name)")
    .order("sort_order");
  return (data ?? []).map(mapGuest);
});

export const getGuest = cache(async (slug: string): Promise<Guest | undefined> => {
  const guests = await getGuests();
  return guests.find((g) => g.slug === slug);
});

export const featuredGuest = cache(async (): Promise<Guest | undefined> => {
  const guests = await getGuests();
  return guests.find((g) => g.featured) ?? guests[0];
});

export const getGallery = cache(async (): Promise<GalleryItem[]> => {
  const supabase = createPublicClient();
  const { data } = await supabase.from("gallery").select("*").order("sort_order");
  return (data ?? []).map((g) => ({
    id: g.id,
    url: g.url,
    alt: g.alt ?? "",
    tall: !!g.tall,
  }));
});

export const getAbout = cache(async (): Promise<About> => {
  const supabase = createPublicClient();
  const { data } = await supabase.from("about_settings").select("*").eq("id", 1).maybeSingle();
  const r = data ?? ({} as Record<string, unknown>);
  const values = Array.isArray(r.values) ? (r.values as AboutValue[]) : [];
  return {
    eyebrow: (r.eyebrow as string) ?? "За нас",
    title: (r.title as string) ?? "",
    lead: (r.lead as string) ?? "",
    body: (r.body as string) ?? "",
    values,
    imageUrl: (r.image_url as string) ?? "",
  };
});
