import { Brand, Product, ProductImage } from "@/model/dto";
import { ControllerMethods } from "./ControllerMethods";
import { apiEndpoint } from "@/utils";
import { Router } from "@/routes";
import { Category } from "@/view";

export class ProductDetailsController extends ControllerMethods {
  /**
   * @callback dataFetchedCallBack
   * @param {Product} product
   */
  /**
   *
   * @param {dataFetchedCallBack} dataFetched
   */
  constructor(
    dataFetched = (product) => {
      product;
    }
  ) {
    super();
    this.dataFetched = dataFetched;

    this.fetchData();
  }

  fetchData() {
    const productId = Router.getParams().productId;
    fetch(apiEndpoint.getProduct(productId))
      .then((res) => res.json())
      .then((data) => {
        const product = new Product(data);

        const brand = new Brand(data.brand);
        const category = new Category(data.category);
        const productImages = data.productImages.map((productImage) => {
          const productImageObj = new ProductImage(productImage);
          return productImageObj;
        });

        product.response({ brand, category, productImages });

        this.dataFetched(product);
      });
  }
}
