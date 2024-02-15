import { Link } from "../..";

export class CustomerInformation {
  /**
   * @param {SVGElement} svgIcon
   * @param {string} titleText
   * @param {Array<{ title: string, description: string }>} descriptions
   */
  constructor(svgIcon, titleText, descriptions, linkText) {
    // leading class name: customer_details-information
    this.container = document.createElement("div");
    this.container.className = "customer_details-information-container";

    this.container1 = document.createElement("div");
    this.container1.className = "customer_details-information-container-1";

    this.icon = document.createElement("div");
    this.icon.className = "customer_details-information-icon";
    this.icon.innerHTML = svgIcon;
    this.icon.firstElementChild.setAttribute("height", "24px");
    this.icon.firstElementChild.setAttribute("width", "24px");

    // container 1.1 element
    this.container1_1 = document.createElement("div");
    this.container1_1.className = "customer_details-information-container-1-1";

    // title element
    this.title = document.createElement("h4");
    this.title.className = "customer_details-information-title";
    this.title.textContent = titleText;

    // contents
    /** @type {HTMLParagraphElement[]} */
    this.descriptionNodes = [];
    descriptions.forEach(({ title, description }) => {
      const p = document.createElement("p");
      p.className = "customer_details-information-description";
      p.textContent = `${title}: ${description}`;
      this.descriptionNodes.push(p);
    });

    // add elements to container1.1
    this.container1_1.append(this.title, ...this.descriptionNodes);

    // add elements to container 1
    this.container1.append(this.icon, this.container1_1);

    // information related link
    this.link = new Link("#");
    this.link.link.className = "customer_details-information-link";
    this.link.link.textContent = linkText;

    // add elements to global container
    this.container.append(this.container1, this.link.render());
  }

  render() {
    return this.container;
  }
}
