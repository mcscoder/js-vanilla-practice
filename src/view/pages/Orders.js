import { routePaths } from "@/constants";
import {
  Breadcrumb,
  OptionsBox,
  OrdersTable,
  Pagination,
  optionType, // eslint-disable-line no-unused-vars
} from "..";
import { Order } from "@/model/dto"; // eslint-disable-line no-unused-vars
import { OrderListController } from "@/controllers";
import { apiEndpoint } from "@/utils";

export class Orders {
  constructor() {
    // use arrow function
    // cause: with arrow functions there are no biding of `this`
    // so `this` in this case will refer to global
    (async () => {
      await fetch(apiEndpoint.getOrderStatuses())
        .then((res) => res.json())
        .then((data) => {
          /** @type {(typeof optionType)[]} */
          this.orderStatuses = data.map(({ id, name }) => {
            /** @type {typeof optionType} */
            const status = {
              value: id,
              label: name,
            };
            return status;
          });
          // selection box
          this.selectionBox = new OptionsBox(
            { value: "", label: "Change Status" },
            0,
            this.orderStatuses,
            this.onChangeStatus.bind(this)
          );
        });

      this.orderListController = new OrderListController(
        this.dataFetched.bind(this)
      );
    })();

    this.container = document.createElement("div");
    this.container.className = "orders-container";
  }

  initContent() {
    this.container.innerText = "";

    // container 1 element. cover breadcrumb and calendar
    this.container1 = document.createElement("div");
    this.container1.className = "orders-container-1";

    // breadcrumb element
    this.breadcrumb = new Breadcrumb(routePaths.orders);

    // add elements to container 1
    this.container1.append(this.breadcrumb.render());

    // container 2 element. cover selection box
    this.container2 = document.createElement("div");
    this.container2.className = "orders-container-2";

    // add element to container 2
    this.container2.append(this.selectionBox.render());

    // container 3 element. cover orders table and table pagination
    this.container3 = document.createElement("div");
    this.container3.className = "orders-container-3";

    // orders table
    this.ordersList = new OrdersTable("Recent Purchases", this.orders);

    // table pagination
    this.pagination = new Pagination(this.orders.length, 7, () => {});

    // add elements to container 3
    this.container3.append(this.ordersList.render(), this.pagination.render());

    // add elements to global container
    this.container.append(this.container1, this.container2, this.container3);
  }

  /**
   *
   * @param {typeof optionType} param0
   */
  onChangeStatus({ value }) {
    if (value !== "") {
      this.orderListController.fetchData(value);
    } else {
      this.orderListController.fetchData();
    }
  }

  /**
   *
   * @param {Order[]} orders
   */
  dataFetched(orders) {
    this.orders = orders;
    this.initContent();
  }

  render() {
    return this.container;
  }
}
