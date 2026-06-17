import { request } from "@/lib/api/axios";
import { Category } from "@/types/category";

export async function getCategories() {
  const res = await request.get<{ data: Category[] }>("/categories", {
    params: {
      filters: {
        isActive: { $eq: true },
      },
      sort: "name",
    },
  });

  return res.data.data;
}
