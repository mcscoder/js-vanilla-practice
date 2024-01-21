export class Footer {
  constructor() {
    // primary footer
    this.footer = document.createElement("footer");
    this.footer.className = "primary-footer";
    this.footer.textContent = "footer";
  }

  render() {
    return this.footer;
  }
}
