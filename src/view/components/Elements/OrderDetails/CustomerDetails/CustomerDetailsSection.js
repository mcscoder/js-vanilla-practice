import { bagHandleIcon, printerIcon, userIcon } from "@/constants";
import {
  Button,
  ConfirmToast,
  CustomerInformation,
  InputContainer,
  OptionsBox,
  PaymentMethod,
  Tag,
  buttonSizes,
  buttonVariants,
  deliveryStatusTypes,
  optionType, // eslint-disable-line no-unused-vars
  tagVariants,
} from "../..";
import { ContentSection } from "../../..";
import { Order } from "@/model/dto"; // eslint-disable-line no-unused-vars
import { apiEndpoint } from "@/utils";

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
   * @callback onSaveCallBack
   * @param {object} param0
   * @param {number} param0.orderStatusId
   * @param {string} param0.note
   * @returns {void}
   */
  /**
   *
   * @param {Order} orderDetails
   * @param {onSaveCallBack} onSave
   */
  constructor(
    orderDetails,
    onSave = ({ orderStatusId, note }) => {
      orderStatusId;
      note;
    }
  ) {
    // leading class name: customer_details

    this.orderDetails = orderDetails;
    this.orderId = orderDetails.id;
    this.orderStatusId = orderDetails.orderStatusId;
    this.onSave = onSave;

    // global container
    this.container = document.createElement("div");
    this.container.className = "customer_details-container";

    // fetch content and initialize the content
    this.fetchData();
  }

  initContent() {
    // container 1 element. cover order id and status tag
    this.container1 = document.createElement("div");
    this.container1.className = "customer_details-container-1";

    // order id element
    this.orderIdElement = document.createElement("h3");
    this.orderIdElement.className = "customer_details-order_id";
    this.orderIdElement.textContent = `Order ID: #${this.orderId}`;

    // status tag element
    this.statusTag = new Tag(
      deliveryStatusTypes[this.orderStatusId],
      tagVariants.orderDetails[this.orderStatusId]
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
      "none",
      this.orderStatusId,
      this.orderStatuses,
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
        `${this.orderDetails.userPaymentMethod.user.firstName} ${this.orderDetails.userPaymentMethod.user.lastName}`,
        this.orderDetails.userPaymentMethod.user.email,
        this.orderDetails.userPaymentMethod.user.phone
      ),
      "View profile"
    );

    // order info
    this.orderInfo = new CustomerInformation(
      bagHandleIcon,
      "Order Info",
      orderInfo(
        this.orderDetails.shipping.name,
        this.orderDetails.userPaymentMethod.paymentMethod.name,
        this.orderDetails.orderStatus.name
      ),
      "Download info"
    );

    // delivery info
    this.deliveryInfo = new CustomerInformation(
      bagHandleIcon,
      "Deliver to",
      deliverToInfo(this.orderDetails.address),
      "View Profile"
    );

    // payment info
    this.paymentInfo = new PaymentMethod(
      this.orderDetails.userPaymentMethod.paymentMethod.id,
      this.orderDetails.userPaymentMethod.cardNumber,
      this.orderDetails.userPaymentMethod.cardholderName
    );

    // note text for customer
    this.noteForCustomer = new InputContainer("textarea", "Note", "", {
      placeholder: "Type some notes",
      defaultValue: this.orderDetails.note,
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
    this.container.append(this.container1, this.container2);
  }

  fetchData() {
    fetch(apiEndpoint.getOrderStatuses())
      .then((res) => res.json())
      .then((data) => {
        /** @type {(typeof optionType)[]} */
        this.orderStatuses = data.map(({ id, name }) => {
          /** @type {typeof optionType} */
          const status = {
            value: id,
            label: name,
          };
          return status;
        });
        // load the content
        this.initContent();
      });
  }

  /**
   *
   * @param {typeof optionType} param0
   */
  onChangeStatus({ value }) {
    this.orderStatusId = value;
  }

  onClickPrintButton() {}

  onClickSaveButton() {
    ConfirmToast.render({
      title: "Update order",
      message: "Are you sure? this action cannot be undone",
      confirmationLabel: "Update",
      onClickConfirm: (isConfirmed) => {
        if (isConfirmed) {
          const orderStatusId = this.orderStatusId;
          const note = this.noteForCustomer.input.render().value;
          this.onSave({ orderStatusId, note });
        }
      },
    });
  }

  render() {
    return new ContentSection(this.container).render();
  }
}
