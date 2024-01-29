import { routePaths } from "@/constants";
import { Breadcrumb, OrderStatCard } from "..";

export class Home {
  constructor() {
    this.container = document.createElement("div");
    this.container.className = "dashboard-container";

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
    ),
      // add elements to container
      this.container.append(this.container1, this.container2);
  }

  render() {
    return this.container;
  }
}
