import { GradientSeparator } from "@/components/ui/separator";
import { getProducts } from "@/lib/api/getProducts";
import { BestSellerSection as BestSellerSectionType } from "@/types/sections";
import ProductGrid from "../ProductGrid";

const BestSellerSection = async (props: BestSellerSectionType) => {
  const { title, limit } = props;
  const { data } = await getProducts({
    filters: {
      isBestSeller: {
        $eq: true,
      },
    },
    pagination: {
      page: 1,
      pageSize: limit,
    },
  });

  return (
    <section data-name="BestSellerSection" className="p-6 md:p-20">
      <div className="flex flex-col gap-3 mb-10">
        <h3 className="text-4xl font-bold bg-linear-to-r from-gradient-3 to-gradient-1 bg-clip-text text-transparent self-start">
          {title}
        </h3>
        <GradientSeparator />
      </div>
      <ProductGrid products={data} />
    </section>
  );
};

export default BestSellerSection;
