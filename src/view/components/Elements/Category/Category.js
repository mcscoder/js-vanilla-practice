import { Router } from "@/routes";
import { Link, Tag, tagVariants } from "..";
import { urlChangedEvent } from "@/constants";

// this is sidebar category items
export class Category {
  /**
   *
   * @param {number} id
   * @param {string} name
   * @param {number} quantity
   */
  constructor(id, name, quantity) {
    this.categoryId = id;
    this.label = name;
    this.componentPath = "/products/:categoryId";

    // link
    const link = new Link(`/products/${this.categoryId}`);
    this.categoryLink = link.render();
    this.categoryLink.className = "category-link";

    // link label
    this.linkLabel = document.createElement("span");
    this.linkLabel.className = "category-link-label";
    this.linkLabel.textContent = name;

    // category link tag
    this.tag = new Tag(quantity, this.getTagClassName());

    // add children to categoryLink
    this.categoryLink.append(this.linkLabel, this.tag.render());

    // update active category based on url
    window.addEventListener(urlChangedEvent, () => {
      this.tag.container.className = this.getTagClassName();
    });
  }

  getTagClassName() {
    let tagClassName = tagVariants.category.normal;
    const currentUrlPath = location.pathname;
    if (Router.matchPath(currentUrlPath, this.componentPath)) {
      const params = Router.extractParams(currentUrlPath, this.componentPath);
      const categoryId = params.categoryId;
      if (parseInt(categoryId) === this.categoryId) {
        tagClassName = tagVariants.category.active;
      }
    }
    return tagClassName;
  }

  render() {
    return this.categoryLink;
  }
}
