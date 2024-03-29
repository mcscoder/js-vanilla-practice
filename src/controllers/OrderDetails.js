import {
  Order,
  OrderProduct,
  OrderStatus,
  PaymentMethod,
  Shipping,
  User,
  UserPaymentMethod,
} from "@/model/dto";
import { Router } from "@/routes";
import { apiEndpoint } from "@/utils";
import { ControllerMethods } from ".";
import { Toast } from "@/view";

export class OrderDetailsController extends ControllerMethods {
  /**
   * @callback dataFetchedCallBack
   * @param {Order} orderDetails
   * @returns {void}
   */
  /**
   *
   * @param {dataFetchedCallBack} dataFetched
   * @param {onSaveCallBack} onSave
   */
  constructor(
    dataFetched = (orderDetails) => {
      orderDetails;
    }
  ) {
    super();
    this.dataFetched = dataFetched;
    this.orderId = Router.getParams().orderId;

    this.fetchData();
  }

  fetchData() {
    fetch(apiEndpoint.getOrder(this.orderId))
      .then((res) => res.json())
      .then((data) => {
        this.dataFetched(OrderDetailsController.extractOrderDetails(data));
      });
  }

  /**
   *
   * @param {object} data
   * @returns {Order}
   */
  static extractOrderDetails(data) {
    const orderStatus = new OrderStatus(data.orderStatus);
    const shipping = new Shipping(data.shipping);
    const userPaymentMethod = new UserPaymentMethod(data.userPaymentMethod);
    const paymentMethod = new PaymentMethod(
      data.userPaymentMethod.paymentMethod
    );
    const user = new User(data.userPaymentMethod.user);
    userPaymentMethod.response({ paymentMethod, user });
    const orderProducts = data.orderProducts.map((orderProduct) => {
      const _orderProduct = new OrderProduct(orderProduct);
      _orderProduct.response(orderProduct);
      return _orderProduct;
    });

    const order = new Order(data);
    order.response({
      orderStatus,
      shipping,
      userPaymentMethod,
      orderProducts,
    });
    return order;
  }

  /**
   * @param {object} param0
   * @param {number} param0.orderStatusId
   * @param {string} param0.note
   * @returns {void}
   */
  onSave({ orderStatusId, note }) {
    const body = {
      orderStatusId,
      note,
    };
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    fetch(apiEndpoint.getOrders(this.orderId), options).then((res) => {
      if (!res.ok) {
        throw new Error("Can't fetch data");
      }
      Toast.render({ message: "Order has been updated", type: "SUCCESS" });
      this.fetchData();
    });
  }
}
