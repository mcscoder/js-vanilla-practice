import { createContainer } from "@/utils";

export class ProductThumbnail {
  constructor(imgURL = undefined) {
    // leading class name: product_details_form-thumbnail

    this.image = document.createElement("img");
    this.image.className = "product_details_form-thumbnail-image";
    this.image.src = imgURL;

    this.imageContainer = createContainer(
      "product_details_form-thumbnail-container",
      this.image
    );

    this.container = createContainer("", this.imageContainer);
  }

  render() {
    return this.container;
  }
}
