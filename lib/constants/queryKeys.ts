import { StrapiQueryParams } from "../../types/strapi";
import { buildStrapiParams } from "../api/buildParams";

export const QUERY_KEYS = {
  products: (options?: StrapiQueryParams) => ["products", buildStrapiParams(options)],
  product: (id: string | number) => ["product", id],
} as const;
