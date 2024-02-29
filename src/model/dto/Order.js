import { DTOMethod } from "..";
import { OrderStatus, Product, Shipping, UserPaymentMethod } from "."; // eslint-disable-line no-unused-vars

export class Order extends DTOMethod {
  constructor({
    id,
    note,
    address,
    orderStatusId,
    shippingId,
    userPaymentMethodId,
  }) {
    super();
    this.id = id;
    this.note = note;
    this.address = address;
    this.orderStatusId = orderStatusId;
    this.shippingId = shippingId;
    this.userPaymentMethodId = userPaymentMethodId;
  }

  /**
   *
   * @param {object} param0
   * @param {OrderStatus} param0.orderStatus - The status of the order.
   * @param {Shipping} param0.shipping - The shipping details for the order.
   * @param {UserPaymentMethod} param0.userPaymentMethod - The payment method used by the user.
   * @param {Product[]} param0.products - An array of products in the order.
   */
  response({ orderStatus, shipping, userPaymentMethod, products }) {
    this.orderStatus = orderStatus;
    this.shipping = shipping;
    this.userPaymentMethod = userPaymentMethod;
    this.products = products;
  }
}
