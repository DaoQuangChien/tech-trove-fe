import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getMediaUrl = (url?: string) => {
  if (!url) return "";

  if (url.startsWith("http")) return url;

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};

export const formatMoney = (value: number, locale = "vi-VN", currency = "VND") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};
