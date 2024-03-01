export const apiEndpoint = {
  getOrder(orderId) {
    return `/api/order/${orderId}`;
  },
  getOrders(orderId = "") {
    return `/api/orders/${orderId}`;
  },
};
