import { Link } from "./link";
import { Location } from "./location";
import { Menu } from "./menu";
import { RichTextNode } from "./richtextBlock";
import { StrapiEntity } from "./strapi";

export interface GlobalConfig extends StrapiEntity {
  siteName: string;
  siteDescription: string;
  locale: string;
  menu: Menu;
  locations: Location[];
  socialMedia: Link[];
  footerDescription: RichTextNode[];
  phoneNumber: string;
  email: string;
}
