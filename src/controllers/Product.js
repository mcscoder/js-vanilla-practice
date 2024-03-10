import { Brand, Product, ProductImage } from "@/model/dto"; // eslint-disable-line no-unused-vars
import { ControllerMethods } from "./ControllerMethods";
import { apiEndpoint } from "@/utils";
import { Router } from "@/routes";

export class ProductController extends ControllerMethods {
  /**
   * @callback dataFetchedCallBack
   * @param {Product[]} products
   */
  /**
   *
   * @param {dataFetchedCallBack} dataFetched
   */
  constructor(
    dataFetched = (products) => {
      products;
    }
  ) {
    super();
    this.dataFetched = dataFetched;
    this.fetchData();
  }

  fetchData() {
    const categoryId = Router.getParams().categoryId || "";
    let url = `${apiEndpoint.getProducts(categoryId)}`;
    const search = Router.getSearchParam("search");
    if (search) {
      url += `?search=${search}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        /** @type {Product[]} */
        const products = data.map((product) => {
          const brand = new Brand(product.brand);
          const category = new Brand(product.category);
          const productImages = product.productImages.map((productImage) => {
            return new ProductImage(productImage);
          });

          const productObj = new Product(product);
          productObj.response({ brand, category, productImages });
          return productObj;
        });
        this.dataFetched(products);
      });
  }
}
