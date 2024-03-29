import {
  DefaultLayout,
  Home,
  Login,
  OrderDetails,
  Orders,
  ProductDetails,
  Products,
} from "@/view";

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
      { path: "/product-details/:productId", component: ProductDetails },
      { path: "/add-product", component: ProductDetails },
    ],
  },
  {
    path: "/login",
    component: new Login(false),
  },
  {
    path: "/register",
    component: new Login(true),
  },
];
