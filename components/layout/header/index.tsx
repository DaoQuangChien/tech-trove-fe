"use client";

import Link from "next/link";

import { useGlobalConfig } from "@/app/providers/global-config";
import { getMediaUrl } from "@/lib/utils";

import Image from "../../ui/image";
import MenuDesktop from "./MenuDesktop";
import MobileMenu from "./MenuMobile";

const Header = () => {
  const { globalConfig } = useGlobalConfig();
  const { menu } = globalConfig;
  const { logo } = menu;

  return (
    <header className="fixed inset-x-3 top-3 z-50">
      <div className="from-background/50 to-background/30 mx-auto flex max-w-7xl justify-between rounded-2xl border border-stone-600 bg-linear-180 px-6 py-2 shadow shadow-stone-600 backdrop-blur-sm backdrop-saturate-150">
        {logo && (
          <Link href="/" className="block">
            <Image
              src={getMediaUrl(logo.url)}
              alt={logo.name as string}
              width={logo.width}
              height={logo.height}
              className="max-h-10 w-auto"
            />
          </Link>
        )}
        <MenuDesktop />
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
