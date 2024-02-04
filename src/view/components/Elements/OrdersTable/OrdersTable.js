import { threeDotsVerticalIcon } from "@/constants";
import {
  Button,
  TableBody,
  TableHeader,
  buttonSizes,
  buttonVariants,
} from "..";
import { ContentSection } from "../..";

export const tableHeadingItems = [
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
  constructor(title) {
    // container
    this.container = document.createElement("div");
    this.container.className = "order_table-container";

    // container 1. cover title and right side three dots vertical button
    this.container1 = document.createElement("div");
    this.container1.className = "order_table-container-1";

    // title element
    this.titleElement = document.createElement("h3");
    this.titleElement.className = "order_table-title";
    this.titleElement.textContent = title;

    // right side three dots button
    this.optionButton = new Button(
      null,
      threeDotsVerticalIcon,
      null,
      buttonVariants.iconOnly,
      buttonSizes,
      "order_table-option_button",
      () => {}
    );

    // add elements to container 1
    this.container1.append(this.titleElement, this.optionButton.render());

    // table element
    this.table = document.createElement("table");
    this.table.className = "order_table-table";

    // table header group
    this.tableHeader = TableHeader.render(tableHeadingItems);

    // table body group
    this.tableBody = TableBody.render(tableBodyItems);

    // add elements to table element
    this.table.append(this.tableHeader, this.tableBody);

    // add elements to global container
    this.container.append(this.container1, this.table);
  }

  render() {
    return new ContentSection(this.container).render();
  }
}
