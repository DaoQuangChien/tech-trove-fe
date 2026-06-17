export type StrapiPopulate = "*" | string | string[] | Record<string, unknown>;

export type StrapiFilters = Record<string, unknown>;

export type StrapiPagination = {
  page?: number;
  pageSize?: number;
};

export type StrapiQueryParams = {
  populate?: StrapiPopulate;
  filters?: StrapiFilters;
  pagination?: StrapiPagination;
};

export interface StrapiEntity {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale?: string;
}

export interface StrapiPaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMeta {
  pagination: StrapiPaginationMeta;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: StrapiMeta;
}
