import { Link, Tag, tagVariants } from "..";

// this is sidebar category items
export class Category {
  constructor(to, label, categoryQuantity) {
    this.to = to;
    this.label = label;

    // link
    const link = new Link(this.to);
    this.categoryLink = link.render();
    this.categoryLink.className = "category-link";

    // link label
    this.linkLabel = document.createElement("span");
    this.linkLabel.className = "category-link-label";
    this.linkLabel.textContent = label;

    // category link tag
    const tag = new Tag(categoryQuantity, tagVariants.category.normal);
    this.linkTag = tag.render();

    // add children to categoryLink
    this.categoryLink.append(this.linkLabel, this.linkTag);
  }

  render() {
    return this.categoryLink;
  }
}
