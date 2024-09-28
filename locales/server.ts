import { createI18nServer } from "next-international/server";

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  en: () => import("./en"),
  es: () => import("./es"),
  de: () => import("./de"),
  fr: () => import("./fr"),
  ru: () => import("./ru"),
});
