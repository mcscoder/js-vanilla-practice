import { Home, Orders, Products } from "@/view";

export const routePaths = {
  home: "/",
  products: "/products",
  orders: "/orders",
};

export const routeComponents = {
  [routePaths.home]: Home(),
  [routePaths.products]: Products(),
  [routePaths.orders]: Orders(),
};
