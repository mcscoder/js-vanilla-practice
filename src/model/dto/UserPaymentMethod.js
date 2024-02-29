import { DTOMethod } from "..";
import { PaymentMethod, User } from "."; // eslint-disable-line no-unused-vars

export class UserPaymentMethod extends DTOMethod {
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
