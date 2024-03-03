import { apiEndpoint } from "@/utils";
import { ControllerMethods } from "./ControllerMethods";
import { Order } from "@/model/dto"; // eslint-disable-line no-unused-vars
import { OrderDetailsController } from "./OrderDetails";

export class OrderListController extends ControllerMethods {
  /**
   * @callback dataFetchCallBack
   * @param {Order[]} orders
   * @returns {void}
   */
  /**
   *
   * @param {dataFetchCallBack} dataFetched
   */
  constructor(
    dataFetched = (orders) => {
      orders;
    }
  ) {
    super();
    this.dataFetched = dataFetched;
    this.fetchData();
  }

  fetchData(statusId = "") {
    fetch(apiEndpoint.getOrders(statusId))
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        /** @type {Order[]} */
        const orders = data.map((order) => {
          return OrderDetailsController.extractOrderDetails(order);
        });
        this.dataFetched(orders);
      });
  }
}
