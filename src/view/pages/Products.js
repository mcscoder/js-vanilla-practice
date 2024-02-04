import { addCircleIcon, routePaths } from "@/constants";
import {
  Breadcrumb,
  Button,
  ProductCard,
  buttonSizes,
  buttonVariants,
} from "..";

export class Products {
  constructor() {
    this.container = document.createElement("div");
    this.container.className = "all_products-container";

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
      () => {}
    );
    // add elements to container 1
    this.container1.append(
      this.breadcrumb.render(),
      this.addNewProductBtn.render()
    );

    // container 2. (product grid). cover all of product card
    this.container2 = document.createElement("div");
    this.container2.className = "all_products-container-2";

    this.container2.append(
      ProductCard.render(
        "https://www.mobafire.com/images/champion/square/yasuo.png",
        "Yasuo hasagi",
        "DAxuaa",
        25.23,
        "Yasuo 1v5 pentakill with kda 0/11/2 after his teammates call him is idiot yasuo",
        343,
        559
      ),
      ProductCard.render(
        "https://www.mobafire.com/images/champion/square/yasuo.png",
        "Yasuo hasagi",
        "DAxuaa",
        25.23,
        "Yasuo 1v5 pentakill with kda 0/11/2 after his teammates call him is idiot yasuo",
        343,
        559
      ),
      ProductCard.render(
        "https://www.mobafire.com/images/champion/square/yasuo.png",
        "Yasuo hasagi",
        "DAxuaa",
        25.23,
        "Yasuo 1v5 pentakill with kda 0/11/2 after his teammates call him is idiot yasuo",
        343,
        559
      ),
      ProductCard.render(
        "https://www.mobafire.com/images/champion/square/yasuo.png",
        "Yasuo hasagi",
        "DAxuaa",
        25.23,
        "Yasuo 1v5 pentakill with kda 0/11/2 after his teammates call him is idiot yasuo",
        343,
        559
      ),
      ProductCard.render(
        "https://www.mobafire.com/images/champion/square/yasuo.png",
        "Yasuo hasagi",
        "DAxuaa",
        25.23,
        "Yasuo 1v5 pentakill with kda 0/11/2 after his teammates call him is idiot yasuo",
        343,
        559
      ),
      ProductCard.render(
        "https://www.mobafire.com/images/champion/square/yasuo.png",
        "Yasuo hasagi",
        "DAxuaa",
        25.23,
        "Yasuo 1v5 pentakill with kda 0/11/2 after his teammates call him is idiot yasuo",
        343,
        559
      )
    );

    // add elements to global container
    this.container.append(this.container1, this.container2);
  }

  render() {
    return this.container;
  }
}
