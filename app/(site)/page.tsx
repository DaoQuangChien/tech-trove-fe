import { Metadata } from "next";

import DynamicZone from "@/components/layout/DynamicZone";
import { getLandingPage } from "@/lib/api/getLandingPage";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Trang chủ",
};

export const revalidate = 300;

const Home = async () => {
  const data = await getLandingPage();

  return <DynamicZone components={data.sections} />;
};

export default Home;
