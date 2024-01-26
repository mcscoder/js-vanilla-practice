export class ContentSection {
  constructor(child) {
    // section element
    this.sectionContainer = document.createElement("section");
    this.sectionContainer.className = "section-container";
    this.sectionContainer.append(child);
  }
  render() {
    return this.sectionContainer;
  }
}
