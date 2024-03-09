import { ContentSection } from "@/view/components/Layouts";
import { Link, ListTable, OrderSummary, ProductName } from "../..";
import { formatINR } from "@/utils";
import { Order } from "@/model/dto"; // eslint-disable-line no-unused-vars

const headerTextItems = ["Product Name", "Order ID", "Quantity", "Total"];

export class OrderedProducts {
  /**
   *
   * @param {Order} orderDetails
   */
  constructor(orderDetails) {
    // leading class name: ordered_products

    this.orderProducts = orderDetails.orderProducts;

    // container element covering ordered products table and summary
    this.container = document.createElement("div");
    this.container.className = "ordered_products-container";

    /** @type {(string | HTMLElement)[][]} */
    this.bodyItems = [];

    this.orderTotalPrice = 0;

    this.orderProducts.forEach((orderProduct) => {
      // 1. product name link
      const productLink = ProductName.render(
        orderProduct.productId,
        orderProduct.product.name,
        orderProduct.product.productImages[0].imageURL
      );

      // 2. order id link
      const orderIdLink = new Link("#");
      orderIdLink.link.text = `#${orderProduct.orderId}`;

      // 3. quantity
      const productQuantity = orderProduct.quantity;

      // 4. total price
      const totalPrice = orderProduct.quantity * orderProduct.price;
      this.orderTotalPrice += totalPrice;

      this.bodyItems.push([
        productLink,
        orderIdLink.render(),
        productQuantity,
        formatINR(totalPrice),
      ]);
    });

    // ordered products table
    this.table = new ListTable("Products", headerTextItems, this.bodyItems);
    this.table.tableHeader.addColumnClassName(
      0,
      "ordered_products-product_name"
    );

    this.table.tableBody.addColumnClassName(0, "ordered_products-product_name");
    this.table.tableBody.addColumnClassName(1, "ordered_products-link");

    this.table.tableHeader.addColumnClassName(
      3,
      "ordered_products-total_price"
    );
    this.table.tableBody.addColumnClassName(3, "ordered_products-total_price");

    // container 1 element covering order summary
    this.container1 = document.createElement("div");
    this.container1.className = "ordered_products-container-1";

    // order summary
    this.orderSummary = new OrderSummary(this.orderTotalPrice);

    // add order summary to container 1
    this.container1.append(this.orderSummary.render());

    // add elements to container
    this.container.append(this.table.render(), this.container1);
  }

  render() {
    return new ContentSection(this.container).render();
  }
}
