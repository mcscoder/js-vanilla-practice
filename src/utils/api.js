export const apiEndpoint = {
  getOrder(orderId) {
    return `/api/order/${orderId}`;
  },
  // get all orders if orderId is not provided
  // if orderId is provided, it's may use for the patch request (update data)
  getOrders(orderId = "") {
    return `/api/orders/${orderId}`;
  },
  getCategory(categoryId) {
    return `/api/category/${categoryId}`;
  },
  getCategories() {
    return `/api/categories`;
  },
  getProduct(productId) {
    return `/api/product/${productId}`;
  },
  // get all products if categoryId is not provided
  // and get products by category if categoryId is provided
  getProducts(categoryId = "") {
    return `/api/products/${categoryId}`;
  },
  getOrderStatuses() {
    return `/api/orderStatuses`;
  },
  getBrands() {
    return `/api/brands`;
  },
  patchProduct(productId) {
    return `/api/products/${productId}`;
  },
  deleteProductImage() {
    return `/api/product-images`;
  },
  uploadProductImage(productId) {
    return `/api/upload/product-image/${productId}`;
  },
  patchDeprecatedProduct(productId) {
    return `/api/product/${productId}`;
  },
};
