import { createContainer } from "@/utils";

export class DragDropUploader {
  /**
   * Callback function to handle dropped files.
   * @callback onDropCallBack
   * @param {FileList} files - The list of files dropped into the drop area.
   * @returns {void}
   */

  /**
   * Creates a new instance of DragDropUploader.
   * @constructor
   * @param {string} className - The class name to apply to the main container.
   * @param {onDropCallBack} [onDrop=(files) => {}] - Callback function invoked when files are dropped into the drop area.
   * @param {...HTMLElement} children - Additional HTML elements to be included inside the drop area.
   */
  constructor(
    className,
    onDrop = (files) => {
      files;
    },
    ...children
  ) {
    // Create the main drop area container
    this.dropArea = createContainer(className, ...children);

    // Prevent default behaviors for drag and drop events
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      this.dropArea.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
    });

    // Handle file drop event
    this.dropArea.addEventListener("drop", (event) => {
      onDrop(event.dataTransfer.files);
    });

    // Create a hidden input element for file selection
    this.input = document.createElement("input");
    this.input.type = "file";
    this.input.multiple = true;
    this.input.accept = "image/*";
    this.input.hidden = true;

    // Open file dialog on click event
    this.dropArea.addEventListener("click", () => {
      this.input.click();
    });

    /* Using a regular function instead of an arrow function
    because arrow functions lack the 'this' keyword scope */
    // Handle file selection from the input element
    this.input.addEventListener("change", function () {
      onDrop(this.files);
    });
  }

  render() {
    return this.dropArea;
  }
}
