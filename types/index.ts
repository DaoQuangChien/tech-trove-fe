import { BestSellerSection, HeroSection, ProductsByCategorySection } from "./sections";

export type Nullable<T> = T | null;

export type DynamicZoneComponent = HeroSection | BestSellerSection | ProductsByCategorySection;
