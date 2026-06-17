import { Media } from "./media";

export interface RichTextContent {
  type: string;
  children: {
    type: string;
    text?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
  }[];
}

export interface BlockParagraph {
  __component: "blocks.paragraph";
  id: number;
  content: RichTextContent[];
}

export interface BlockImage {
  __component: "blocks.image";
  id: number;
  title?: string | null;
  description?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
  image?: Media | null;
}

export interface BlockTable {
  __component: "blocks.table";
  id: number;
  caption?: string | null;
  rows?: TableRow[];
}

export interface TableRow {
  id: number;
  cells: string[];
}

export type NoteType = "info" | "warning" | "danger" | "success";

export interface BlockNote {
  __component: "blocks.note";
  id: number;
  content: RichTextContent[];
  type: NoteType;
}

export type ProductDescriptionBlock = BlockParagraph | BlockImage | BlockTable | BlockNote;
