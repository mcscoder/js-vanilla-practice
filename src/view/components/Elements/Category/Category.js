import { Router } from "@/routes";
import { Link, Tag, tagVariants } from "..";
import { urlChangedEvent } from "@/constants";

// this is sidebar category items
export class Category {
  constructor(categoryId, label, categoryQuantity) {
    this.categoryId = categoryId;
    this.label = label;
    this.componentPath = "/products/:categoryId";

    // link
    const link = new Link(`/products/${this.categoryId}`);
    this.categoryLink = link.render();
    this.categoryLink.className = "category-link";

    // link label
    this.linkLabel = document.createElement("span");
    this.linkLabel.className = "category-link-label";
    this.linkLabel.textContent = label;

    // category link tag
    this.tag = new Tag(categoryQuantity, this.getTagClassName());

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
      if (categoryId === this.categoryId) {
        tagClassName = tagVariants.category.active;
      }
    }
    return tagClassName;
  }

  render() {
    return this.categoryLink;
  }
}
