import { breadcrumbs, getPath } from "@/constants";
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
    this.title.textContent = breadcrumbs[routePaths.slice(-1)];

    // breadcrumb attributes
    this.breadcrumb = document.createElement("div");
    this.breadcrumb.className = "breadcrumb-attributes";
    this.breadcrumb.textContent = "Home";

    this.initBreadcrumbLink();

    // add breadcrumb to container
    this.container.append(this.title, this.breadcrumb);
  }

  /** @private */
  initBreadcrumbLink() {
    // add breadcrumb attributes
    this.routePaths.forEach((path) => {
      const link = new Link(getPath[path]()).render();
      link.textContent = breadcrumbs[path];
      link.className = "breadcrumb-link";
      this.breadcrumb.append(this.getSeparator(), link);
    });
  }

  getSeparator() {
    // breadcrumbs separator
    const separator = document.createElement("span");
    separator.textContent = ">";
    return separator;
  }

  render() {
    return this.container;
  }
}
