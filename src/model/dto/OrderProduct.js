import { DTOMethod } from "../common";
import { Product } from "./Product"; // eslint-disable-line

export class OrderProduct extends DTOMethod {
  /**
   *
   * @param {object} param0
   * @param {number} param0.productId
   * @param {number} param0.orderId
   * @param {number} param0.quantity
   * @param {number} param0.price
   */
  constructor({ productId, orderId, quantity, price }) {
    super();
    this.productId = productId;
    this.orderId = orderId;
    this.quantity = quantity;
    this.price = price;
  }

  /**
   *
   * @param {object} param0
   * @param {Product} param0.product
   */
  response({ product }) {
    this.product = product;
  }
}
