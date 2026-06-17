"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

import { useGlobalConfig } from "@/app/providers/global-config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { MenuItem as MenuItemType } from "@/types/menu";

type MenuItemProps =
  | {
      item: MenuItemType;
      type: "link";
    }
  | {
      type: "dropdown";
      item: MenuItemType;
      subItems: { id: number; slug: string; name: string }[];
    };
const MenuItem = (props: MenuItemProps) => {
  const { type, item } = props;
  if (type === "dropdown") {
    return (
      <Accordion type="single" collapsible className="border-0">
        <AccordionItem value="products" className="border-0">
          <AccordionTrigger
            className={cn(
              navigationMenuTriggerStyle(),
              "bg-background/70 flex w-auto justify-between"
            )}
          >
            {item.label}
          </AccordionTrigger>
          <AccordionContent className="pt-3 pb-0">
            <ul className="ml-4 space-y-2">
              {props.subItems.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="text-primary-foreground hover:text-text-base hover:underline"
                  >
                    {cat.name}
                  </Link>
                  <Separator className="my-3" />
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }
  return (
    <Link
      href={item.link}
      className={cn(navigationMenuTriggerStyle(), "bg-background/70 flex w-auto justify-start")}
    >
      {item.label}
    </Link>
  );
};

const MobileMenu = () => {
  const { categories, globalConfig } = useGlobalConfig();
  const { menu } = globalConfig || {};
  const { items = [] } = menu || {};
  const MENU_PROPS_MAP = {
    "/products": {
      subItems: categories,
    },
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-background/50 border-0 backdrop-blur-sm backdrop-saturate-150">
        <nav className="mt-6 flex flex-col gap-4">
          {items.map((item) => {
            const mapProps = MENU_PROPS_MAP[item.link as keyof typeof MENU_PROPS_MAP];
            return mapProps ? (
              <MenuItem key={item.id} item={item} type="dropdown" {...mapProps} />
            ) : (
              <MenuItem key={item.id} item={item} type="link" />
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
