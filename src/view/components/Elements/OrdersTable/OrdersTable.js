import { Order } from "@/model/dto"; // eslint-disable-line no-unused-vars
import { CustomerName, DeliveryStatus, Link, ListTable } from "..";
import { ContentSection } from "../..";
import { formatINR } from "@/utils";

/** @type {string[]} */
export const headerTextItems = [
  "Order ID", // #1234
  "Date", // Nov 8th,2023
  "Customer Name", // Giga Chad
  "Status", // 0: Delivered | 1: Canceled | 2: Transport
  "Amount", // ₹200.00 - Indian currency (Rupee)
];

export class OrdersTable {
  /**
   * @param {string} title
   * @param {Order[]} orders
   */
  constructor(title, orders) {
    this.orders = orders;

    // leading class name: order_table

    /** @type {(string|HTMLElement)[][]} */
    this.bodyItems = [];

    this.orders.forEach((order) => {
      // 1. order id link
      const orderIdLink = new Link(`/order-details/${order.id}`);
      orderIdLink.link.text = `#${order.id}`;

      // 2. date
      // date. temp code for designing UI
      // will be refactor later because date now is not string anymore
      // date will be a number or any date format depends on database format
      // that should be convert to expected format later
      const dateText = "Nov 8th,2023";

      // 3. customer name element
      const customerNameElement = CustomerName.render(
        order.userPaymentMethod.user.avatar,
        `${order.userPaymentMethod.user.firstName} ${order.userPaymentMethod.user.lastName}`
      );

      // 4. delivery status element
      const deliveryStatusElement = DeliveryStatus.render(order.orderStatusId);

      // 5. amount
      const amountText = formatINR(
        order.orderProducts.reduce((total, orderProduct) => {
          return (total += orderProduct.price * orderProduct.quantity);
        }, 0)
      );

      this.bodyItems.push([
        orderIdLink.render(),
        dateText,
        customerNameElement,
        deliveryStatusElement,
        amountText,
      ]);
    });

    // list table element
    this.ordersTable = new ListTable(title, headerTextItems, this.bodyItems);

    this.ordersTable.tableBody.addColumnClassName(0, "order_table-link");
  }

  render() {
    return new ContentSection(this.ordersTable.render()).render();
  }
}
