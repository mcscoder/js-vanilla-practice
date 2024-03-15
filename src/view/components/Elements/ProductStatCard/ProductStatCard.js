import { threeDotsVerticalIcon } from "@/constants";
import { Button, buttonSizes, buttonVariants } from "..";
import { ProductItem } from ".";
import { ContentSection } from "../..";
import { Product } from "@/model/dto"; // eslint-disable-line no-unused-vars

export class ProductStatCard {
  /**
   *
   * @param {string} title
   * @param {Product[]} products
   */
  constructor(title, products) {
    this.products = products;

    // container element
    this.container = document.createElement("div");
    this.container.className = "product_stat-container";

    // container 1 element. this will cover title and option button
    this.container1 = document.createElement("div");
    this.container1.className = "product_stat-container-1";

    // title element
    this.titleElement = document.createElement("h3");
    this.titleElement.className = "product_stat-title";
    this.titleElement.textContent = title;

    // option button element
    this.optionButton = new Button(
      null,
      threeDotsVerticalIcon,
      null,
      buttonVariants.iconOnly,
      buttonSizes.iconOnly,
      null,
      () => {}
    ).render();

    // add elements to container 1
    this.container1.append(this.titleElement, this.optionButton);

    // container 2 element. this will product items and report button
    this.container2 = document.createElement("div");
    this.container2.className = "product_stat-container-2";

    // products container
    this.productContainer = document.createElement("div");
    this.productContainer.className = "product_stat-product_container";

    // initializes products
    this.initProducts();

    // report button element
    this.reportButton = new Button(
      "report",
      null,
      null,
      buttonVariants.secondary.filled,
      buttonSizes.md,
      "",
      () => {}
    ).render();

    // add elements to container 2
    this.container2.append(this.productContainer, this.reportButton);

    // add element to container
    this.container.append(this.container1, this.container2);
  }

  initProducts() {
    this.products.forEach((product) => {
      const productItem = ProductItem.render(product);
      this.productContainer.append(productItem);
    });
  }

  render() {
    return new ContentSection(this.container).render();
  }
}
