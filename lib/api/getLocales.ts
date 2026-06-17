import { request } from "@/lib/api/axios";
import { Locale } from "@/types/locale";

export const getLocales = async () => {
  const res = await request.get<Locale[]>("/i18n/locales");
  return res.data;
};
