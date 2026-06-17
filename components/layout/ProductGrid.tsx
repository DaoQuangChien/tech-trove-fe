import { Product } from "@/types/products";

import { Grid } from "../ui/Grid";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};
const ProductGrid = (props: Props) => {
  const { products = [] } = props;

  if (products.length === 0) {
    return <p className="text-text-base text-xl">Tụi mình đang cập nhật sản phẩm ạ 😊</p>;
  }

  return (
    <Grid className="p-0 md:p-0">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductGrid;
