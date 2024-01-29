import {
  arrowDownIcon,
  arrowUpIcon,
  bagHandleIcon,
  threeDotsVerticalIcon,
} from "@/constants";
import { ContentSection } from "../../Layouts";
import { formatINR } from "@/utils";

export class OrderStatCard {
  constructor(title, totalValue, percentage, comparisonTo) {
    // container element
    this.container = document.createElement("div");
    this.container.className = "order_stat-container";

    // container 1 element. this will cover title and button
    this.container1 = document.createElement("div");
    this.container1.className = "order_stat-container-1";

    // title element
    this.title = document.createElement("h3");
    this.title.className = "order_stat-title";
    this.title.textContent = title;

    // option button element
    this.optionButton = document.createElement("button");
    this.optionButton.className = "order_stat-option_button";
    this.optionButton.innerHTML = threeDotsVerticalIcon;

    // add elements to container 1
    this.container1.append(this.title, this.optionButton);

    // container 2 element. this will cover icon and order's indexes
    this.container2 = document.createElement("div");
    this.container2.className = "order_stat-container-2";

    // icon element
    this.svgIcon = document.createElement("div");
    this.svgIcon.innerHTML = bagHandleIcon;

    this.svgIconContainer = document.createElement("div");
    this.svgIconContainer.className = "order_stat-icon_container";
    this.svgIconContainer.append(this.svgIcon.firstChild);

    // total order value element
    this.totalValue = document.createElement("p");
    this.totalValue.className = "order_stat-total_value";
    this.totalValue.textContent = formatINR(totalValue);

    // percentage element
    this.percentageContainer = document.createElement("div");
    this.percentageContainer.className = "order_stat-percentage_container";

    this.percentageIcon = document.createElement("div");
    // if the value is positive icon will be arrow up and otherwise will be arrow down
    this.percentageIcon.innerHTML =
      percentage > 0 ? arrowUpIcon : arrowDownIcon;

    this.percentage = document.createElement("p");
    this.percentage.textContent = `${percentage}%`;

    this.percentageContainer.append(
      this.percentageIcon.firstChild,
      this.percentage
    );

    // add elements to container 2
    this.container2.append(
      this.svgIconContainer,
      this.totalValue,
      this.percentageContainer
    );

    // container 3 element. this will cover date comparison
    this.container3 = document.createElement("div");
    this.container3.className = "order_stat-container-3";

    // date comparison
    this.comparison = document.createElement("p");
    this.comparison.className = "order_stat-comparison";
    this.comparison.textContent = `Compared to ${comparisonTo}`;

    // add elements to container 3
    this.container3.append(this.comparison);

    // add all to global container
    this.container.append(this.container1, this.container2, this.container3);
  }

  render() {
    const section = new ContentSection(this.container);
    return section.render();
  }
}
