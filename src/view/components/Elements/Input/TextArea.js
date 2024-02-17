export class TextArea {
  /**
   * @param {string} id
   * @param {string} placeHolder
   * @param {number|"MAX_HEIGHT"} rows - The number of textarea rows, or "MAX_HEIGHT" to make textarea get full of container height
   * @param  {string[]} className
   */
  constructor(id, placeHolder, rows, ...className) {
    // leading class name: input

    this.textArea = document.createElement("textarea");
    this.textArea.className = "input input-textarea";
    this.textArea.classList.add(...className);
    this.textArea.id = id;
    this.textArea.placeholder = placeHolder;

    if (rows === "MAX_HEIGHT") {
      this.textArea.classList.add("h-full");
    } else {
      this.textArea.rows = rows;
    }
  }

  render() {
    return this.textArea;
  }
}
