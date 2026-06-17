"use client";

import { useSearchParams } from "next/navigation";

import ProductCategoryFilter from "@/components/layout/ProductCategoryFilter";
import ProductGrid from "@/components/layout/ProductGrid";
import ProductsPagination from "@/components/layout/ProductsPagination";
import { GradientSeparator } from "@/components/ui/separator";
import { useProducts } from "@/lib/queries/useProducts";
import { Category } from "@/types/category";
import { Product } from "@/types/products";
import { StrapiListResponse } from "@/types/strapi";

const PAGE_SIZE = 12;

type Props = {
  categories: Category[];
};

const ProductsContent = ({ categories }: Props) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const { data, isLoading, isError } = useProducts<StrapiListResponse<Product>>({
    populate: "*",
    filters: category
      ? {
          categories: {
            slug: { $eq: category },
          },
        }
      : undefined,
    pagination: { page, pageSize: PAGE_SIZE },
  });

  const activeCategory = categories.find((c) => c.slug === category);

  const buildHref = (targetPage: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (targetPage > 1) params.set("page", String(targetPage));
    const query = params.toString();
    return `/products${query ? `?${query}` : ""}`;
  };

  return (
    <>
      <div className="mb-10 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="from-gradient-3 to-gradient-1 bg-linear-to-r bg-clip-text text-4xl font-bold text-transparent">
            {activeCategory ? `Sản phẩm: ${activeCategory.name}` : "Tất cả sản phẩm"}
          </h1>
          <ProductCategoryFilter categories={categories} activeCategorySlug={category} />
        </div>
        <GradientSeparator />
      </div>

      {isError ? (
        <p className="text-text-base text-xl">
          Không thể tải sản phẩm lúc này, vui lòng thử lại sau.
        </p>
      ) : isLoading ? (
        <p className="text-text-base text-xl">Đang tải sản phẩm...</p>
      ) : (
        <ProductGrid products={data?.data ?? []} />
      )}

      {data && (
        <ProductsPagination
          currentPage={data.meta.pagination.page}
          pageCount={data.meta.pagination.pageCount}
          buildHref={buildHref}
          className="mt-12"
        />
      )}
    </>
  );
};

export default ProductsContent;
