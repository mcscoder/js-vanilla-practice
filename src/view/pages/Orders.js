export class Orders {
  constructor() {
    this.orders = document.createElement("div");
    this.orders.textContent = "orders";
  }

  render() {
    return this.orders;
  }
}
