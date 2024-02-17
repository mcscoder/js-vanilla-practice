import { DefaultLayout, Home, OrderDetails, Orders, Products } from "@/view";

export const routes = [
  {
    path: "",
    component: new DefaultLayout(),
    children: [
      { path: "/", component: Home },
      { path: "/products", component: Products },
      { path: "/products/:categoryId", component: Products },
      { path: "/orders", component: Orders },
      { path: "/order-details/:orderId", component: OrderDetails },
    ],
  },
];
