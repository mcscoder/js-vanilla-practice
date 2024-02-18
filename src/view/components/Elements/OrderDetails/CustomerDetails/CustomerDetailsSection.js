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

/** @type {Array<{ title: string, description: string }>} */
export const customerDescription = [
  { title: "Full Name", description: "Shristi Singh" },
  { title: "Email", description: "shristi@gmail.com" },
  { title: "Phone", description: "+91 904 231 1212" },
];

/** @type {Array<{ title: string, description: string }>} */
export const orderInfo = [
  { title: "Shipping", description: "Next express" },
  { title: "Payment Method", description: "Paypal" },
  { title: "Status", description: "Pending" },
];

/** @type {Array<{ title: string, description: string }>} */
export const deliverToInfo = [
  {
    title: "Address",
    description: "Dharam Colony, Palam Vihar, Gurgaon, Haryana ",
  },
];

export class CustomerDetailsSection {
  constructor(orderId, orderStatus) {
    this.orderId = orderId;
    this.orderStatus = orderStatus;

    // leading class name: customer_details

    // container 1 element. cover order id and status tag
    this.container1 = document.createElement("div");
    this.container1.className = "customer_details-container-1";

    // order id element
    this.orderIdElement = document.createElement("h3");
    this.orderIdElement.className = "customer_details-order_id";
    this.orderIdElement.textContent = `Order ID: #${orderId}`;

    // status tag element
    this.statusTag = new Tag(
      deliveryStatusTypes[orderStatus],
      tagVariants.orderDetails[orderStatus]
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
      orderStatus,
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
      customerDescription,
      "View profile"
    );

    // order info
    this.orderInfo = new CustomerInformation(
      bagHandleIcon,
      "Order Info",
      orderInfo,
      "Download info"
    );

    // delivery info
    this.deliveryInfo = new CustomerInformation(
      bagHandleIcon,
      "Deliver to",
      deliverToInfo,
      "View Profile"
    );

    // payment info
    this.paymentInfo = new PaymentMethod(0, "5555500830030331", "MAI CONG SON");

    // note text for customer
    this.noteForCustomer = new InputContainer(
      "textarea",
      "Note",
      "Type some notes",
      "MAX_HEIGHT"
    );
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
