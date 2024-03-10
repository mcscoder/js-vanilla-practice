import { apiEndpoint, createContainer, handleNumberInput } from "@/utils";
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
import {
  Product, // eslint-disable-line no-unused-vars
} from "@/model/dto"; // eslint-disable-line no-unused-vars
import { productDetailsDefault } from "@/constants";
import { Form } from "../Form";

export class ProductDetailsForm extends Form {
  /**
   *
   * @param {Product} product
   * @param {boolean} isAddNew
   */
  constructor(product, isAddNew = false) {
    // leading class name: product_details_form

    super();

    this.product = product;
    this.isAddNew = isAddNew;

    // global container
    this.container = this.form;
    this.container.className = "product_details_form-container";

    // fetch data and initializes content
    this.fetchData();
  }

  initContent() {
    this.container.innerText = "";

    // container 1.1 children --------------------
    // 1. Product name input
    this.productNameInput = new InputContainer("input", "Product Name", "", {
      defaultValue: this.product.name,
      required: true,
    });
    // 2. Description input
    this.descriptionInput = new InputContainer("textarea", "Description", "", {
      defaultValue: this.product.description,
      rows: 6,
      required: true,
    });
    // 3. Category select box
    this.categorySelectBox = new InputContainer(
      "selectBox",
      "Category",
      "",
      { value: "", label: "Select Category" },
      this.categories.initialOption,
      this.categories.options,
      ({ value }) => {
        this.product.categoryId = value;
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
      ({ value }) => {
        this.product.brandId = value;
      }
    );
    // 5. SKU input
    this.skuInput = new InputContainer("input", "SKU", "flex-1", {
      defaultValue: this.product.sku,
      required: true,
    });
    // 6. Stock Quantity input
    this.stockQuantityInput = new InputContainer(
      "input",
      "Stock Quantity",
      "flex-1",
      {
        defaultValue: this.product.quantity,
        onchange: handleNumberInput,
        required: true,
      }
    );
    // 7. Regular Price input
    this.regularPriceInput = new InputContainer(
      "input",
      "Regular Price",
      "flex-1",
      {
        defaultValue: this.product.regularPrice,
        onchange: handleNumberInput,
        required: true,
      }
    );
    // 8. Sale Price input
    this.salePriceInput = new InputContainer("input", "Sale Price", "flex-1", {
      defaultValue: this.product.salePrice,
      onchange: handleNumberInput,
      required: true,
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
      this.product.productImages
        ? this.product.productImages[0].imageURL
        : productDetailsDefault,
      "product_details_form-gallery-big_thumbnail"
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
    const buttons = [];
    if (!this.isAddNew) {
      // 1. Update button
      this.updateButton = new Button(
        "update",
        null,
        null,
        buttonVariants.primary.filled,
        buttonSizes.lg,
        "product_details_form-function_button",
        this.onClickUpdate.bind(this)
      );
      // 2. Delete button
      this.deprecatedButton = new Button(
        "deprecated",
        null,
        null,
        buttonVariants.secondary.filled,
        buttonSizes.lg,
        "product_details_form-function_button",
        this.onClickDeprecated.bind(this)
      );
      // 3. Cancel button
      this.cancelButton = new Button(
        "cancel",
        null,
        null,
        buttonVariants.secondary.outlined,
        buttonSizes.lg,
        "product_details_form-function_button",
        this.onClickCancel.bind(this)
      );
      buttons.push(
        this.updateButton.render(),
        this.deprecatedButton.render(),
        this.cancelButton.render()
      );
    } else {
      // 4. Add button
      this.addButton = new Button(
        "Add",
        null,
        null,
        buttonVariants.primary.filled,
        buttonSizes.lg,
        "product_details_form-function_button",
        this.onClickAdd.bind(this)
      );
      buttons.push(this.addButton.render());
    }

    // container 2
    this.container2 = createContainer(
      "product_details_form-container-2",
      ...buttons
    );

    // add elements to global container
    this.container.append(this.container1, this.container2);
  }

  fetchData() {
    (async () => {
      // fetch categories data
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

      // fetch brands data
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

  /**
   * Sync data from input form to the product object (this.product)
   */
  syncDataToObject() {
    this.product.name = this.productNameInput.input.input.value;
    this.product.description = this.descriptionInput.input.textArea.value;
    this.product.sku = this.skuInput.input.input.value;
    this.product.quantity = Number(this.stockQuantityInput.input.input.value);
    this.product.regularPrice = Number(
      this.regularPriceInput.input.input.value
    );
    this.product.salePrice = Number(this.salePriceInput.input.input.value);
  }

  /**
   * @returns {boolean}
   */
  isFormValidity() {
    if (!this.product.categoryId) {
      alert("You must select a category");
      return false;
    }
    if (!this.product.brandId) {
      alert("You must select a brand");
      return false;
    }
    if (this.productGallery.numberOfImages === 0) {
      alert("You must specific at least an image");
      return false;
    }
    return this.form.checkValidity();
  }

  /** @private */
  onClickUpdate() {
    if (this.isFormValidity()) {
      this.syncDataToObject();
      this.onUpdate();
    }
  }

  /**
   * This will be overwrite by object
   */
  onUpdate() {}

  /** @private */
  onClickDeprecated() {
    this.onDeprecated();
  }

  /**
   * This will be overwrite by object
   */
  onDeprecated() {}

  /** @private */
  onClickCancel() {
    console.log("cancel clicked");
  }

  /**
   * This will be overwrite by object
   */
  onCancel() {}

  /** @private */
  onClickAdd() {
    if (this.isFormValidity()) {
      this.syncDataToObject();
      this.onAdd();
    }
  }

  /**
   * This will be overwrite by object
   */
  onAdd() {}

  render() {
    return this.container;
  }
}
