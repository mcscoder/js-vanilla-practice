import { appleIcon, facebookIcon, googleIcon } from "@/constants";
import { Button, buttonSizes, buttonVariants } from "../Button";
import { createContainer } from "@/utils";

export class OtherMethods {
  constructor() {
    // 1. Goggle button
    this.goggleButton = new Button(
      null,
      googleIcon,
      null,
      buttonVariants.iconOnly,
      buttonSizes.iconOnly,
      "form-other_method-btn",
      () => {}
    );
    // 2. Apple button
    this.appleButton = new Button(
      null,
      appleIcon,
      null,
      buttonVariants.iconOnly,
      buttonSizes.iconOnly,
      "form-other_method-btn",
      () => {}
    );
    // 3. Facebook button
    this.facebookButton = new Button(
      null,
      facebookIcon,
      null,
      buttonVariants.iconOnly,
      buttonSizes.iconOnly,
      "form-other_method-btn",
      () => {}
    );

    this.container = createContainer(
      "form-other_method-container",
      this.goggleButton.render(),
      this.appleButton.render(),
      this.facebookButton.render()
    );
  }

  render() {
    return this.container;
  }
}
