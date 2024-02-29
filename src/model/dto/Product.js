import { Brand, Category, Image } from "."; // eslint-disable-line no-unused-vars
import { DTOMethod } from "..";

export class Product extends DTOMethod {
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
   * @param {Brand} brand
   * @param {Category} category
   * @param {Image[]} images
   */
  response({ brand, category, images }) {
    this.brand = brand;
    this.category = category;
    this.images = images;
  }
}
