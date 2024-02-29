import { routePaths } from "@/constants";
import { Breadcrumb, ContentSection, ProductDetailsForm } from "..";
import { createContainer } from "@/utils";

export class ProductDetails {
  constructor() {
    // leading class name: product_details

    // container 1 children --------------------
    // 1. breadcrumb element
    this.breadcrumb = new Breadcrumb(
      routePaths.products,
      routePaths.productDetails
    );

    // container 1
    this.container1 = createContainer(
      "product_details-container-1",
      this.breadcrumb.render()
    );

    // container 2 children --------------------
    // 1. product details form
    this.productDetailsForm = new ProductDetailsForm();

    // container 2
    this.container2 = new ContentSection(this.productDetailsForm.render());

    // global container
    this.container = createContainer(
      "product_details-container",
      this.container1,
      this.container2.render()
    );
  }
  render() {
    return this.container;
  }
}
