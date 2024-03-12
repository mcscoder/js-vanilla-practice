import {
  checkSuccessIcon,
  errorCircleIcon,
  infoCircleIcon,
  warningIcon,
  xMarkIcon,
} from "@/constants";
import { createContainer } from "@/utils";
import { Button, buttonSizes, buttonVariants } from "../Button";

export const TOAST_TYPES = {
  SUCCESS: {
    icon: checkSuccessIcon,
  },
  WARNING: {
    icon: warningIcon,
  },
  INFO: {
    icon: infoCircleIcon,
  },
  ERROR: {
    icon: errorCircleIcon,
  },
};

export class Toast {
  /**
   *
   * @param {object} param0
   * @param {string} param0.title
   * @param {string} param0.message
   * @param {keyof typeof TOAST_TYPES} param0.type
   * @param {number} param0.duration - Duration as milliseconds
   */
  static render({
    title: titleText,
    message: messageText,
    type,
    duration = 6000,
  }) {
    // leading class name: toast
    // toast container class name: toast-container

    // content container children --------------------
    // 1. Icon
    const icon = createContainer("icon-container");
    icon.innerHTML = TOAST_TYPES[type].icon;
    // 2. Text content
    // 2.1. Title
    const title = document.createElement("h4");
    title.className = "toast-title";
    title.textContent = titleText;
    // 2.2. Message
    const message = document.createElement("p");
    message.className = "toast-message";
    message.textContent = messageText;
    // 3. Close button
    const closeButton = new Button(
      null,
      xMarkIcon,
      null,
      buttonVariants.icon,
      buttonSizes.iconOnly,
      "",
      () => {
        contentContainer.remove();
      }
    );

    const contentContainer = createContainer(
      "toast-content",
      icon,
      createContainer("flex flex-col flex-1", title, message),
      closeButton.render()
    );

    // auto close toast after `duration` in ms
    setTimeout(() => {
      contentContainer.remove();
    }, duration);

    document.querySelector(".toast-container").appendChild(contentContainer);
  }
}
