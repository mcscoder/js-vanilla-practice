export class Input {
  constructor(id, placeHolder, ...className) {
    // leading class name: input
    this.input = document.createElement("input");
    this.input.className = "input";
    this.input.classList.add(...className);
    this.input.placeholder = placeHolder;
  }
  render() {
    return this.input;
  }
}
