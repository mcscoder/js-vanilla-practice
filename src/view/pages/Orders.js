export class Orders {
  constructor() {
    this.orders = document.createElement("span");
    this.orders.textContent = "orders";
  }

  render() {
    return this.orders;
  }
}
