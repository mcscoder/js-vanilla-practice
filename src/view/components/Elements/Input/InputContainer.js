import { Input, TextArea } from ".";
import { OptionsBox } from "../OptionsBox";

export const inputTypes = {
  textarea: TextArea,
  selectBox: OptionsBox,
  input: Input,
};

/**
 * Represents an input container that wraps a label and an input element.
 */
export class InputContainer {
  /**
   * Creates an instance of InputContainer.
   * @param {keyof typeof inputTypes} inputType - The type of input.
   * @param {string} labelText - The text of label.
   * @param {...any} params - Additional parameters specific to the input type.
   */
  constructor(inputType, labelText, ...params) {
    // leading class name: input-container

    this.id = labelText.replace(" ", "");

    // Container element covering label and input
    this.container = document.createElement("div");
    this.container.className = "input-container";

    // Label element
    this.label = document.createElement("label");
    this.label.className = "input-container-label";
    this.label.textContent = labelText;

    this.label.htmlFor = this.id;
    this.input = new inputTypes[inputType](...params);
    this.input.render().id = this.id;
    this.input.render().classList.add("input-container-input_field");

    // add elements to container
    this.container.append(this.label, this.input.render());
  }

  render() {
    return this.container;
  }
}
