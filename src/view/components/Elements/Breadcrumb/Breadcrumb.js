import { breadcrumbs } from "@/constants";
import { Link } from "..";

/** USAGE:
 * const breadcrumb = new Breadcrumb(routePaths.home, routePaths.products, ...);
 * this.container.append(breadcrumb.render());
 */
export class Breadcrumb {
  constructor(...routePaths) {
    this.routePaths = routePaths;

    // breadcrumb container
    this.container = document.createElement("div");
    this.container.className = "breadcrumb-container";

    // breadcrumb title
    this.title = document.createElement("h2");
    this.title.className = "breadcrumb-title";
    this.title.innerText = breadcrumbs[routePaths.slice(-1)];

    // breadcrumb attributes
    this.breadcrumb = document.createElement("div");
    this.breadcrumb.className = "breadcrumb-attributes";
    this.breadcrumb.append((document.createElement("p").innerText = "Home"));

    // breadcrumbs separator
    this.separator = document.createElement("span");
    this.separator.innerText = ">";

    // add breadcrumb attributes
    this.routePaths.forEach((path) => {
      const link = new Link(path).render();
      link.innerText = breadcrumbs[path];
      link.className = "breadcrumb-link";
      this.breadcrumb.append(this.separator, link);
    });

    // add breadcrumb to container
    this.container.append(this.title, this.breadcrumb);
  }

  render() {
    return this.container;
  }
}
