import dynamic from "next/dynamic";

import { DynamicZoneComponent } from "@/types";

const HeroSection = dynamic(() => import("./sections/HeroSection"), { ssr: true });
const BestSellerSection = dynamic(() => import("./sections/BestSellerSection"), { ssr: true });
const ProductsByCategorySection = dynamic(() => import("./sections/ProductsByCategorySection"), {
  ssr: true,
});

type Props = {
  components: DynamicZoneComponent[];
};

const DynamicZone = (props: Props) => {
  return props.components.map((comp) => {
    const key = `${comp.__component}_${comp.id}`;

    switch (comp.__component) {
      case "sections.hero":
        return <HeroSection key={key} {...comp} />;
      case "sections.best-seller":
        return <BestSellerSection key={key} {...comp} />;
      case "sections.products-by-category":
        return <ProductsByCategorySection key={key} {...comp} />;
      default:
        console.warn("Missing component for:", (comp as DynamicZoneComponent).__component);
        return null;
    }
  });
};

export default DynamicZone;
