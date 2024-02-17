// 0: Delivered | 1: Canceled | 2: Transport | 3: Pending
export const deliveryStatusTypes = [
  "Delivered",
  "Canceled",
  "Transport",
  "Pending",
];

export class DeliveryStatus {
  static render(status) {
    // container element
    const container = document.createElement("div");
    container.className = "order_table-delivery_status-container";

    // dot element
    const dot = document.createElement("div");
    dot.className = `order_table-delivery_status-dot order_table-delivery_status-dot-${status}`;

    // delivery status
    const statusText = document.createElement("p");
    statusText.textContent = deliveryStatusTypes[status];

    // add elements to container
    container.append(dot, statusText);

    return container;
  }
}

/*
          // 4: delivery status
          &-4 {
            &-container {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
            }

            &-dot {
              width: 0.5rem;
              height: 0.5rem;
              border-radius: 999px;

              &-0 {
                background-color: $bg-delivered;
              }

              &-1 {
                background-color: $bg-canceled;
              }

              &-2 {
                background-color: $bg-transport;
              }

              &-3 {
                background-color: $bg-pending;
              }
            }
          }
*/
