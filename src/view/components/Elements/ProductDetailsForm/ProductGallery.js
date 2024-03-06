import { pictureIcon, xMarkIcon } from "@/constants";
import { createContainer, extractImageFile } from "@/utils";
import { ProductThumbnail } from ".";
import { Button, DragDropUploader, buttonSizes, buttonVariants } from "..";
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

    this.newImages = [];
    this.deleteImageIds = [];

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
        this.newImages.push(...fileList);
        console.log(this.newImages);
        fileList.forEach((file, index) => {
          extractImageFile(file, ({ imageName, imageURL }) => {
            this.renderPreviewImage.call(this, { imageName, imageURL }, index);
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
    productImages.forEach(({ id, imageName, imageURL }) => {
      this.renderPreviewImage({
        id,
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
   * @param {number} param0.id
   * @param {string} param0.imageName
   * @param {string} param0.imageURL
   * @private
   */
  renderPreviewImage(
    { id = undefined, imageName, imageURL },
    newImageIndex = undefined
  ) {
    const image = new ProductThumbnail(imageURL);
    image.container.classList.add(
      "product_details_form-gallery-image_item-image"
    );

    const name = document.createElement("p");
    name.className = "product_details_form-gallery-image_item-file_name";
    name.textContent = imageName;

    const deleteButton = new Button(
      null,
      xMarkIcon,
      null,
      buttonVariants.iconOnly,
      buttonSizes.iconOnly,
      "product_details_form-gallery-image_item-delete_btn",
      this.onClickDelete.bind(this, this.imageNodes.length, {
        id,
        newImageIndex,
      })
    );

    const uploadedItemContainer = createContainer(
      "product_details_form-gallery-image_item",
      image.render(),
      name,
      deleteButton.render()
    );

    this.imageNodes.push(uploadedItemContainer);
    this.container2.append(uploadedItemContainer);
  }

  onClickDelete(imageNodeIndex, { id, newImageIndex }) {
    this.imageNodes[imageNodeIndex].style.display = "none";

    if (id !== undefined) {
      this.deleteImageIds.push(id);
      console.log("delete old image");
    } else {
      this.newImages[newImageIndex] = undefined;
      console.log("delete new image");
    }
  }

  render() {
    return this.container;
  }
}
