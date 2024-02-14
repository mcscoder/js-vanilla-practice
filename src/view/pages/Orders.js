import { routePaths } from "@/constants";
import {
  Breadcrumb,
  OptionsBox,
  OrdersTable,
  Pagination,
  deliveryStatusTypes,
} from "..";

export class Orders {
  constructor() {
    this.statusOptions = ["Change Status", ...deliveryStatusTypes];

    this.container = document.createElement("div");
    this.container.className = "orders-container";
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

    // selection box
    this.selectionBox = new OptionsBox(
      this.statusOptions[0],
      0,
      deliveryStatusTypes,
      this.onChangeStatus.bind(this)
    );

    // add element to container 2
    this.container2.append(this.selectionBox.render());

    // container 3 element. cover orders table and table pagination
    this.container3 = document.createElement("div");
    this.container3.className = "orders-container-3";

    // orders table
    this.ordersList = new OrdersTable("Recent Purchases");

    // table pagination
    this.pagination = new Pagination(25, 3, () => {});

    // add elements to container 3
    this.container3.append(this.ordersList.render(), this.pagination.render());

    // add elements to global container
    this.container.append(this.container1, this.container2, this.container3);
  }

  onChangeStatus(optionIndex) {
    console.log(optionIndex);
  }

  render() {
    return this.container;
  }
}
