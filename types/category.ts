import { StrapiEntity } from "./strapi";

export interface Category extends StrapiEntity {
  slug: string;
  name: string;
  description?: string | null;
  isActive: boolean;
}
