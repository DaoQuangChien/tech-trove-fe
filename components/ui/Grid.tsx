import { ElementType, forwardRef, HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const breakPoints = ["sm", "md", "lg", "xl", "xxl"] as const;

type SharedProps = PropsWithChildren &
  HTMLAttributes<HTMLElement> & {
    tag?: ElementType;
  };
type Size = (typeof sizes)[number];
type BreakPoint = (typeof breakPoints)[number];
type GridItemProps = {
  span?: Size;
} & {
  [K in BreakPoint]?: Size;
} & SharedProps;

const SPAN_MAP = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

const SM_SPAN_MAP = {
  1: "sm:col-span-1",
  2: "sm:col-span-2",
  3: "sm:col-span-3",
  4: "sm:col-span-4",
  5: "sm:col-span-5",
  6: "sm:col-span-6",
  7: "sm:col-span-7",
  8: "sm:col-span-8",
  9: "sm:col-span-9",
  10: "sm:col-span-10",
  11: "sm:col-span-11",
  12: "sm:col-span-12",
};
const MD_SPAN_MAP = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  10: "md:col-span-10",
  11: "md:col-span-11",
  12: "md:col-span-12",
};
const LG_SPAN_MAP = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  9: "lg:col-span-9",
  10: "lg:col-span-10",
  11: "lg:col-span-11",
  12: "lg:col-span-12",
};
const XL_SPAN_MAP = {
  1: "xl:col-span-1",
  2: "xl:col-span-2",
  3: "xl:col-span-3",
  4: "xl:col-span-4",
  5: "xl:col-span-5",
  6: "xl:col-span-6",
  7: "xl:col-span-7",
  8: "xl:col-span-8",
  9: "xl:col-span-9",
  10: "xl:col-span-10",
  11: "xl:col-span-11",
  12: "xl:col-span-12",
};
const XXL_SPAN_MAP = {
  1: "xxl:col-span-1",
  2: "xxl:col-span-2",
  3: "xxl:col-span-3",
  4: "xxl:col-span-4",
  5: "xxl:col-span-5",
  6: "xxl:col-span-6",
  7: "xxl:col-span-7",
  8: "xxl:col-span-8",
  9: "xxl:col-span-9",
  10: "xxl:col-span-10",
  11: "xxl:col-span-11",
  12: "xxl:col-span-12",
};

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>((props, ref) => {
  const { tag: Tag = "div", children, className, span = 4, sm, md, lg, xl, xxl, ...rest } = props;
  return (
    <Tag
      ref={ref}
      {...rest}
      className={cn(
        SPAN_MAP[span],
        sm && SM_SPAN_MAP[sm],
        md && MD_SPAN_MAP[md],
        lg && LG_SPAN_MAP[lg],
        xl && XL_SPAN_MAP[xl],
        xxl && XXL_SPAN_MAP[xxl],
        className
      )}
    >
      {children}
    </Tag>
  );
});

GridItem.displayName = "GridItem";

export const Grid = forwardRef<HTMLElement, SharedProps>((props, ref) => {
  const { tag: Tag = "div", children, className, ...rest } = props;
  return (
    <Tag
      ref={ref}
      {...rest}
      className={cn("grid grid-cols-4 gap-4 p-6 md:grid-cols-12 md:gap-6 md:p-20", className)}
    >
      {children}
    </Tag>
  );
});

Grid.displayName = "Grid";
