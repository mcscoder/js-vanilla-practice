import { masterCardIcon } from "@/constants";
import { creditCardFormat } from "@/utils";

// 0: Master Card, 1: Paypal, ...
export const creditCardTypes = [
  {
    name: "Master Card",
    svgIcon: masterCardIcon,
  },
];

export class PaymentMethod {
  /**
   * @param {number} creditCardType
   * @param {string} creditCardNumber
   * @param {string} creditCardHolderName
   */
  constructor(
    creditCardType = undefined,
    creditCardNumber = undefined,
    creditCardHolderName = undefined
  ) {
    // leading class name: customer_details-information

    // global container element. cover all of payment info
    this.container = document.createElement("div");
    this.container.className = "customer_details-information-container";

    this.container1 = document.createElement("div");
    this.container1.className = "customer_details-information-container-1-1";

    // title
    this.title = document.createElement("h4");
    this.title.className = "customer_details-information-title";
    this.title.textContent = "Payment Info";

    // details
    this.paymentMethod = document.createElement("p");
    this.paymentMethod.className =
      "customer_details-information-description customer_details-information-payment_method";

    if (creditCardType !== undefined) {
      const type = creditCardTypes[creditCardType];
      const iconContainer = document.createElement("div");
      iconContainer.className = "icon-container";
      iconContainer.innerHTML = type.svgIcon;

      const paymentMethodName = document.createElement("div");
      paymentMethodName.textContent = type.name;

      this.paymentMethod.append(iconContainer, paymentMethodName);

      this.cardHolderName = document.createElement("p");
      this.cardHolderName.className =
        "customer_details-information-description";
      this.cardHolderName.textContent = `Cardholder Name: ${creditCardHolderName}`;

      this.cardNumber = document.createElement("p");
      this.cardNumber.className = "customer_details-information-description";
      this.cardNumber.textContent = `Card Number: ${creditCardFormat(creditCardNumber)}`;

      this.container1.append(
        this.paymentMethod,
        this.cardHolderName,
        this.cardNumber
      );
    } else {
      this.paymentMethod.textContent = "Cash";
      this.container1.append(this.paymentMethod);
    }

    this.container.append(this.title, this.container1);
  }

  render() {
    return this.container;
  }
}
