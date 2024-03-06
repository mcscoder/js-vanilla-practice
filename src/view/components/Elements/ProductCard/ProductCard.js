import { formatINR } from "@/utils";
import { Button, Link, buttonSizes, buttonVariants } from "..";
import {
  arrowDownIcon,
  arrowUpIcon,
  threeDotsHorizontalIcon,
} from "@/constants";
import { ContentSection } from "../..";
import { Product } from "@/model/dto"; // eslint-disable-line no-unused-vars

export class ProductCard {
  /**
   *
   * @param {Product} product
   * @returns
   */
  static render(product) {
    // global container
    const container = document.createElement("div");
    container.className = "product_card-container";

    // container 1 element. cover img, name, category, price, option button
    const container1 = document.createElement("div");
    container1.className = "product_card-container-1";

    // product image element
    const image = document.createElement("img");
    image.className = "product_card-image";
    image.src = product.productImages[0].imageURL;
    image.width = 84;
    image.height = 84;

    // container 1.1 element. cover name, category, price
    const container1_1 = document.createElement("div");
    container1_1.className = "product_card-container-1-1";

    // product name
    const productNameLink = new Link(`/product-details/${product.id}`).render();

    productNameLink.className = "product_card-name";
    productNameLink.textContent = product.name;

    // product category
    const productCategory = document.createElement("p");
    productCategory.className = "product_card-category";
    productCategory.textContent = product.category.name;

    // product price
    const productPrice = document.createElement("p");
    productPrice.className = "product_card-price";
    productPrice.textContent = formatINR(product.regularPrice);

    // add elements to container 1.1
    container1_1.append(productNameLink, productCategory, productPrice);

    // option button
    const optionButton = new Button(
      null,
      threeDotsHorizontalIcon,
      null,
      buttonVariants.iconOnly,
      buttonSizes.iconOnly,
      "product_card-option_button",
      () => {}
    );

    // add elements to container 1
    container1.append(image, container1_1, optionButton.render());

    // container 2. cover product description
    const container2 = document.createElement("div");
    container2.className = "product_card-container-2";

    // description title
    const descriptionTitle = document.createElement("p");
    descriptionTitle.className = "product_card-description-title";
    descriptionTitle.textContent = "Summary";

    // description
    const descriptionContent = document.createElement("p");
    descriptionContent.className = "product_card-description-content";
    descriptionContent.textContent = product.description;

    // add elements to container 2
    container2.append(descriptionTitle, descriptionContent);

    // container 3. cover sales and in stock (remaining products)
    const container3 = document.createElement("div");
    container3.className = "product_card-container-3";

    // sales container cover sales title, icon, sales content
    const salesContainer = document.createElement("div");
    salesContainer.className = "product_card-status-container";

    // sales title
    const salesTitle = document.createElement("p");
    salesTitle.className = "product_card-status-title";
    salesTitle.textContent = "Sales";

    // sales container 1. cover icon and sales
    const salesContainer1 = document.createElement("p");
    salesContainer1.className = "product_card-status-container-1";

    // which icon selected based on sales
    // if it positive icon will be up arrow
    // and otherwise icon will be down arrow
    // simulation sales index by condition
    // true = positive; false = negative
    const condition = true;
    const icon = document.createElement("div");
    icon.innerHTML = condition ? arrowUpIcon : arrowDownIcon;
    icon.className = `product_card-status-sales_icon-${condition ? "positive" : "negative"} icon-container`;

    // sales index
    const salesContent = document.createElement("p");
    salesContent.className = "product_card-status-content";
    salesContent.textContent = product.sales;

    // add elements to sales container 1
    salesContainer1.append(icon, salesContent);

    // add elements to sales container
    salesContainer.append(salesTitle, salesContainer1);

    // separator element, this will be placed between sales and in stock
    const separator = document.createElement("div");
    separator.className = "product_card-separator";

    // in stock container. cover in stock title, status bar, in stock content
    const inStockContainer = document.createElement("div");
    inStockContainer.className = "product_card-status-container";

    // in stock title
    const inStockTitle = document.createElement("p");
    inStockTitle.className = "product_card-status-title";
    inStockTitle.textContent = "Remaining Products";

    // in stock container 1. cover status bar and in stock content
    const inStockContainer1 = document.createElement("div");
    inStockContainer1.className = "product_card-status-container-1";

    // status bar
    // outer status bar
    const statusbarOuter = document.createElement("div");
    statusbarOuter.className = "product_card-status-status_bar-outer";

    // inner status bar
    // inner status bar width based on ratio of current-products/max-products
    // simulation ratio
    const ratio = 50;
    const statusbarInner = document.createElement("div");
    statusbarInner.className = "product_card-status-status_bar-inner";
    statusbarInner.style = `width: ${ratio}%`;

    // add statusbar inner to outer
    statusbarOuter.append(statusbarInner);

    // in stock content
    const inStockContent = document.createElement("p");
    inStockContent.className = "product_card-status-content";
    inStockContent.textContent = product.quantity;

    // add elements to in stock container 1
    inStockContainer1.append(statusbarOuter, inStockContent);

    // add elements to in stock container
    inStockContainer.append(inStockTitle, inStockContainer1);

    // add elements to container 3
    container3.append(salesContainer, separator, inStockContainer);

    // add elements to global container
    container.append(container1, container2, container3);

    const contentSection = new ContentSection(container).render();
    contentSection.classList.add("product_card-section_content");

    return contentSection;
  }
}
