import { routePaths } from "@/constants";
import { Home, Orders, Products } from "@/view";

export class Router {
  constructor() {
    this.routes = {
      [routePaths.home]: new Home(),
      [routePaths.products]: new Products(),
      [routePaths.orders]: new Orders(),
    };
  }

  getRouteComponent(path) {
    return this.routes[path];
  }
}
