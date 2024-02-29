import { checkCircleIcon, pictureIcon } from "@/constants";
import { createContainer, extractImageFile } from "@/utils";
import { ProductThumbnail } from ".";
import { DragDropUploader } from "..";

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
    this.container1 = new DragDropUploader(
      "product_details_form-gallery-container-1",
      (files) => {
        const fileList = [...files];
        fileList.forEach((file) => {
          extractImageFile(file, (fileName, imageURL) => {
            this.renderPreviewImage.call(this, { fileName, imageURL });
          });
        });
      },
      this.picture,
      this.description
    );

    // container 2 children --------------------
    /** @type {HTMLDivElement[]} */
    this.imageNodes = [];

    // container 2
    this.container2 = createContainer(
      "product_details_form-gallery-container-2"
    );
    images.forEach(this.renderPreviewImage.bind(this));

    // global container
    this.container = createContainer(
      "product_details_form-gallery-container",
      this.container1.render(),
      this.container2
    );
  }

  /** @private */
  renderPreviewImage({ fileName, imageURL }) {
    const image = new ProductThumbnail(imageURL);
    image.container.classList.add(
      "product_details_form-gallery-image_item-image"
    );

    const name = document.createElement("p");
    name.className = "product_details_form-gallery-image_item-file_name";
    name.textContent = fileName;

    const ok = createContainer("icon-container");
    ok.innerHTML = checkCircleIcon;

    const uploadedItemContainer = createContainer(
      "product_details_form-gallery-image_item",
      image.render(),
      name,
      ok
    );

    this.imageNodes.push(uploadedItemContainer);
    this.container2.append(uploadedItemContainer);
  }

  render() {
    return this.container;
  }
}
