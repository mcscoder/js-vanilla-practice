import { routePaths } from "@/constants";
import { Breadcrumb, CustomerDetailsSection, OrderedProducts } from "..";
import { OrderDetailsController } from "@/controllers";
import { Order } from "@/model/dto"; // eslint-disable-line no-unused-vars

export class OrderDetails {
  constructor() {
    this.controller = new OrderDetailsController(this.dataFetched.bind(this));

    // global container
    this.container = document.createElement("div");
    this.container.className = "order_details-container";
  }

  /**
   * @private
   */
  initContent() {
    // clear content
    this.container.innerText = "";

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
    this.userDetailsSection = new CustomerDetailsSection(
      this.orderDetails,
      this.controller.onSave.bind(this.controller)
    );

    // ordered products
    this.orderedProducts = new OrderedProducts(this.orderDetails);

    // add elements to global container
    this.container.append(
      this.container1,
      this.userDetailsSection.render(),
      this.orderedProducts.render()
    );
  }

  /**
   * @param {Order} orderDetails
   */
  dataFetched(orderDetails) {
    this.orderDetails = orderDetails;
    this.initContent();
  }

  render() {
    return this.container;
  }
}
