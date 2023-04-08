import { ReactElement, ReactNode } from "react";

export type RouteItem = {
  path: string;
  guard?: ({ children }: { children: ReactNode }) => ReactElement;
  layout?: ({ children }: { children: ReactNode }) => ReactElement;
  loading?: () => ReactElement;
  element?: any;
  elementProps?: any;
  children?: RouteItem[];
};
