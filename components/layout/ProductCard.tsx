import { CircleDollarSign } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "@/components/ui/image";
import { formatMoney } from "@/lib/utils";
import { Product } from "@/types/products";

import { GridItem } from "../ui/Grid";
import TextCollapse from "../ui/TextCollapse";

type Props = {
  product: Product;
};

const ProductCard = (props: Props) => {
  const { product } = props;

  return (
    <GridItem md={6} lg={3}>
      <Card className="border-accent-foreground hover:shadow-glow border-2 bg-slate-900 transition-all hover:-translate-y-1 hover:border-sky-400/50">
        <CardHeader className="overflow-hidden rounded-t-xl p-0">
          {product.thumbnail && (
            <Image
              src={product.thumbnail.url}
              alt={product.thumbnail.name || ""}
              width={product.thumbnail.width}
              height={product.thumbnail.height}
              className="max-h-56 w-auto object-cover object-center xl:max-h-96"
            />
          )}
          <CardTitle className="text-text-base p-6 text-xl font-bold">{product.name}</CardTitle>
        </CardHeader>
        <CardDescription className="text-text-base flex flex-col gap-3 px-6 pb-6">
          {product.price && (
            <p className="flex items-center gap-1 text-base">
              <CircleDollarSign />
              {formatMoney(product.price)}
            </p>
          )}
          <TextCollapse>{product.description}</TextCollapse>
        </CardDescription>
        <CardFooter>
          <Button variant="gradient" className="font-bold" asChild>
            <Link href={`/products/${product.slug}`}>Xem chi tiết</Link>
          </Button>
        </CardFooter>
      </Card>
    </GridItem>
  );
};

export default ProductCard;
