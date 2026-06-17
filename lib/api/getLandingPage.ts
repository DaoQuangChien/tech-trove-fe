import { request } from "@/lib/api/axios";
import { LandingPage } from "@/types/landingPage";

export const getLandingPage = async () => {
  const res = await request.get<{ data: LandingPage }>("/landing-page", {
    params: {
      populate: {
        sections: {
          populate: "*",
        },
      },
    },
  });

  return res.data.data;
};
