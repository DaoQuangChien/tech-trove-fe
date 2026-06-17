import { PropsWithChildren } from "react";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/header";

const SiteLayout = async ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">{children}</main>
      <Footer />
    </>
  );
};

export default SiteLayout;
