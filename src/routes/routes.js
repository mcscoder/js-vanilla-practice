import { DefaultLayout, Home, Orders, Products } from "@/view";

export const routes = [
  {
    path: "",
    component: new DefaultLayout(),
    children: [
      { path: "/", component: Home },
      { path: "/products/:categoryId", component: Products },
      { path: "/orders/:orderId", component: Orders },
      { path: "/orders", component: Orders },
    ],
  },
];
