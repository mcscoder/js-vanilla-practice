import { addCircleIcon, routePaths } from "@/constants";
import {
  Breadcrumb,
  Button,
  Pagination,
  ProductCard,
  buttonSizes,
  buttonVariants,
} from "..";
import { Product } from "@/model/dto"; // eslint-disable-line no-unused-vars
import { ProductController } from "@/controllers";
import { Router } from "@/routes";

export class Products {
  constructor() {
    this.productController = new ProductController(this.dataFetched.bind(this));

    // global container
    this.container = document.createElement("div");
    this.container.className = "all_products-container";
  }

  initContent() {
    this.container.innerText = "";

    // container 1 element. cover breadcrumb and add new product button
    this.container1 = document.createElement("div");
    this.container1.className = "all_products-container-1";

    // breadcrumb element
    this.breadcrumb = new Breadcrumb(routePaths.products);

    // add new product button element
    this.addNewProductBtn = new Button(
      "add new product",
      addCircleIcon,
      null,
      buttonVariants.primary.filled,
      buttonSizes.lg,
      "",
      Router.pushState.bind(null, "/add-product")
    );
    // add elements to container 1
    this.container1.append(
      this.breadcrumb.render(),
      this.addNewProductBtn.render()
    );

    // container 2. cover all of product grid and pagination
    this.container2 = document.createElement("div");
    this.container2.className = "all_products-container-2";

    // container 2.1. cover product grid
    this.container2_1 = document.createElement("div");
    this.container2_1.className = "all_products-container-2-1";

    // pagination element
    this.pagination = new Pagination(
      this.products.length,
      12,
      (pageIndex, limit) => {
        this.renderProductCards(pageIndex, limit);
      }
    );

    // add elements to container 2
    this.container2.append(this.container2_1, this.pagination.render());

    // add elements to global container
    this.container.append(this.container1, this.container2);
  }

  renderProductCards(index, limit) {
    this.container2_1.innerText = "";
    this.container2_1.append(
      ...this.products.slice(index, index + limit).map((product) => {
        return ProductCard.render(product);
      })
    );
  }

  /**
   *
   * @param {Product[]} products
   */
  dataFetched(products) {
    this.products = products;
    this.initContent();
  }

  render() {
    return this.container;
  }
}
