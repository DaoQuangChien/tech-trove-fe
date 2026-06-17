import { StrapiEntity } from "./strapi";

export interface Locale extends StrapiEntity {
  code: string;
  name: string;
  isDefault: boolean;
}
