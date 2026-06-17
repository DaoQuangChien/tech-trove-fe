import { StrapiEntity } from "./strapi";

export type MediaFormat = Partial<{
  ext: string;
  hash: string;
  url: string;
  width: number;
  height: number;
  mime: string;
  name: string;
  path: string;
  size: number;
  sizeInBytes: number;
}>;

export interface Media extends MediaFormat, StrapiEntity {
  alternativeText?: string;
  caption?: string;
  formats?: {
    thumbnail?: MediaFormat;
  };
  previewUrl?: string;
  provider?: string;
  provider_metadata?: string;
}
