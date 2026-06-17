export type RichTextNode = {
  type: string;
  children?: RichTextNode[];
  text?: string;
  level?: number;
  url?: string;
  format?: string[];
};
