"use client";

import { createContext, PropsWithChildren, useContext } from "react";

import { Category } from "@/types/category";
import { GlobalConfig } from "@/types/globalConfig";
import { Locale } from "@/types/locale";

export type GlobalConfigContextValue = {
  globalConfig: GlobalConfig;
  categories: Category[];
  locales: Locale[];
};

interface Props extends PropsWithChildren {
  globalConfigContext: GlobalConfigContextValue;
}

const GlobalConfigContext = createContext<GlobalConfigContextValue | null>(null);

export const GlobalConfigProvider = ({ globalConfigContext, children }: Props) => {
  return (
    <GlobalConfigContext.Provider value={{ ...globalConfigContext }}>
      {children}
    </GlobalConfigContext.Provider>
  );
};

export const useGlobalConfig = () => {
  const context = useContext(GlobalConfigContext);

  if (!context) {
    throw new Error("useGlobalConfig must be used within GlobalConfigProvider");
  }

  return context;
};
