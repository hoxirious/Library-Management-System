import { RouteComponent, RouteInfo } from "models";
import { BookView, CartView, CdView, MagazineView, ProfileView } from "views";
import { StudentsView } from "views/StudentsView";

export const baseRoute = "/library" as const;

export const routeMap = {
  book: "/book",
  magazine: "/magazine",
  cd: "/cd",
  student: "/student",
  cart: "/cart",
  profile: "/profile",
} as const;

export type RouteName =
  | "Book"
  | "Magazine"
  | "CD"
  | "Students"
  | "My Cart"
  | "My Profile";

export type RouteKey = keyof typeof routeMap;
export type RouteValue = typeof routeMap[RouteKey];
export type PathKey = keyof typeof pathMap;

const getFullPath = (extraRoute: RouteKey) => {
  return `${baseRoute}${routeMap[extraRoute]}`;
};

export const pathMap = {
  bookView: getFullPath("book"),
  cdView: getFullPath("cd"),
  magazineView: getFullPath("magazine"),
  studentView: getFullPath("student"),
  cartView: getFullPath("cart"),
  profileView: getFullPath("profile"),
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
  {
    path: pathMap.cartView,
    component: CartView,
  },
  {
    path: pathMap.profileView,
    component: ProfileView,
  },
];

export const routeInfoMap: Record<RouteKey, RouteInfo> = {
  book: {
    displayName: "Book",
    routeKey: "bookView",
  },
  magazine: {
    displayName: "Magazine",
    routeKey: "magazineView",
  },
  cd: {
    displayName: "CD",
    routeKey: "cdView",
  },
  student: {
    displayName: "Students",
    routeKey: "studentView",
  },
  cart: {
    displayName: "My Cart",
    routeKey: "cartView",
  },
  profile: {
    displayName: "My Profile",
    routeKey: "profileView",
  },
};
