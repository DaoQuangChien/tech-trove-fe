import { PropsWithChildren } from "react";
import { GlobalConfigContextValue, GlobalConfigProvider } from "./global-config";
import { ReactQueryProvider } from "./react-query";

interface Props extends PropsWithChildren {
  globalConfigContext: GlobalConfigContextValue;
}
export const Providers = ({ children, globalConfigContext }: Props) => {
  return (
    <ReactQueryProvider>
      <GlobalConfigProvider globalConfigContext={globalConfigContext}>
        {children}
      </GlobalConfigProvider>
    </ReactQueryProvider>
  );
};
