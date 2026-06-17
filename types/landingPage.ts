import { BestSellerSection, HeroSection, ProductsByCategorySection } from "./sections";
import { StrapiEntity } from "./strapi";

export interface LandingPage extends StrapiEntity {
  sections: (HeroSection | BestSellerSection | ProductsByCategorySection)[];
}
