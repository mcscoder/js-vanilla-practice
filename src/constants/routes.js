import { Router } from "@/routes";

export const routePaths = {
  home: "/",
  products: "/products",
  orders: "/orders",
  orderDetails: "/order-details/:orderId",
};

export const getPath = {
  [routePaths.home]: () => routePaths.home,
  [routePaths.products]: () => routePaths.products,
  [routePaths.orders]: () => routePaths.orders,
  [routePaths.orderDetails]() {
    const { orderId } = Router.extractParams(
      location.pathname,
      routePaths.orderDetails
    );
    return routePaths.orderDetails.replace(":orderId", orderId);
  },
};

export const breadcrumbs = {
  [routePaths.home]: "Dashboard",
  [routePaths.products]: "All Products",
  [routePaths.orders]: "Order List",
  [routePaths.orderDetails]: "Order Details",
};
