import { createContainer } from "@/utils";

export class ProductThumbnail {
  constructor(imgURL = undefined, className = "") {
    // leading class name: product_details_form-thumbnail

    this.image = document.createElement("img");
    this.image.className = "product_details_form-thumbnail-image";
    this.image.src = imgURL;

    this.imageContainer = createContainer(
      "product_details_form-thumbnail-image-container",
      this.image
    );

    this.container = createContainer(
      `product_details_form-thumbnail-container ${className}`,
      this.imageContainer
    );
  }

  render() {
    return this.container;
  }
}
