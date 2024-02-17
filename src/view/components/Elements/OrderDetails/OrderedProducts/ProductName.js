import { Link } from "../..";

export class ProductName {
  static render(imgURL, name) {
    // leading class name: ordered_products-product_name

    // container element covering product image and title
    const container = new Link("#").render();
    container.className =
      "ordered_products-product_name-container ordered_products-link";

    // product image
    const productImage = document.createElement("img");
    productImage.src = imgURL;
    productImage.width = 40;
    productImage.height = 40;
    productImage.className = "ordered_products-product_name-image";

    // product title
    const productTitle = document.createElement("span");
    productTitle.textContent = name;

    // add product image and title
    container.append(productImage, productTitle);

    return container;
  }
}