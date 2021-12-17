import { RouteComponent, RouteInfo } from "models";
import { BookView, CdView, MagazineView } from "views";
import { StudentsView } from "views/StudentsView";

export const baseRoute = "/library" as const;

export const routeMap = {
  book: "/book",
  magazine: "/magazine",
  cd: "/cd",
  student: "/student",
} as const;

const routeNameList = ["Book", "Magazine", "CD", "Students"] as const;

export type RouteKey = keyof typeof routeMap;
export type RouteValue = typeof routeMap[RouteKey];
export type RouteName = typeof routeNameList[number];
export type PathKey = keyof typeof pathMap;

const getFullPath = (extraRoute: RouteKey) => {
  return `${baseRoute}${routeMap[extraRoute]}`;
};

export const pathMap = {
  bookView: getFullPath("book"),
  cdView: getFullPath("cd"),
  magazineView: getFullPath("magazine"),
  studentView: getFullPath("student"),
} as const;

export const RouteComponentList: RouteComponent[] = [
  {
    path: pathMap.bookView,
    component: BookView,
  },
  {
    path: pathMap.cdView,
    component: CdView,
  },
  {
    path: pathMap.magazineView,
    component: MagazineView,
  },
  {
    path: pathMap.studentView,
    component: StudentsView,
  },
];

export const routeInfoMap: Record<RouteKey, RouteInfo> = {
  book: {
    displayName: routeNameList[0],
    routeKey: "bookView",
  },
  magazine: {
    displayName: routeNameList[1],
    routeKey: "magazineView",
  },
  cd: {
    displayName: routeNameList[2],
    routeKey: "cdView",
  },
  student: {
    displayName: routeNameList[3],
    routeKey: "studentView",
  },
};
