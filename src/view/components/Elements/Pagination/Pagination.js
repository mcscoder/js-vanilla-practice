import {
  chevronForwardIcon,
  paginationButtonAttribute,
  paginationURLSearchParamKey,
  threeDotsHorizontalIcon,
} from "@/constants";
import { Button, buttonSizes, buttonVariants } from "..";
import { Router } from "@/routes";

export class Pagination {
  /**
   * @param {number} total - The total number of items to be paginated.
   * @param {number} limit - The number of items to be displayed per page.
   * @param {function} [navigateTo = (page) => {}] - Callback function to handle page navigation.
   */
  constructor(
    total,
    limit,
    navigateTo = (page) => {
      page;
    }
  ) {
    this.total = total;
    this.limit = limit;
    this.navigateTo = navigateTo;

    this.currentPageIndex = Number(
      Router.getSearchParam(paginationURLSearchParamKey)
    );
    if (!this.currentPageIndex) {
      this.currentPageIndex = 0;
    }
    console.log(this.currentPageIndex);

    /**
     * Calculates the total number of pages based on the total number of items and the limit per page.
     * @type {number}
     */
    this.totalPage = Math.ceil(total / limit);

    /**
     * Pagination container, cover all of navigation buttons.
     * @type {HTMLDivElement}
     */
    this.container = document.createElement("div");
    this.container.className = "pagination-container";

    // Initializes navigation buttons
    this.initNavigationButtons();

    // Add initialized navigation buttons to the pagination container
    this.renderNavigationButtons();
  }

  /**
   * Initializes navigation buttons for each page based on the total number of pages.
   * @private
   */
  initNavigationButtons() {
    /**
     * Array to store navigation buttons for each page.
     * @type {Button[]}
     */
    this.navigationButtons = [];

    // Iterates over to create a navigation for each page
    for (let pageIndex = 0; pageIndex < this.totalPage; pageIndex++) {
      // Button variant
      // There is a difference between the normal button and the current page button
      // The normal button is outlined, otherwise the current page button is filled
      const buttonVariant =
        pageIndex === this.currentPageIndex
          ? buttonVariants.primary.filled
          : buttonVariants.primary.outlined;

      const navigationButton = new Button(
        `${pageIndex + 1}`,
        null,
        null,
        buttonVariant,
        buttonSizes.sm,
        "",
        this.onClickNavigationButton.bind(this, pageIndex) // On click event
      );

      // Sets a custom attribute to the button representing the page index
      navigationButton.button.setAttribute(
        paginationButtonAttribute,
        pageIndex
      );

      // Add the created navigation button to the array
      this.navigationButtons.push(navigationButton);
    }

    // Create ellipsis icon button
    this.threeDotsButton = new Button(
      null,
      threeDotsHorizontalIcon,
      null,
      buttonVariants.iconOnly,
      buttonSizes.iconOnly,
      "",
      () => {}
    );

    // Create "next" button
    this.nextButton = new Button(
      "next",
      null,
      chevronForwardIcon,
      buttonVariants.primary.outlined,
      buttonSizes.sm,
      "",
      this.onClickNextButton.bind(this)
    );
  }

  /**
   * Renders navigation buttons in the container based on the current page.
   * @private
   */
  renderNavigationButtons() {
    // Clears the container before appending new navigation buttons
    this.container.innerText = "";

    // Calculate the start and end indices for navigation buttons within visible range
    let [buttonStartIndex, buttonEndIndex] = [
      Math.max(0, this.currentPageIndex - 2), // 2 buttons on the left side of the current page button
      Math.min(this.currentPageIndex + 2, this.totalPage - 1), // 2 buttons on the right side of the current page button
    ];

    // Append navigation buttons within visible range to the container
    for (
      let pageIndex = buttonStartIndex;
      pageIndex <= buttonEndIndex;
      pageIndex++
    ) {
      this.container.append(this.navigationButtons[pageIndex].render());
    }

    // Add ellipsis icon if there are additional pages after visible range
    if (this.totalPage - 1 > buttonEndIndex + 1) {
      this.container.append(this.threeDotsButton.render());
    }

    // Add the last navigation button if there are more pages beyond the visible range
    if (this.totalPage - 1 >= buttonEndIndex + 1) {
      const lastNavigationButton =
        this.navigationButtons[this.navigationButtons.length - 1];
      this.container.append(lastNavigationButton.render());
    }

    // Add the "next" button for navigating to the next page
    this.container.append(this.nextButton.render());
  }

  /** @private */
  onClickNavigationButton(pageIndex) {
    if (pageIndex > this.totalPage - 1) {
      return;
    }
    this.nextButton.button.disabled = pageIndex === this.totalPage - 1;
    this.currentPageIndex = pageIndex;

    if (pageIndex === 0) {
      Router.deleteSearchParam(paginationURLSearchParamKey);
    } else {
      Router.setSearchParam(paginationURLSearchParamKey, pageIndex);
    }

    // callback
    this.navigateTo(this.currentPageIndex);

    // handle navigating
    this.navigationButtons.forEach((item, index) => {
      const buttonClassName = Button.getClassName(
        index === this.currentPageIndex
          ? buttonVariants.primary.filled
          : buttonVariants.primary.outlined,
        buttonSizes.sm
      );

      item.button.className = buttonClassName;
    });

    this.renderNavigationButtons();
  }

  /** @private */
  onClickNextButton() {
    this.onClickNavigationButton(this.currentPageIndex + 1);
  }

  render() {
    return this.container;
  }
}
