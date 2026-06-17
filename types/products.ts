import { JSONContent } from "@tiptap/core";

import { Category } from "./category";
import { Media } from "./media";
import { StrapiEntity } from "./strapi";

export interface Product extends StrapiEntity {
  slug: string;
  name: string;
  price?: number;
  salePrice?: number;
  isBestSeller: boolean;
  isActive: boolean;
  categories: Category[];
  media?: Media[];
  thumbnail?: Media;
  description?: string;
  content?: JSONContent;
  localizations?: Product[];
}
