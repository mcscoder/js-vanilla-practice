import { DTOMethod } from "..";
import { PaymentMethod, User } from "."; // eslint-disable-line no-unused-vars

export class UserPaymentMethod extends DTOMethod {
  /**
   *
   * @param {object} param0
   * @param {number} param0.id
   * @param {string} param0.cardholderName
   * @param {string} param0.cardNumber
   * @param {number} param0.paymentMethodId
   * @param {number} param0.userId
   */
  constructor({ id, cardholderName, cardNumber, paymentMethodId, userId }) {
    super();
    this.id = id;
    this.cardholderName = cardholderName;
    this.cardNumber = cardNumber;
    this.paymentMethodId = paymentMethodId;
    this.userId = userId;
  }

  /**
   *
   * @param {object} param0
   * @param {PaymentMethod} param0.paymentMethod
   * @param {User} param0.user
   */
  response({ paymentMethod, user }) {
    this.paymentMethod = paymentMethod;
    this.user = user;
  }
}
