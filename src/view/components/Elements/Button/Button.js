export const buttonVariants = {
  primary: {
    filled: "btn-primary btn-filled",
    outlined: "btn-primary btn-outlined",
  },
  secondary: {
    filled: "btn-secondary btn-filled",
    outlined: "btn-secondary btn-outlined",
  },
  iconOnly: "",
};

export const buttonSizes = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
  iconOnly: "",
};

/**USAGE:
 * use @param buttonVariants as argument for @param variant in @constructor
 * use @param buttonSizes as argument for @param sizes in @constructor
 * leave startIcon or endIcon or label null if its doesn't need
 * example:
 * const button = new Button("A button", startIcon, endIcon, buttonVariants.primary.filled, buttonSizes.md, "button-class-name", onClick)
 * const buttonElement = button.render();
 */
export class Button {
  constructor(
    label,
    startIcon,
    endIcon,
    variant,
    size,
    className,
    onClick = () => {}
  ) {
    // button element
    this.button = document.createElement("button");
    this.button.className = Button.getClassName(variant, size, className);
    this.button.addEventListener("click", onClick);

    // label
    this.buttonLabel = document.createElement("span");
    this.buttonLabel.append(label);

    // svg icon
    this.startIcon = document.createElement("span");
    this.startIcon.innerHTML = startIcon;
    this.endIcon = document.createElement("span");
    this.endIcon.innerHTML = endIcon;

    // add children
    startIcon && this.button.append(this.startIcon.firstChild);
    label && this.button.append(this.buttonLabel);
    endIcon && this.button.append(this.endIcon.firstChild);
  }

  static getClassName(variant, size, ...classes) {
    const className = ["btn", variant, size, ...classes];
    return className.join(" ");
  }

  render() {
    return this.button;
  }
}
