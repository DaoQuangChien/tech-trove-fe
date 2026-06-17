import axios from "axios";
import qs from "qs";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export const request = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  paramsSerializer: (params) => qs.stringify(params, { encodeValuesOnly: true }),
});
