// tag class names
export const tagVariants = {
  category: {
    normal: "tag-category",
    active: "tag-category tag-category-active",
  },
};

/** USAGE:
 * use @var tagVariants as argument for @param variant in @constructor
 * @example
 * const tag = new Tag(label, tagVariants.category.normal);
 * const tagNode = tag.render();
 */
export class Tag {
  constructor(label, variant) {
    // tag container
    this.container = document.createElement("span");
    this.container.className = `tag ${variant}`;
    this.container.textContent = label;
  }

  render() {
    return this.container;
  }
}
