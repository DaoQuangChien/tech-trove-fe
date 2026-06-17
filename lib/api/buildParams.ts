import { StrapiQueryParams } from "@/types/strapi";

export const buildStrapiParams = (params: StrapiQueryParams = {}) => {
  const { populate, filters, pagination } = params;

  return {
    ...(populate && { populate }),
    ...(filters && { filters }),
    ...(pagination && { pagination }),
  };
};
