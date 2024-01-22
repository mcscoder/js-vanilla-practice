export class Products {
  constructor() {
    this.products = document.createElement("span");
    this.products.textContent = "products";
  }

  render() {
    return this.products;
  }
}
