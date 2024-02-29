import { createContainer } from "@/utils";
import {
  Button,
  InputContainer,
  ProductGallery,
  ProductThumbnail,
  buttonSizes,
  buttonVariants,
} from "..";

export class ProductDetailsForm {
  constructor(
    productName = "",
    description = "",
    categories = {
      options: ["Yasuo", "Lee Sin", "Master Yi"],
      defaultIndex: 0,
    },
    brandName = "",
    sku = "",
    stockQuantity = "",
    regularPrice = "",
    salePrice = ""
  ) {
    // leading class name: product_details_form

    // container 1.1 children --------------------
    // 1. Product name input
    this.productNameInput = new InputContainer("input", "Product Name", "", {
      defaultValue: productName,
    });
    // 2. Description input
    this.descriptionInput = new InputContainer("textarea", "Description", "", {
      defaultValue: description,
      rows: 6,
    });
    // 3. Category select box
    this.categorySelectBox = new InputContainer(
      "selectBox",
      "Category",
      "",
      "Select category",
      categories.defaultIndex,
      categories.options,
      () => {}
    );
    // 4. Brand name input
    this.brandNameInput = new InputContainer("input", "Brand Name", "", {
      defaultValue: brandName,
    });
    // 5. SKU input
    this.skuInput = new InputContainer("input", "SKU", "flex-1", {
      defaultValue: sku,
    });
    // 6. Stock Quantity input
    this.stockQuantityInput = new InputContainer(
      "input",
      "Stock Quantity",
      "flex-1",
      { defaultValue: stockQuantity }
    );
    // 7. Regular Price input
    this.regularPriceInput = new InputContainer(
      "input",
      "Regular Price",
      "flex-1",
      { defaultValue: regularPrice }
    );
    // 8. Sale Price input
    this.salePriceInput = new InputContainer("input", "Sale Price", "flex-1", {
      defaultValue: salePrice,
    });

    // container 1.1
    this.container1_1 = createContainer(
      "product_details_form-container-1-1",
      this.productNameInput.render(),
      this.descriptionInput.render(),
      this.categorySelectBox.render(),
      this.brandNameInput.render(),
      createContainer(
        "product_details_form-container-1-1-group",
        this.skuInput.render(),
        this.stockQuantityInput.render()
      ),
      createContainer(
        "product_details_form-container-1-1-group",
        this.regularPriceInput.render(),
        this.salePriceInput.render()
      )
    );

    // container 1.2 children --------------------
    // 1. Product thumbnail
    this.outstandingThumbnail = new ProductThumbnail(
      "https://www.mobafire.com/images/champion/square/yasuo.png"
    );
    // 2. Product gallery
    this.productGallery = new ProductGallery([
      {
        fileName: "Yasuo.png",
        imageURL: "https://www.mobafire.com/images/champion/square/yasuo.png",
      },
      {
        fileName: "Yasuo.png",
        imageURL: "https://www.mobafire.com/images/champion/square/yasuo.png",
      },
      {
        fileName: "Yasuo.png",
        imageURL: "https://www.mobafire.com/images/champion/square/yasuo.png",
      },
    ]);

    // container 1.2
    this.container1_2 = createContainer(
      "product_details_form-container-1-2",
      this.outstandingThumbnail.render(),
      this.productGallery.render()
    );

    // container 1
    this.container1 = createContainer(
      "product_details_form-container-1",
      this.container1_1,
      this.container1_2
    );

    // container 2 children --------------------
    // 1. Update button
    this.updateButton = new Button(
      "update",
      null,
      null,
      buttonVariants.primary.filled,
      buttonSizes.lg,
      "product_details_form-function_button",
      () => {}
    );
    // 2. Delete button
    this.deleteButton = new Button(
      "delete",
      null,
      null,
      buttonVariants.secondary.filled,
      buttonSizes.lg,
      "product_details_form-function_button",
      () => {}
    );
    // 3. Cancel button
    this.cancelButton = new Button(
      "cancel",
      null,
      null,
      buttonVariants.secondary.outlined,
      buttonSizes.lg,
      "product_details_form-function_button",
      () => {}
    );

    // container 2
    this.container2 = createContainer(
      "product_details_form-container-2",
      this.updateButton.render(),
      this.deleteButton.render(),
      this.cancelButton.render()
    );

    // global container
    this.container = createContainer(
      "product_details_form-container",
      this.container1,
      this.container2
    );
  }

  render() {
    return this.container;
  }
}
