import { RouteInfo } from "components/utils";

export const routeMap = {
  book: "/book",
  magazine: "/magazine",
  cd: "/cd",
} as const;

const routeNameList = ["Book", "Magazine", "CD"] as const;

export type RouteKey = keyof typeof routeMap;
export type RouteValue = typeof routeMap[RouteKey];
export type RouteName = typeof routeNameList[number];

export const routeInfoMap: Record<RouteKey, RouteInfo> = {
  book: {
    displayName: routeNameList[0],
    routeKey: "book",
  },
  magazine: {
    displayName: routeNameList[1],
    routeKey: "magazine",
  },
  cd: {
    displayName: routeNameList[2],
    routeKey: "cd",
  },
};
