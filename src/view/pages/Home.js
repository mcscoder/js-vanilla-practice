import { routePaths } from "@/constants";
import {
  Breadcrumb,
  OrderStatCard,
  OrdersTable,
  ProductStatCard,
  SaleGraph,
} from "..";
import { OrderListController } from "@/controllers";
import { apiEndpoint } from "@/utils";

export class Home {
  constructor() {
    this.container = document.createElement("div");
    this.container.className = "dashboard-container";

    this.orderListController = new OrderListController(
      this.dataFetched.bind(this)
    );
  }

  initContent() {
    // container 1 element. this will cover breadcrumb and calendar
    this.container1 = document.createElement("div");
    this.container1.className = "dashboard-container-1";

    // breadcrumb element
    this.breadcrumb = new Breadcrumb(routePaths.home).render();

    // add elements to container 1
    this.container1.append(this.breadcrumb);

    // container 2 element. this will cover order's stat elements
    this.container2 = document.createElement("div");
    this.container2.className = "dashboard-container-2";

    // order stat
    this.totalOrder = new OrderStatCard(
      "Total Orders",
      126.5,
      34.7,
      "Oct 2023"
    ).render();

    // add elements to container 2. this will cover card order stat
    this.container2.append(
      this.totalOrder,
      new OrderStatCard("Total Orders", 126.5, 34.7, "Oct 2023").render(),
      new OrderStatCard("Total Orders", 126.5, 34.7, "Oct 2023").render(),
      new OrderStatCard("Total Orders", 126.5, 34.7, "Oct 2023").render()
    );

    // container 3 element. this will cover sale graph and best sellers
    this.container3 = document.createElement("div");
    this.container3.className = "dashboard-container-3";

    // sale graph element
    this.saleGraph = new SaleGraph(1).render();
    this.saleGraph.classList.add("flex-2");

    // best seller stat element
    this.bestSellerStat = new ProductStatCard(
      "Best seller",
      this.bestSellerProducts
    ).render();
    this.bestSellerStat.classList.add("flex-1");

    this.container3.append(this.saleGraph, this.bestSellerStat);

    this.recentOrdersTable = new OrdersTable("Recent Orders", this.orders);

    // add elements to container
    this.container.append(
      this.container1,
      this.container2,
      this.container3,
      this.recentOrdersTable.render()
    );
  }

  /**
   * @param {Order[]} orders
   */
  dataFetched(orders) {
    this.orders = orders;
    fetch(apiEndpoint.getBestSellerProducts())
      .then((res) => res.json())
      .then((data) => {
        this.bestSellerProducts = data;
        this.initContent();
      });
  }

  render() {
    return this.container;
  }
}
