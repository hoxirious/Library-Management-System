import { PathKey, RouteName } from "components/data";
import { ComponentType } from "react";

export interface RouteProps {
  routeTo?: PathKey;
  extraPath?: string;
}

export interface RouteInfo {
  routeKey: PathKey;
  displayName: RouteName;
}

export interface RouteComponent{
  path: string;
  component: ComponentType<any>;
}
