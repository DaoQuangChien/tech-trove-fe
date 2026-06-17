import { cache } from "react";

import { request } from "@/lib/api/axios";
import { Product } from "@/types/products";

type RawProduct = Omit<Product, "content"> & { content?: string | Product["content"] };

const parseContent = (content: RawProduct["content"]): Product["content"] => {
  if (typeof content !== "string") return content;
  if (!content) return undefined;

  try {
    return JSON.parse(content);
  } catch {
    return undefined;
  }
};

export const getProduct = cache(async (slug: string): Promise<Product | null> => {
  const res = await request.get<{ data: RawProduct[] }>("/products", {
    params: {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: "*",
    },
  });

  const product = res.data.data[0];

  if (!product) return null;

  return { ...product, content: parseContent(product.content) };
});
