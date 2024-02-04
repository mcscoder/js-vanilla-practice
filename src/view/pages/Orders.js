import { routePaths } from "@/constants";
import { Breadcrumb } from "..";

export class Orders {
  constructor() {
    this.orders = document.createElement("div");

    this.breadcrumb = new Breadcrumb(routePaths.orders);
    this.orders.append(this.breadcrumb.render());
  }

  render() {
    return this.orders;
  }
}
