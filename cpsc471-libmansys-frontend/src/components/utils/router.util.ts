import { RouteKey, RouteName, RouteValue } from "components/data";

export interface RouteProps {
  routeTo?: RouteKey;
  extraPath?: string;
}

export interface RouteInfo {
  routeKey: RouteKey;
  displayName: RouteName;
}
