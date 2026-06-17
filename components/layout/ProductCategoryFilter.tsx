"use client";

import { ChevronDown, Filter, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@/types/category";

type Props = {
  categories: Category[];
  activeCategorySlug?: string;
};

const ProductCategoryFilter = (props: Props) => {
  const { categories, activeCategorySlug } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = categories.find((category) => category.slug === activeCategorySlug);

  const handleSelect = (slug?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    params.delete("page");

    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="size-4" />
            {activeCategory ? activeCategory.name : "Tất cả danh mục"}
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onSelect={() => handleSelect(undefined)}>
            Tất cả danh mục
          </DropdownMenuItem>
          {categories.map((category) => (
            <DropdownMenuItem key={category.id} onSelect={() => handleSelect(category.slug)}>
              {category.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {activeCategory && (
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground gap-1"
          onClick={() => handleSelect(undefined)}
        >
          <X className="size-4" />
          Xóa lọc
        </Button>
      )}
    </div>
  );
};

export default ProductCategoryFilter;
