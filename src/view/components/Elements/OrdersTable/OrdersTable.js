import { CustomerName, DeliveryStatus, Link, ListTable } from "..";
import { ContentSection } from "../..";
import { formatINR } from "@/utils";

/** @type {string[]} */
export const headerTextItems = [
  "Product", // iPhone 15 vjp pro max xs smartest
  "Order ID", // #1234
  "Date", // Nov 8th,2023
  "Customer Name", // Giga Chad
  "Status", // 0: Delivered | 1: Canceled | 2: Transport
  "Amount", // ₹200.00 - Indian currency (Rupee)
];

export const tableBodyItems = [
  {
    product: "iPhone 15 vjp pro max xs smartest",
    orderId: "#1234",
    date: "Nov 8th,2023",
    customerName: {
      imgURL:
        "https://dudeproducts.com/cdn/shop/articles/gigachad_1068x.jpg?v=1667928905",
      name: "Giga Chad",
    },
    status: 1,
    amount: 200,
  },
  {
    product: "iPhone 15 vjp pro max xs smartest",
    orderId: "#1234",
    date: "Nov 8th,2023",
    customerName: {
      imgURL:
        "https://dudeproducts.com/cdn/shop/articles/gigachad_1068x.jpg?v=1667928905",
      name: "Giga Chad",
    },
    status: 0,
    amount: 200,
  },
  {
    product: "iPhone 15 vjp pro max xs smartest",
    orderId: "#1234",
    date: "Nov 8th,2023",
    customerName: {
      imgURL:
        "https://dudeproducts.com/cdn/shop/articles/gigachad_1068x.jpg?v=1667928905",
      name: "Giga Chad",
    },
    status: 0,
    amount: 200,
  },
  {
    product: "iPhone 15 vjp pro max xs smartest",
    orderId: "#1234",
    date: "Nov 8th,2023",
    customerName: {
      imgURL:
        "https://dudeproducts.com/cdn/shop/articles/gigachad_1068x.jpg?v=1667928905",
      name: "Giga Chad",
    },
    status: 0,
    amount: 200,
  },
  {
    product: "iPhone 15 vjp pro max xs smartest",
    orderId: "#1234",
    date: "Nov 8th,2023",
    customerName: {
      imgURL:
        "https://dudeproducts.com/cdn/shop/articles/gigachad_1068x.jpg?v=1667928905",
      name: "Giga Chad",
    },
    status: 0,
    amount: 200,
  },
  {
    product: "iPhone 15 vjp pro max xs smartest",
    orderId: "#1234",
    date: "Nov 8th,2023",
    customerName: {
      imgURL:
        "https://dudeproducts.com/cdn/shop/articles/gigachad_1068x.jpg?v=1667928905",
      name: "Giga Chad",
    },
    status: 0,
    amount: 200,
  },
  {
    product: "iPhone 15 vjp pro max xs smartest",
    orderId: "#1234",
    date: "Nov 8th,2023",
    customerName: {
      imgURL:
        "https://dudeproducts.com/cdn/shop/articles/gigachad_1068x.jpg?v=1667928905",
      name: "Giga Chad",
    },
    status: 0,
    amount: 200,
  },
];

export class OrdersTable {
  /**
   * @param {string} title
   */
  constructor(title) {
    // leading class name: order_table

    /** @type {(string|HTMLElement)[][]} */
    this.bodyItems = [];

    tableBodyItems.forEach(
      ({ product, orderId, date, customerName, status, amount }) => {
        // 1. product name link
        const productLink = new Link("#");
        productLink.link.textContent = product;

        // 2. order id link
        const orderIdLink = new Link("#");
        orderIdLink.link.text = orderId;

        // 3. date
        // date. temp code for designing UI
        // will be refactor later because date now is not string anymore
        // date will be a number or any date format depends on database format
        // that should be convert to expected format later
        const dateText = date;

        // 4. customer name element
        const customerNameElement = CustomerName.render(
          customerName.imgURL,
          customerName.name
        );

        // 5. delivery status element
        const deliveryStatusElement = DeliveryStatus.render(status);

        // 6. amount
        const amountText = formatINR(amount);

        this.bodyItems.push([
          productLink.render(),
          orderIdLink.render(),
          dateText,
          customerNameElement,
          deliveryStatusElement,
          amountText,
        ]);
      }
    );

    // list table element
    this.ordersTable = new ListTable(title, headerTextItems, this.bodyItems);
    this.ordersTable.tableHeader.addColumnClassName(
      0,
      "order_table-product_name"
    );

    this.ordersTable.tableBody.addColumnClassName(
      0,
      "order_table-link",
      "order_table-product_name"
    );

    this.ordersTable.tableBody.addColumnClassName(1, "order_table-link");
  }

  render() {
    return new ContentSection(this.ordersTable.render()).render();
  }
}
