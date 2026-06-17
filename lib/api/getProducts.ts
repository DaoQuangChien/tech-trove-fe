import { request } from "@/lib/api/axios";
import { Product } from "@/types/products";
import { StrapiListResponse, StrapiQueryParams } from "@/types/strapi";

export const getProducts = async (params?: StrapiQueryParams) => {
  const res = await request.get<StrapiListResponse<Product>>("/products", {
    params: {
      populate: "*",
      ...params,
    },
  });

  return res.data;
};
