import { ContentSection } from "../..";
import { Button, CHART_TYPES, Chart, buttonSizes, buttonVariants } from "..";
import { chartViewOptionAttribute } from "@/constants";

export class SaleGraph {
  constructor(activeButton = 1) {
    this.activeButton = activeButton;

    // container element
    this.container = document.createElement("div");
    this.container.className = "sale_graph-container";

    // container 1 element. this will cover title and view option button
    this.container1 = document.createElement("div");
    this.container1.className = "sale_graph-container-1";

    // graph title element
    this.title = document.createElement("h3");
    this.title.className = "sale_graph-title";
    this.title.textContent = "Sale Graph";

    this.initButtons();

    // add elements to container 1
    this.container1.append(this.title, this.buttonContainer);

    // container 2 element. this will cover chart
    this.container2 = document.createElement("div");
    this.container2.className = "sale_graph-container-2";

    // this.container2.addEventListener("resize", () => {
    //   const activeButton = document.querySelector("sale_graph-button-active");
    //   const type = activeButton.getAttribute(chartViewOptionAttribute);

    //   this.initChart(
    //     Chart.InitChart(
    //       [50, 100, 50, 75, 60, 310],
    //       type,
    //       this.container2.clientWidth,
    //       300
    //     )
    //   );
    // });

    // add elements to global container
    this.container.append(this.container1, this.container2);

    // initializes chart element
    // use setTimeout will move this to the end of call stack
    // it mean chart will be execute after all of synchronous code executed
    // purpose: to set chart width == container width
    // dang, how genius i am
    setTimeout(() => {
      this.initChart(
        Chart.MonthlyChart(
          [50, 100, 50, 75, 60, 310],
          Math.max(this.container2.clientWidth, 750),
          250
        )
      );
    }, 0);
  }

  initButtons() {
    // button container element
    this.buttonContainer = document.createElement("div");
    this.buttonContainer.className = "sale_graph-button_container";

    // button items
    const buttonItems = [
      {
        label: "weekly",
        chartType: CHART_TYPES.WEEKLY,
      },
      {
        label: "monthly",
        chartType: CHART_TYPES.MONTHLY,
      },
      {
        label: "yearly",
        chartType: CHART_TYPES.YEARLY,
      },
    ];

    // initializes button elements
    buttonItems.forEach(({ label, chartType }, index) => {
      const button = new Button(
        label,
        null,
        null,
        this.activeButton === index
          ? buttonVariants.secondary.filled
          : buttonVariants.secondary.outlined,
        buttonSizes.sm,
        `sale_graph-button ${this.activeButton === index ? "sale_graph-button-active" : ""}`,
        this.onClickChartOption.bind(this)
      );
      const buttonElement = button.render();

      // set attribute for button that will be used in onClick event callback
      // purpose: to determine the displayed chart type.
      buttonElement.setAttribute(chartViewOptionAttribute, chartType);

      // add button element to container
      this.buttonContainer.append(buttonElement);
    });
  }

  // onClick event callback
  onClickChartOption(event) {
    const buttons = document.querySelectorAll(".sale_graph-button");

    // inactivate for all button. included button that user just clicked
    buttons.forEach((item) => {
      item.className = Button.getClassName(
        buttonVariants.secondary.outlined,
        buttonSizes.sm,
        "sale_graph-button"
      );
    });

    // active current button that user just clicked
    event.target.className = Button.getClassName(
      buttonVariants.secondary.filled,
      buttonSizes.sm,
      "sale_graph-button sale_graph-button-active"
    );

    // retrieve the chart type previously set during button initialization.
    const type = event.target.getAttribute(chartViewOptionAttribute);

    /** re-initializes chart view based on @var type */
    this.initChart(
      Chart.InitChart(
        [50, 100, 50, 75, 60, 310],
        type,
        Math.max(this.container2.clientWidth, 750),
        250
      )
    );
  }

  // initializes chart view
  initChart(chart) {
    this.container2.replaceChildren(chart);
  }

  render() {
    const sectionElement = new ContentSection(this.container).render();
    return sectionElement;
  }
}
