import Link from "next/link";

import { GradientSeparator } from "@/components/ui/separator";
import { getProducts } from "@/lib/api/getProducts";
import { ProductsByCategorySection as ProductsByCategorySectionType } from "@/types/sections";

import ProductGrid from "../ProductGrid";

const ProductsByCategorySection = async (props: ProductsByCategorySectionType) => {
  const { title, category, limit } = props;
  const { data } = await getProducts({
    filters: {
      categories: {
        slug: {
          $eq: category?.slug,
        },
      },
    },
    pagination: {
      page: 1,
      pageSize: limit,
    },
  });

  return (
    <section data-name="ProductsByCategorySection" className="p-6 md:p-20">
      <div className="mb-10 flex flex-col gap-3">
        <h3 className="from-gradient-3 to-gradient-1 self-start bg-linear-to-r bg-clip-text text-4xl font-bold text-transparent">
          <Link href={`/products?category=${category?.slug}`}>{title}</Link>
        </h3>
        <GradientSeparator />
      </div>
      <ProductGrid products={data} />
    </section>
  );
};

export default ProductsByCategorySection;
