import { routePaths } from "@/constants";
import { Breadcrumb, ContentSection, ProductDetailsForm } from "..";
import { createContainer } from "@/utils";
import { ProductDetailsController } from "@/controllers";
import { Product } from "@/model/dto"; // eslint-disable-line no-unused-vars

export class ProductDetails {
  constructor() {
    // leading class name: product_details

    this.productDetailsController = new ProductDetailsController(
      this.dataFetched.bind(this)
    );

    // global container
    this.container = createContainer("product_details-container");
  }

  initContent() {
    this.container.innerText = "";

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
    this.productDetailsForm = new ProductDetailsForm(this.product);

    this.productDetailsForm.onUpdate = () => {
      this.productDetailsController.setProductGallery.call(
        this.productDetailsController,
        this.productDetailsForm.productGallery
      );
      this.productDetailsController.onUpdate.call(
        this.productDetailsController
      );
    };

    // container 2
    this.container2 = new ContentSection(this.productDetailsForm.render());

    // add element to global container
    this.container.append(this.container1, this.container2.render());
  }

  /**
   *
   * @param {Product} product
   */
  dataFetched(product) {
    this.product = product;
    this.initContent();
  }

  render() {
    return this.container;
  }
}
