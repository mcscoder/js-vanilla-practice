import { bagHandleIcon, printerIcon, userIcon } from "@/constants";
import {
  Button,
  CustomerInformation,
  InputContainer,
  OptionsBox,
  PaymentMethod,
  Tag,
  buttonSizes,
  buttonVariants,
  deliveryStatusTypes,
  tagVariants,
} from "../..";
import { ContentSection } from "../../..";
import { Order } from "@/model/dto"; // eslint-disable-line no-unused-vars

/**
 *
 * @param {string} fullName
 * @param {string} email
 * @param {string} phone
 * @returns {Array<{ title: string, description: string }>}
 */
export const customerInfo = (fullName, email, phone) => {
  return [
    { title: "Full Name", description: fullName },
    { title: "Email", description: email },
    { title: "Phone", description: phone },
  ];
};

/**
 *
 * @param {string} shipping
 * @param {string} paymentMethod
 * @param {string} status
 * @returns {Array<{ title: string, description: string }>}
 */
export const orderInfo = (shipping, paymentMethod, status) => {
  return [
    { title: "Shipping", description: shipping },
    { title: "Payment Method", description: paymentMethod },
    { title: "Status", description: status },
  ];
};

/**
 *
 * @param {string} address
 * @returns {Array<{ title: string, description: string }>}
 */
export const deliverToInfo = (address) => {
  return [
    {
      title: "Address",
      description: address,
    },
  ];
};

export class CustomerDetailsSection {
  /**
   *
   * @param {Order} orderDetails
   */
  constructor(orderDetails) {
    this.orderId = orderDetails.id;
    this.orderStatus = orderDetails.orderStatusId;

    // leading class name: customer_details

    // container 1 element. cover order id and status tag
    this.container1 = document.createElement("div");
    this.container1.className = "customer_details-container-1";

    // order id element
    this.orderIdElement = document.createElement("h3");
    this.orderIdElement.className = "customer_details-order_id";
    this.orderIdElement.textContent = `Order ID: #${this.orderId}`;

    // status tag element
    this.statusTag = new Tag(
      deliveryStatusTypes[this.orderStatus],
      tagVariants.orderDetails[this.orderStatus]
    );

    // add elements to container 1
    this.container1.append(this.orderIdElement, this.statusTag.render());

    // container 2 element
    this.container2 = document.createElement("div");
    this.container2.className = "customer_details-container-2";

    // container 2.1 element. cover status select box, print button, save button
    this.container2_1 = document.createElement("div");
    this.container2_1.className = "customer_details-container-2-1";

    // status select box
    this.statusSelectBox = new OptionsBox(
      deliveryStatusTypes[0],
      this.orderStatus,
      deliveryStatusTypes.slice(1),
      this.onChangeStatus.bind(this)
    );

    // print button
    this.printButton = new Button(
      null,
      printerIcon,
      null,
      buttonVariants.iconOnly,
      buttonSizes.iconOnly,
      "customer_details-button",
      this.onClickPrintButton.bind(this)
    );

    // save button
    this.saveButton = new Button(
      "Save",
      null,
      null,
      buttonVariants.iconOnly,
      buttonSizes.iconOnly,
      "customer_details-button",
      this.onClickSaveButton.bind(this)
    );

    // add elements to container 2.1
    this.container2_1.append(
      this.statusSelectBox.render(),
      this.printButton.render(),
      this.saveButton.render()
    );

    // container 2.2. cover all of customer information
    // include: customer, order info, deliver to, payment info, note for customer
    this.container2_2 = document.createElement("div");
    this.container2_2.className = "customer_details-container-2-2";

    // customer info
    this.customerInf = new CustomerInformation(
      userIcon,
      "Customer",
      customerInfo(
        `${orderDetails.userPaymentMethod.user.firstName} ${orderDetails.userPaymentMethod.user.lastName}`,
        orderDetails.userPaymentMethod.user.email,
        orderDetails.userPaymentMethod.user.phone
      ),
      "View profile"
    );

    // order info
    this.orderInfo = new CustomerInformation(
      bagHandleIcon,
      "Order Info",
      orderInfo(
        orderDetails.shipping.name,
        orderDetails.userPaymentMethod.paymentMethod.name,
        orderDetails.orderStatus.name
      ),
      "Download info"
    );

    // delivery info
    this.deliveryInfo = new CustomerInformation(
      bagHandleIcon,
      "Deliver to",
      deliverToInfo(orderDetails.address),
      "View Profile"
    );

    // payment info
    this.paymentInfo = new PaymentMethod(
      orderDetails.userPaymentMethod.paymentMethod.id,
      orderDetails.userPaymentMethod.cardNumber,
      orderDetails.userPaymentMethod.cardholderName
    );

    // note text for customer
    this.noteForCustomer = new InputContainer("textarea", "Note", "", {
      placeholder: "Type some notes",
      defaultValue: orderDetails.note,
    });
    this.noteForCustomer.container.classList.add(
      "customer_details-information-input_container"
    );

    // add elements to container 2.2
    this.container2_2.append(
      this.customerInf.render(),
      this.orderInfo.render(),
      this.deliveryInfo.render(),
      this.paymentInfo.render(),
      this.noteForCustomer.render()
    );

    // add elements to container 2
    this.container2.append(this.container2_1, this.container2_2);

    // global container
    this.container = document.createElement("div");
    this.container.className = "customer_details-container";
    this.container.append(this.container1, this.container2);
  }

  onChangeStatus(optionIndex) {
    optionIndex;
  }

  onClickPrintButton() {}

  onClickSaveButton() {}

  render() {
    return new ContentSection(this.container).render();
  }
}
