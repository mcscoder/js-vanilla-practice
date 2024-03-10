import { searchIcon } from "@/constants";
import { Button, buttonSizes, buttonVariants } from "../Button";
import { Form } from "../Form";
import { Input } from "../Input";
import { Overlay } from "../../Layouts";

export class SearchOverlay extends Form {
  constructor() {
    super();

    // form
    this.form.className = "flex gap-1";

    // overlay
    this.overlay = new Overlay();

    // search input
    this.input = new Input({}, "form-input");

    // form submit button
    this.submitButton = new Button(
      null,
      searchIcon,
      null,
      buttonVariants.iconOnly,
      buttonSizes.iconOnly,
      "",
      () => {}
    );

    // add elements to form
    this.form.append(this.input.render(), this.submitButton.render());
  }

  /**
   * @param {boolean} isDisplay
   */
  display(isDisplay) {
    this.overlay.display(isDisplay, [this.form]);
  }

  onSearchSubmit(action) {
    this.onSubmit(() => {
      this.overlay.display(false);
      action();
    });
  }
}
