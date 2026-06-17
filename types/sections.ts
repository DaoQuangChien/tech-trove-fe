import { BlockImage } from "./blocks";
import { Category } from "./category";
import { Media } from "./media";

export type HeroBase = {
  id: number;
  primaryCtaLink: string;
  primaryCtaText: string;
  secondaryCtaLink: string;
  secondaryCtaText: string;
  subtitle?: string;
  title: string;
  __component: "sections.hero";
};

export type HeroVideo = {
  type: "video";
  video: Media;
};

export type HeroImage = {
  type: "image";
  imageItems: BlockImage[];
};

export type HeroSection = (HeroBase & HeroVideo) | (HeroBase & HeroImage);

export type BestSellerSection = {
  id: number;
  limit: number;
  title: string;
  __component: "sections.best-seller";
};

export type ProductsByCategorySection = {
  category?: Category;
  id: number;
  limit: number;
  title: string;
  __component: "sections.products-by-category";
};
