import { apiEndpoint, createContainer } from "@/utils";
import {
  Button,
  InputContainer,
  ProductGallery,
  ProductThumbnail,
  buttonSizes,
  buttonVariants,
  optionType, // eslint-disable-line no-unused-vars
  optionsBoxType, // eslint-disable-line no-unused-vars
} from "..";
import { Product } from "@/model/dto"; // eslint-disable-line no-unused-vars

export class ProductDetailsForm {
  /**
   *
   * @param {Product} product
   */
  constructor(product) {
    // leading class name: product_details_form

    this.product = product;

    // global container
    this.container = createContainer("product_details_form-container");

    // fetch data and initializes content
    this.fetchData();
  }

  initContent() {
    this.container.innerText = "";

    // container 1.1 children --------------------
    // 1. Product name input
    this.productNameInput = new InputContainer("input", "Product Name", "", {
      defaultValue: this.product.name,
    });
    // 2. Description input
    this.descriptionInput = new InputContainer("textarea", "Description", "", {
      defaultValue: this.product.description,
      rows: 6,
    });
    // 3. Category select box
    this.categorySelectBox = new InputContainer(
      "selectBox",
      "Category",
      "",
      { value: "", label: "Select Category" },
      this.categories.initialOption,
      this.categories.options,
      ({ value, label }) => {
        console.log(value, label);
      }
    );
    // 4. Brand name input
    this.brandNameSelectBox = new InputContainer(
      "selectBox",
      "Brand Name",
      "",
      { value: "", label: "Select Brand" },
      this.brands.initialOption,
      this.brands.options,
      ({ value, label }) => {
        console.log(value, label);
      }
    );
    // 5. SKU input
    this.skuInput = new InputContainer("input", "SKU", "flex-1", {
      defaultValue: this.product.sku,
    });
    // 6. Stock Quantity input
    this.stockQuantityInput = new InputContainer(
      "input",
      "Stock Quantity",
      "flex-1",
      { defaultValue: this.product.quantity }
    );
    // 7. Regular Price input
    this.regularPriceInput = new InputContainer(
      "input",
      "Regular Price",
      "flex-1",
      { defaultValue: this.product.regularPrice }
    );
    // 8. Sale Price input
    this.salePriceInput = new InputContainer("input", "Sale Price", "flex-1", {
      defaultValue: this.product.salePrice,
    });

    // container 1.1
    this.container1_1 = createContainer(
      "product_details_form-container-1-1",
      this.productNameInput.render(),
      this.descriptionInput.render(),
      this.categorySelectBox.render(),
      this.brandNameSelectBox.render(),
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
    this.productGallery = new ProductGallery(this.product.productImages);

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

    // add elements to global container
    this.container.append(this.container1, this.container2);
  }

  fetchData() {
    (async () => {
      await fetch(apiEndpoint.getCategories())
        .then((res) => res.json())
        .then((data) => {
          let initialOption = 0;
          /** @type {typeof optionsBoxType} */
          this.categories = {
            options: data.map((category, index) => {
              if (category.id === this.product.categoryId) {
                initialOption = index + 1;
              }

              /** @type {typeof optionType} */
              const option = {
                value: category.id,
                label: category.name,
              };
              return option;
            }),
          };
          this.categories.initialOption = initialOption;
        });

      await fetch(apiEndpoint.getBrands())
        .then((res) => res.json())
        .then((data) => {
          let initialOption = 0;

          /** @type {typeof optionsBoxType} */
          this.brands = {
            options: data.map((brand, index) => {
              if (brand.id === this.product.brandId) {
                initialOption = index + 1;
              }

              /** @type {optionType} */
              const option = {
                value: brand.id,
                label: brand.name,
              };
              return option;
            }),
          };
          this.brands.initialOption = initialOption;
        });

      // initializes content after all needed content has been fetched
      this.initContent();
    })();
  }

  render() {
    return this.container;
  }
}
