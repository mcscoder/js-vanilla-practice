import { DTOMethod } from "..";

export class Category extends DTOMethod {
  /**
   *
   * @param {object} param0
   * @param {number} param0.id
   * @param {string} param0.name
   */
  constructor({ id, name }) {
    super();
    this.id = id;
    this.name = name;
  }

  /**
   *
   * @param {object} param0
   * @param {number} param0.quantity
   */
  response({ quantity }) {
    this.quantity = quantity;
  }
}
