// 0: Delivered | 1: Canceled | 2: Transport
export const deliveryStatusTypes = ["Delivered", "Canceled", "Transport"];

export class DeliveryStatus {
  static render(status) {
    // container element
    const container = document.createElement("div");
    container.className = "order_table-table-body-row-data-4-container";

    // dot element
    const dot = document.createElement("div");
    dot.className = `order_table-table-body-row-data-4-dot order_table-table-body-row-data-4-dot-${status}`;

    // delivery status
    const statusText = document.createElement("p");
    statusText.textContent = deliveryStatusTypes[status];

    // add elements to container
    container.append(dot, statusText);

    return container;
  }
}
