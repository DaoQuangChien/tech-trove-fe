import { Media } from "./media";

export type MenuItem = {
  id: number;
  label: string;
  link: string;
};

export type Menu = {
  id: number;
  logo?: Media;
  items: MenuItem[];
};
