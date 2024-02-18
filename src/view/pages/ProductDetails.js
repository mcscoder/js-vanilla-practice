import { routePaths } from "@/constants";
import { Breadcrumb } from "..";

export class ProductDetails {
  constructor() {
    // container element
    this.container = document.createElement("div");
    this.container.className = "product_details-container";

    // container 1 element covering breadcrumb
    this.container1 = document.createElement("div");
    this.container1.className = "product_details-container-1";

    // breadcrumb element
    this.breadcrumb = new Breadcrumb(
      routePaths.products,
      routePaths.productDetails
    );

    // add breadcrumb to container 1
    this.container1.append(this.breadcrumb.render());

    // add elements to global container
    this.container.append(this.container1);
  }
  render() {
    return this.container;
  }
}
