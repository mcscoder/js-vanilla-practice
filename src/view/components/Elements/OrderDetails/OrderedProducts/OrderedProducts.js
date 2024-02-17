import { ContentSection } from "@/view/components/Layouts";
import { Link, ListTable, OrderSummary, ProductName } from "../..";
import { formatINR } from "@/utils";

const headerTextItems = ["Product Name", "Order ID", "Quantity", "Total"];

const orderedProducts = [
  {
    product: {
      name: "Yasuo hasagi",
      imgURL: "https://www.mobafire.com/images/champion/square/yasuo.png",
    },
    orderId: "696969",
    quantity: 3,
    price: 504.3,
  },
  {
    product: {
      name: "Yasuo hasagi",
      imgURL: "https://www.mobafire.com/images/champion/square/yasuo.png",
    },
    orderId: "696969",
    quantity: 1,
    price: 504.3,
  },
  {
    product: {
      name: "Yasuo hasagi",
      imgURL: "https://www.mobafire.com/images/champion/square/yasuo.png",
    },
    orderId: "696969",
    quantity: 1,
    price: 504.3,
  },
  {
    product: {
      name: "Yasuo hasagi",
      imgURL: "https://www.mobafire.com/images/champion/square/yasuo.png",
    },
    orderId: "696969",
    quantity: 1,
    price: 504.3,
  },
];

export class OrderedProducts {
  constructor() {
    // leading class name: ordered_products

    // container element covering ordered products table and summary
    this.container = document.createElement("div");
    this.container.className = "ordered_products-container";

    /** @type {(string | HTMLElement)[][]} */
    this.bodyItems = [];

    this.orderTotalPrice = 0;

    orderedProducts.forEach(({ product, orderId, quantity, price }) => {
      // 1. product name link
      const productLink = ProductName.render(product.imgURL, product.name);

      // 2. order id link
      const orderIdLink = new Link("#");
      orderIdLink.link.text = `#${orderId}`;

      // 3. quantity
      const productQuantity = quantity;

      // 4. total price
      const totalPrice = quantity * price;
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
