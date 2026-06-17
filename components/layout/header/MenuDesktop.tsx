"use client";

import clsx from "clsx";
import Link from "next/link";

import { useGlobalConfig } from "@/app/providers/global-config";
import LanguageSelector from "@/components/layout/header/LanguageSelector";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
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
      <NavigationMenuItem className="relative">
        <NavigationMenuTrigger className="bg-transparent data-[state=open]:bg-white">
          <Link href="/products">{item.label}</Link>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid min-w-55 gap-2 py-2">
            {props.subItems.map((subItem) => (
              <li key={subItem.id} className="hover:bg-accent px-2">
                <NavigationMenuLink asChild>
                  <Link
                    href={`/products?category=${subItem.slug}`}
                    className="block rounded px-2 py-1 text-sm"
                  >
                    {subItem.name}
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
        <NavigationMenuViewport />
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={clsx(navigationMenuTriggerStyle(), "bg-transparent")}>
        <Link href={item.link}>{item.label}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const SHOW_LANGUAGE_SELECTOR = false;

const MenuDesktop = () => {
  const { categories, locales, globalConfig } = useGlobalConfig();
  const { menu } = globalConfig || {};
  const { items = [] } = menu || {};
  const MENU_PROPS_MAP = {
    "/products": {
      subItems: categories,
    },
  };
  return (
    <div className="hidden items-center gap-6 md:flex">
      <NavigationMenu>
        <NavigationMenuList className="gap-x-3 space-x-0">
          {items.map((item) => {
            const mapProps = MENU_PROPS_MAP[item.link as keyof typeof MENU_PROPS_MAP];
            return (
              <MenuItem
                key={item.id}
                item={item}
                type={mapProps ? "dropdown" : "link"}
                {...mapProps}
              />
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
      {SHOW_LANGUAGE_SELECTOR && (
        <>
          <Separator orientation="vertical" />
          <LanguageSelector locales={locales} />
        </>
      )}
    </div>
  );
};

export default MenuDesktop;
