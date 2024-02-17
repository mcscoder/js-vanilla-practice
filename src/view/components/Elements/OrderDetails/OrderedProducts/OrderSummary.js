import { formatINR } from "@/utils";

export class OrderSummary {
  /**
   *
   * @param {number} totalProductPrice
   * @param {number} discountPercent
   * @param {number} shippingRate
   */
  constructor(totalProductPrice, discountPercent = 0, shippingRate = 0) {
    // leading class name: ordered_products-order_summary

    // container element
    this.container = document.createElement("div");
    this.container.className = "ordered_products-order_summary-container";

    this.container.append(
      this.subDetails("Subtotal", totalProductPrice),
      this.subDetails("Tax (20%)", totalProductPrice * 0.2),
      this.subDetails("Discount", totalProductPrice * discountPercent),
      this.subDetails("Shipping Rate", shippingRate)
    );

    const finalAmount = this.subDetails(
      "Total",
      totalProductPrice +
        totalProductPrice * 0.2 -
        totalProductPrice * discountPercent +
        shippingRate
    );
    finalAmount.classList.add(
      "ordered_products-order_summary-sub_details-final_amount"
    );

    this.container.append(finalAmount);
  }

  /**
   * @param {string} titleText
   * @param {number} descriptionText
   * @returns {HTMLDivElement}
   * @private
   */
  subDetails(titleText, descriptionText) {
    const container = document.createElement("div");
    container.className = "ordered_products-order_summary-sub_details";

    const title = document.createElement("p");
    title.textContent = titleText;

    const description = document.createElement("p");
    description.textContent = formatINR(descriptionText);

    container.append(title, description);

    return container;
  }

  render() {
    return this.container;
  }
}
