import { formatINR } from "@/utils";

export class ProductItem {
  static render(imgURL, title, currentPrice, sales) {
    // container element
    const container = document.createElement("div");
    container.className = "product_stat-product_item-container";

    // product image
    const productImage = document.createElement("img");
    productImage.className = "product_stat-product_item-product_image";
    productImage.width = 64;
    productImage.height = 64;
    productImage.src = imgURL;

    // container 1 element. this will cover other title and price1
    const container1 = document.createElement("div");
    container1.className = "product_stat-product_item-container-1";

    // product title
    const productTitle = document.createElement("h4");
    productTitle.className = "product_stat-product_item-title";
    productTitle.textContent = title;

    // price1 element
    const price1 = document.createElement("p");
    price1.className = "product_stat-product_item-price1";
    price1.textContent = formatINR(currentPrice);

    // add elements to container 1
    container1.append(productTitle, price1);

    // container 2 element. this will cover price2 and product sales
    const container2 = document.createElement("div");
    container2.className = "product_stat-product_item-container-2";

    // price2 element
    const price2 = document.createElement("p");
    price2.className = "product_stat-product_item-price2";
    price2.textContent = formatINR(currentPrice);

    // product sales element
    const productSales = document.createElement("p");
    productSales.className = "product_stat-product_item-sales";
    productSales.textContent = `${sales} sales`;

    // add elements to container 2
    container2.append(price2, productSales);

    // add elements to global container
    container.append(productImage, container1, container2);

    return container;
  }
}
