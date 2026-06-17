import { useQuery } from "@tanstack/react-query";

import { request } from "@/lib/api/axios";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";

import { StrapiQueryParams } from "../../types/strapi";
import { buildStrapiParams } from "../api/buildParams";

type UseProductsOptions = StrapiQueryParams & {
  enabled?: boolean;
};

export const useProducts = <T>(options?: UseProductsOptions) => {
  return useQuery<T>({
    queryKey: [...QUERY_KEYS.products(options)],
    queryFn: async () => {
      const res = await request.get("/products", { params: buildStrapiParams(options) });
      return res.data;
    },
    enabled: options?.enabled,
  });
};
