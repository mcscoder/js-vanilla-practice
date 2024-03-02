import { chevronDownIcon, chevronUpIcon } from "@/constants";
import { Category } from "@/model/dto"; // eslint-disable-line no-unused-vars
import { Category as CategoryView } from ".";

export class CategoryToggle {
  /**
   *
   * @param {Category[]} categories
   */
  constructor(categories) {
    this.categories = categories;

    // initial toggle state
    this.toggleState = true;

    // container element
    this.container = document.createElement("span");
    this.container.className = "category-toggle-container";

    // heading button element
    this.heading = document.createElement("button");
    this.heading.className = "category-toggle-container-heading";
    this.container.appendChild(this.heading);

    // heading label element
    this.headingLabel = document.createElement("span");
    this.headingLabel.className = "category-toggle-container-heading-label";
    this.headingLabel.textContent = "Categories";
    this.heading.appendChild(this.headingLabel);

    // heading icon element
    this.heading.appendChild(this.getHeadingIcon());

    // initialize category link items
    this.initCategoryLinkItems();

    // toggle event listener
    this.heading.addEventListener("click", this.handleToggling.bind(this));
  }

  // gets the heading icon element based on the toggle state
  getHeadingIcon() {
    const headingIcon = document.createElement("span");
    headingIcon.innerHTML = this.toggleState ? chevronUpIcon : chevronDownIcon;
    return headingIcon.firstChild;
  }

  // updates the heading icon based on the toggle state
  updateHeadingIcon() {
    this.heading.children[1].replaceWith(this.getHeadingIcon());
  }

  // initializes category link items based on the toggle state
  initCategoryLinkItems() {
    if (this.toggleState) {
      // category link container element
      this.categoryLink = document.createElement("nav");
      this.categoryLink.className = "category-toggle-container-body";
      this.container.appendChild(this.categoryLink);

      // add category link items to the container
      this.categories.forEach((category) => {
        this.categoryLink.appendChild(
          new CategoryView(
            category.id,
            category.name,
            category.quantity
          ).render()
        );
      });
    } else {
      this.categoryLink.remove();
    }
  }

  // handles the toggling of the category link items
  handleToggling() {
    this.toggleState = !this.toggleState;
    this.initCategoryLinkItems();
    this.updateHeadingIcon();
  }

  render() {
    return this.container;
  }
}
