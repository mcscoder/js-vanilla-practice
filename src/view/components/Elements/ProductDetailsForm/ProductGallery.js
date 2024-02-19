import { checkCircleIcon, pictureIcon } from "@/constants";
import { createContainer } from "@/utils";
import { ProductThumbnail } from "./ProductThumbnail";

export class ProductGallery {
  /**
   * @typedef {object} ImageObject
   * @property {string} imageURL - The URL of the image.
   * @property {string} fileName - The file name of the image.
   */

  /**
   * @param {ImageObject} image - An object representing a single image.
   * @param {ImageObject[]} images - An array of ImageObject representing multiple images.
   */
  constructor(images) {
    // leading class name: product_details_form-gallery

    // container 1 children --------------------
    // 1. Picture icon
    this.picture = createContainer("icon-container");
    this.picture.innerHTML = pictureIcon;
    // 2. Description
    this.description = document.createElement("p");
    this.description.className = "product_details_form-gallery-description";
    this.description.textContent =
      "Drop your images here, or browse. jpeg, png are allowed";

    // container 1
    this.container1 = createContainer(
      "product_details_form-gallery-container-1",
      this.picture,
      this.description
    );

    // container 2 children --------------------
    /** @type {HTMLDivElement[]} */
    this.imageNodes = [];
    images.forEach(({ fileName, imageURL }) => {
      const image = new ProductThumbnail(imageURL);
      image.container.classList.add(
        "product_details_form-gallery-image_item-image"
      );

      const name = document.createElement("p");
      name.className = "product_details_form-gallery-image_item-file_name";
      name.textContent = fileName;

      const ok = createContainer("icon-container");
      ok.innerHTML = checkCircleIcon;

      this.imageNodes.push(
        createContainer(
          "product_details_form-gallery-image_item",
          image.render(),
          name,
          ok
        )
      );
    });

    // container 2
    this.container2 = createContainer(
      "product_details_form-gallery-container-2",
      ...this.imageNodes
    );

    // global container
    this.container = createContainer(
      "product_details_form-gallery-container",
      this.container1,
      this.container2
    );
  }
  render() {
    return this.container;
  }
}
