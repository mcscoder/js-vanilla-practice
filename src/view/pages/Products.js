export class Products {
  constructor() {
    this.products = document.createElement("div");
    this.products.textContent = "products";
  }

  render() {
    return this.products;
  }
}
