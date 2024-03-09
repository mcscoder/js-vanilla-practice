import { apiEndpoint } from "@/utils";
import { ControllerMethods } from ".";
import { Category } from "@/model/dto";

export class DefaultLayoutController extends ControllerMethods {
  constructor() {
    super();
  }

  /**
   * @callback dataFetchedCallBack
   * @param {Category[]} categories
   * @returns {void}
   */
  /**
   *
   * @param {dataFetchedCallBack} dataFetched
   */
  fetchCategoryData(
    dataFetched = (categories) => {
      categories;
    }
  ) {
    fetch(apiEndpoint.getCategories())
      .then((res) => res.json())
      .then((data) => {
        /** @type {Category[]} */
        const categories = data.map((category) => {
          const categoryResponse = new Category(category);
          categoryResponse.response(category);
          return categoryResponse;
        });
        dataFetched(categories);
      });
  }
}
