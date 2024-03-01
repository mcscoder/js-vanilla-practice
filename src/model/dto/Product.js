import { Brand, Category, ProductImage } from "."; // eslint-disable-line no-unused-vars
import { DTOMethod } from "..";

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
}
