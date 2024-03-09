export class ProductImage {
  /**
   *
   * @param {object} param0
   * @param {number} param0.id
   * @param {string} param0.imageURL
   * @param {string} param0.imageName
   * @param {number} param0.productId
   */
  constructor({ id, imageURL, imageName, productId }) {
    this.id = id;
    this.imageURL = imageURL;
    this.imageName = imageName;
    this.productId = productId;
  }
}
