import { TextArea } from ".";
import { OptionsBox } from "../OptionsBox";

export const inputTypes = {
  textarea: TextArea,
  selectBox: OptionsBox,
};

/**
 * Represents an input container that wraps a label and an input element.
 */
export class InputContainer {
  /**
   * Creates an instance of InputContainer.
   * @param {keyof typeof inputTypes} inputType - The type of input.
   * @param {string} labelText - The text of label.
   * @param {string|false} id - The ID of the container.
   * @param {...any} params - Additional parameters specific to the input type.
   */
  constructor(inputType, labelText, id, ...params) {
    // leading class name: input-container

    // Container element covering label and input
    this.container = document.createElement("div");
    this.container.className = "input-container";

    // Label element
    this.label = document.createElement("label");
    this.label.className = "input-container-label";
    this.label.textContent = labelText;

    // If ID is provided, set it for the label and initialize input with ID
    if (id) {
      this.label.htmlFor = id;
      this.input = new inputTypes[inputType](id, ...params);
    } else {
      // If ID is not provided, initialize input without ID (for selectBox)
      this.input = new inputTypes[inputType](...params);
    }

    this.input.render().classList.add("input-container-input_field");

    // add elements to container
    this.container.append(this.label, this.input.render());
  }

  render() {
    return this.container;
  }
}
