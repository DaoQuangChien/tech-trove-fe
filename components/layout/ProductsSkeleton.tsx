import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Grid, GridItem } from "@/components/ui/Grid";
import { cn } from "@/lib/utils";

const SKELETON_COUNT = 12;

const ProductsSkeleton = () => {
  return (
    <>
      <div className="flex flex-col gap-3 mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="h-10 w-64 rounded-md bg-accent-foreground/20 animate-pulse" />
          <div className="h-10 w-40 rounded-md bg-accent-foreground/20 animate-pulse" />
        </div>
        <div className="h-px w-full bg-accent-foreground/20" />
      </div>

      <Grid className="p-0 md:p-0">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <GridItem key={index} md={6} lg={3}>
            <Card className="bg-slate-900 border-accent-foreground border-2 overflow-hidden">
              <CardHeader className="p-0">
                <div
                  className={cn(
                    "h-56 xl:h-96 w-full bg-accent-foreground/20 animate-pulse",
                    "rounded-t-xl"
                  )}
                />
                <div className="p-6 pb-0">
                  <div className="h-6 w-3/4 rounded bg-accent-foreground/20 animate-pulse" />
                </div>
              </CardHeader>
              <div className="px-6 pb-6 pt-3 flex flex-col gap-3">
                <div className="h-4 w-1/3 rounded bg-accent-foreground/20 animate-pulse" />
                <div className="h-4 w-full rounded bg-accent-foreground/20 animate-pulse" />
              </div>
              <CardFooter>
                <div className="h-9 w-28 rounded-md bg-accent-foreground/20 animate-pulse" />
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export default ProductsSkeleton;
