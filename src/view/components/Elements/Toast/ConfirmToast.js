import { createContainer } from "@/utils";
import { Button, Overlay, buttonSizes, buttonVariants } from "../..";

export class ConfirmToast {
  /**
   * @callback onClickConfirmCallBack
   * @param {boolean} isConfirmed
   */
  /**
   *
   * @param {object} param0
   * @param {string} param0.title
   * @param {string} param0.message
   * @param {string} param0.confirmationLabel
   * @param {string} param0.cancelLabel
   * @param {onClickConfirmCallBack} param0.onClickConfirm
   */
  static render({
    title: titleText,
    message: messageText,
    confirmationLabel = "OK",
    cancelLabel = "CANCEL",
    onClickConfirm = (isConfirmed) => {
      isConfirmed;
    },
  }) {
    // leading class name: toast-confirmation

    const overlay = new Overlay();

    // content container children --------------------
    // 1. Text content
    // 1.1. Title
    const title = document.createElement("h4");
    title.className = "toast-title";
    title.textContent = titleText;
    // 1.2. Message
    const message = document.createElement("p");
    message.className = "toast-message";
    message.textContent = messageText;
    // 2. Button
    // 2.1. Confirmation button
    const confirmationButton = new Button(
      confirmationLabel,
      null,
      null,
      buttonVariants.primary.filled,
      buttonSizes.sm,
      "",
      () => {
        onClickConfirm(true);
        overlay.display(false);
      }
    );
    // 2.2. Cancel button
    const cancelButton = new Button(
      cancelLabel,
      null,
      null,
      buttonVariants.primary.outlined,
      buttonSizes.sm,
      "",
      () => {
        onClickConfirm(false);
        overlay.display(false);
      }
    );

    // content container
    const contentContainer = createContainer(
      "toast-confirmation-container",
      title,
      message,
      createContainer(
        "flex items-center justify-end gap-1",
        cancelButton.render(),
        confirmationButton.render()
      )
    );

    overlay.display(true, [contentContainer]);
  }
}
