import { Brand, Category, ProductImage } from "."; // eslint-disable-line no-unused-vars
import { DTOMethod } from "..";

export const ProductType = {
  id: 0,
  name: "",
  description: "",
  quantity: 0,
  regularPrice: 0,
  salePrice: 0,
  sku: "",
  sales: 0,
  categoryId: 0,
  brandId: 0,
};

export const ProductRequestType = {
  name: "",
  description: "",
  quantity: 0,
  regularPrice: 0,
  salePrice: 0,
  sku: "",
  sales: 0,
  brandId: 0,
  categoryId: 0,
};

/**
 *
 * @param {typeof ProductRequestType} param
 * @returns {typeof ProductRequestType}
 */
export const getProductRequestBody = ({
  name,
  description,
  quantity,
  regularPrice,
  salePrice,
  sku,
  sales,
  brandId,
  categoryId,
}) => {
  return {
    name,
    description,
    quantity,
    regularPrice,
    salePrice,
    sku,
    sales,
    categoryId,
    brandId,
  };
};

export class Product extends DTOMethod {
  /**
   *
   * @param {typeof ProductType } param0
   */
  constructor({
    id,
    name,
    description,
    quantity,
    regularPrice,
    salePrice,
    sku,
    sales,
    categoryId,
    brandId,
  }) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.regularPrice = regularPrice;
    this.salePrice = salePrice;
    this.sku = sku;
    this.sales = sales;
    this.categoryId = categoryId;
    this.brandId = brandId;
  }

  /**
   *
   * @param {object} param0
   * @param {Brand} param0.brand
   * @param {Category} param0.category
   * @param {ProductImage[]} param0.productImages
   */
  response({ brand, category, productImages }) {
    this.brand = brand;
    this.category = category;
    this.productImages = productImages;
  }

  getRequestBody() {
    return {
      name: this.name,
      description: this.description,
      quantity: this.quantity,
      regularPrice: this.regularPrice,
      salePrice: this.salePrice,
      sku: this.sku,
      categoryId: this.categoryId,
      brandId: this.brandId,
    };
  }
}
