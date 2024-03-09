import { DTOMethod } from "..";
import { OrderStatus, OrderProduct, Shipping, UserPaymentMethod } from "."; // eslint-disable-line no-unused-vars

export class Order extends DTOMethod {
  /**
   *
   * @param {object} param0
   * @param {number} param0.id
   * @param {string} param0.note
   * @param {string} param0.address
   * @param {number} param0.orderStatusId
   * @param {number} param0.shippingId
   * @param {number} param0.userPaymentMethodId
   */
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
   * @param {OrderProduct[]} param0.orderProducts - An array of products in the order.
   */
  response({ orderStatus, shipping, userPaymentMethod, orderProducts }) {
    this.orderStatus = orderStatus;
    this.shipping = shipping;
    this.userPaymentMethod = userPaymentMethod;
    this.orderProducts = orderProducts;
  }
}
