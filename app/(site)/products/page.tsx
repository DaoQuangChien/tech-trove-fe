import { Metadata } from "next";
import { Suspense } from "react";

import ProductsContent from "@/components/layout/ProductsContent";
import ProductsSkeleton from "@/components/layout/ProductsSkeleton";
import GradientBackdrop from "@/components/ui/GradientBackdrop";
import { getCategories } from "@/lib/api/getCategories";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Sản phẩm",
};

const ProductsPage = async () => {
  const categories = await getCategories();

  return (
    <GradientBackdrop className="grow p-6 pt-12 md:p-20 md:pt-40">
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsContent categories={categories} />
      </Suspense>
    </GradientBackdrop>
  );
};

export default ProductsPage;
