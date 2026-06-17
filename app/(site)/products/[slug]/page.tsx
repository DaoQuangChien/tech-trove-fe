import { BadgePercent, Sparkles, Tag } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductMediaCarousel from "@/components/layout/ProductMediaCarousel";
import { Card, CardContent } from "@/components/ui/card";
import GradientBackdrop from "@/components/ui/GradientBackdrop";
import { Grid, GridItem } from "@/components/ui/Grid";
import { GradientSeparator } from "@/components/ui/separator";
import TiptapRenderer from "@/components/ui/TiptapRenderer";
import { getProduct } from "@/lib/api/getProduct";
import { getProducts } from "@/lib/api/getProducts";
import { cn, formatMoney } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

export const generateStaticParams = async () => {
  const pageSize = 100;
  const slugs: { slug: string }[] = [];

  let page = 1;
  let pageCount = 1;

  do {
    const { data: products, meta } = await getProducts({ pagination: { page, pageSize } });

    slugs.push(...products.map((product) => ({ slug: product.slug })));
    pageCount = meta.pagination.pageCount;
    page += 1;
  } while (page <= pageCount);

  return slugs;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
  };
};

const GLASS_CARD_CLASSES =
  "border border-accent-foreground/50 bg-transparent bg-linear-180 from-slate-700/60 via-slate-800/50 to-slate-900/40 ring-1 ring-inset ring-white/10 backdrop-blur-md backdrop-saturate-150 shadow-lg shadow-black/30";

const ProductDetailsPage = async ({ params }: Props) => {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const discountPercent =
    product.salePrice && product.price
      ? Math.round(100 - (product.salePrice / product.price) * 100)
      : null;

  return (
    <GradientBackdrop className="pt-6 md:pt-20">
      <Grid data-name="ProductDetailsPage" className="relative items-stretch">
        <GridItem span={4} md={7} className="h-full">
          <ProductMediaCarousel
            media={
              product.media?.length ? product.media : product.thumbnail ? [product.thumbnail] : []
            }
            productName={product.name}
          />
        </GridItem>

        <GridItem span={4} md={5} className="h-full">
          <Card className={cn("flex h-full flex-col gap-5 p-6", GLASS_CARD_CLASSES)}>
            {product.isBestSeller && (
              <span className="from-gradient-1 via-gradient-2 to-gradient-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-linear-[135deg] px-3 py-1 text-xs font-semibold tracking-wide text-slate-950 uppercase">
                <Sparkles className="size-3.5" />
                Bán chạy nhất
              </span>
            )}

            <h1 className="from-gradient-3 to-gradient-1 self-start bg-linear-to-r bg-clip-text text-4xl font-bold text-transparent">
              {product.name}
            </h1>

            {product.categories?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category) => (
                  <span
                    key={category.id}
                    className="border-accent-foreground/60 text-text-base inline-flex items-center gap-1.5 rounded-full border bg-slate-900/60 px-3 py-1 text-sm transition-colors hover:border-sky-400/50"
                  >
                    <Tag className="size-3.5 text-sky-400" />
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            <GradientSeparator className="my-4" />

            {product.price && (
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-text-base text-3xl font-extrabold">
                  {formatMoney(product.salePrice ?? product.price)}
                </p>
                {product.salePrice && (
                  <>
                    <span className="text-muted-foreground text-lg font-medium line-through">
                      {formatMoney(product.price)}
                    </span>
                    {discountPercent && discountPercent > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 px-2.5 py-1 text-sm font-semibold text-rose-400">
                        <BadgePercent className="size-4" />-{discountPercent}%
                      </span>
                    )}
                  </>
                )}
              </div>
            )}

            {product.description && (
              <p className="text-text-base leading-relaxed">{product.description}</p>
            )}
          </Card>
        </GridItem>

        <GridItem span={4} md={12} className="mt-10">
          <Card className={GLASS_CARD_CLASSES}>
            <CardContent className="p-6">
              <TiptapRenderer content={product.content} />
            </CardContent>
          </Card>
        </GridItem>
      </Grid>
    </GradientBackdrop>
  );
};

export default ProductDetailsPage;
