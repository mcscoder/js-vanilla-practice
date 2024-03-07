import {
  Brand,
  Product,
  ProductImage,
  ProductType,
  getProductRequestBody,
} from "@/model/dto";
import { ControllerMethods } from "./ControllerMethods";
import { apiEndpoint } from "@/utils";
import { Router } from "@/routes";
import { Category, ProductGallery } from "@/view"; // eslint-disable-line no-unused-vars

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
    if (productId) {
      fetch(apiEndpoint.getProduct(productId))
        .then((res) => res.json())
        .then((data) => {
          this.product = new Product(data);

          const brand = new Brand(data.brand);
          const category = new Category(data.category);
          const productImages = data.productImages.map((productImage) => {
            const productImageObj = new ProductImage(productImage);
            return productImageObj;
          });

          this.product.response({ brand, category, productImages });

          this.dataFetched(this.product);
        });
    } else {
      this.product = new Product(ProductType);
      this.dataFetched(this.product);
    }
  }

  /**
   *
   * @param {ProductGallery} productGallery
   */
  setProductGallery(productGallery) {
    this.productGallery = productGallery;
  }

  async updateImages() {
    // update product images
    // 1. delete product images
    await fetch(apiEndpoint.deleteProductImage(), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.productGallery.deleteImageIds),
    });

    // 2. upload new image
    const formData = new FormData();
    this.productGallery.newImages.forEach((file) => {
      if (file) {
        formData.append("files", file);
      }
    });
    await fetch(apiEndpoint.uploadProductImage(this.product.id), {
      method: "POST",
      body: formData,
    });
  }

  onUpdate() {
    (async () => {
      // update product information
      const body = this.product.getRequestBody();
      await fetch(apiEndpoint.patchProduct(this.product.id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Can't fetch data");
        }
      });

      await this.updateImages();

      alert("Save success");
      this.fetchData();
    })();
  }

  onDeprecated() {
    fetch(apiEndpoint.patchDeprecatedProduct(this.product.id), {
      method: "PATCH",
    }).then((res) => {
      if (res.ok) {
        alert("Product has been deprecated");
        Router.pushState("/products");
      }
    });
  }

  onAdd() {
    (async () => {
      const body = getProductRequestBody(this.product);
      await fetch(apiEndpoint.postProduct(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          this.product.id = data.id;
        });

      await this.updateImages();
      alert("Product has been added");
      Router.pushState("/products");
    })();
  }
}
