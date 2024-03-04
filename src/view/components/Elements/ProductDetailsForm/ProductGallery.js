import { checkCircleIcon, pictureIcon } from "@/constants";
import { createContainer, extractImageFile } from "@/utils";
import { ProductThumbnail } from ".";
import { DragDropUploader } from "..";
import { ProductImage } from "@/model/dto"; // eslint-disable-line no-unused-vars

export class ProductGallery {
  /**
   * @typedef {object} ImageObject
   * @property {string} imageURL - The URL of the image.
   * @property {string} imageTitle - The file name of the image.
   */

  /**
   * @param {ProductImage[]} productImages - An array of ImageObject representing multiple images.
   */
  constructor(productImages) {
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
          extractImageFile(file, ({ imageName, imageURL }) => {
            this.renderPreviewImage.call(this, { imageName, imageURL });
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
    productImages.forEach(({ imageName, imageURL }) => {
      this.renderPreviewImage({
        imageName,
        imageURL,
      });
    });

    // global container
    this.container = createContainer(
      "product_details_form-gallery-container",
      this.container1.render(),
      this.container2
    );
  }

  /**
   * @param {object} param0
   * @param {string} param0.imageName
   * @param {string} param0.imageURL
   * @private
   */
  renderPreviewImage({ imageName, imageURL }) {
    const image = new ProductThumbnail(imageURL);
    image.container.classList.add(
      "product_details_form-gallery-image_item-image"
    );

    const name = document.createElement("p");
    name.className = "product_details_form-gallery-image_item-file_name";
    name.textContent = imageName;

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
