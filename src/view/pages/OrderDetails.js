import { routePaths } from "@/constants";
import { Breadcrumb, CustomerDetailsSection, OrderedProducts } from "..";

export class OrderDetails {
  constructor() {
    this.container = document.createElement("div");
    this.container.className = "order_details-container";

    // container 1 element. cover breadcrumb
    this.container1 = document.createElement("div");
    this.container1.className = "order_details-container-1";

    // breadcrumb
    this.breadcrumb = new Breadcrumb(
      routePaths.orders,
      routePaths.orderDetails
    );

    // add element to container 1
    this.container1.append(this.breadcrumb.render());

    // customer information details section
    this.userDetailsSection = new CustomerDetailsSection(6743, 3);

    // ordered products
    this.orderedProducts = new OrderedProducts();

    // add elements to global container
    this.container.append(
      this.container1,
      this.userDetailsSection.render(),
      this.orderedProducts.render()
    );
  }
  render() {
    return this.container;
  }
}
