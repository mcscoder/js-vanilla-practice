import { Brand, Category, ProductImage } from "."; // eslint-disable-line no-unused-vars
import { DTOMethod } from "..";

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
  categoryId,
  brandId,
}) => {
  return {
    name,
    description,
    quantity,
    regularPrice,
    salePrice,
    sku,
    categoryId,
    brandId,
  };
};

export class Product extends DTOMethod {
  /**
   *
   * @param {object} param0
   * @param {number} param0.id
   * @param {string} param0.name
   * @param {string} param0.description
   * @param {number} param0.quantity
   * @param {number} param0.regularPrice
   * @param {number} param0.salePrice
   * @param {string} param0.sku
   * @param {number} param0.sales
   * @param {number} param0.categoryId
   * @param {number} param0.brandId
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
