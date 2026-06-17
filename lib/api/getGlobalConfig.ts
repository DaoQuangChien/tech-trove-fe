import { GlobalConfig } from "@/types/globalConfig";
import { request } from "./axios";

export const getGlobalConfig = async () => {
  const res = await request.get<{ data: GlobalConfig }>("/global", {
    params: {
      populate: {
        socialMedia: true,
        locations: true,
        menu: {
          populate: {
            logo: true,
            items: true,
          },
        },
      },
    },
  });

  return res.data.data;
};
