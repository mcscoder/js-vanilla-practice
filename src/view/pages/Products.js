import { routePaths } from "@/constants";
import { Breadcrumb } from "..";

export class Products {
  constructor() {
    this.products = document.createElement("div");

    this.breadcrumb = new Breadcrumb(routePaths.products);
    this.products.append(this.breadcrumb.render());
  }

  render() {
    return this.products;
  }
}
