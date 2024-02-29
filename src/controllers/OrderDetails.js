import {
  Order,
  OrderStatus,
  PaymentMethod,
  Product,
  Shipping,
  User,
  UserPaymentMethod,
} from "@/model/dto";

export class OrderDetailsController {
  /**
   * @callback dataFetchedCallBack
   * @param {Order} orderDetails
   * @returns {void}
   */
  /**
   *
   * @param {dataFetchedCallBack} dataFetched
   */
  constructor(
    dataFetched = (orderDetails) => {
      orderDetails;
    }
  ) {
    const url = `/api/order/${1}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const orderStatus = new OrderStatus(data.orderStatus);
        const shipping = new Shipping(data.shipping);
        const userPaymentMethod = new UserPaymentMethod(data.userPaymentMethod);
        const paymentMethod = new PaymentMethod(
          data.userPaymentMethod.paymentMethod
        );
        const user = new User(data.userPaymentMethod.user);
        userPaymentMethod.response({ paymentMethod, user });
        const products = data.products.map((product) => {
          return new Product(product);
        });
        const order = new Order(data);
        order.response({ orderStatus, shipping, userPaymentMethod, products });
        dataFetched(order);
      });
  }
}
