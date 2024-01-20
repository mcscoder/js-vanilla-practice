export class Header {
  constructor() {
    // primary header
    this.header = document.createElement("header");
    this.header.className = "primary-header";
    this.header.textContent = "header";
  }

  render() {
    return this.header;
  }
}
