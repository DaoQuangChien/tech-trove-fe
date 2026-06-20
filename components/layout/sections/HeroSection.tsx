"use client";

import { ChevronsDown } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { getMediaUrl } from "@/lib/utils";
import { HeroSection as HeroSectionType } from "@/types/sections";

const HeroSection = (props: HeroSectionType) => {
  const {
    type,
    title,
    subtitle,
    primaryCtaLink,
    primaryCtaText,
    secondaryCtaLink,
    secondaryCtaText,
  } = props;
  const bottomRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  if (type === "image") {
    return <></>;
  }
  return (
    <section data-name="HeroSection" className="relative h-screen">
      <video
        key={props.video.url}
        src={getMediaUrl(props.video.url)}
        className="pointer-events-none size-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="content-block absolute top-1/2 left-1/2 flex -translate-1/2 flex-col gap-10">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="w-full text-7xl font-bold uppercase text-shadow-lg">{title}</h1>
          {subtitle && <h2 className="text-3xl">{subtitle}</h2>}
        </div>
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-stone-500"></div>
          <span className="text-sm text-stone-700">★</span>
          <div className="h-px flex-1 bg-stone-500"></div>
        </div>
        <div className="cta-block flex justify-center gap-3">
          <Button asChild size="lg" variant="gradient" className="font-bold">
            {primaryCtaText && <Link href={primaryCtaLink}>{primaryCtaText}</Link>}
          </Button>
          <Button asChild size="lg" variant="secondary" className="font-bold">
            {secondaryCtaText && <Link href={secondaryCtaLink}>{secondaryCtaText}</Link>}
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="hover:text-text-base animate-bounce cursor-pointer self-center hover:bg-transparent"
          onClick={handleScroll}
        >
          <ChevronsDown className="size-12!" />
        </Button>
      </div>
      <div ref={bottomRef} />
    </section>
  );
};

export default HeroSection;
