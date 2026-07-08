import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Bonnie & Clyde — Барбершоп & Академия, Русе";

export default function Image() {
  return renderOg({
    eyebrow: "Барбершоп & Академия",
    title: "Твоят ритуал",
    subtitle: "Прецизни подстрижки · Обучение за бръснари · Русе",
  });
}
