import { routes } from ".";

export class Router {
  constructor() {
    Router.routeToMatchingComponent();
    window.addEventListener("popstate", () => {
      window.dispatchEvent(new CustomEvent("urlChanged"));
    });
    window.addEventListener("urlChanged", () => {
      Router.routeToMatchingComponent();
    });
  }

  static routeToMatchingComponent() {
    const app = document.querySelector("#app");
    const { childNode } = Router.findRoute();

    if (childNode) {
      return app.replaceChildren(childNode);
    }

    return app.replaceChildren("Not Found");
  }

  static findRoute() {
    let [childNode, componentPath, params] = [null, null, null];
    const urlPath = window.location.pathname;
    for (const route1 of routes) {
      if (route1.children) {
        for (const route2 of route1.children) {
          componentPath = `${route1.path}${route2.path}`;
          if (Router.matchPath(urlPath, componentPath)) {
            params = Router.extractParams(urlPath, componentPath);
            if (Object.keys(params).length !== 0) {
              childNode = new route2.component();
            } else {
              childNode = new route2.component();
            }
            childNode = route1.component.render(childNode.render());
            return { childNode, componentPath, params };
          }
        }
      } else {
        componentPath = route1.path;
        if (Router.matchPath(urlPath, componentPath)) {
          childNode = new route1.component().render();
          params = Router.extractParams(urlPath, componentPath);
          return { childNode, componentPath, params };
        }
      }
    }
    return { childNode, componentPath, params };
  }

  /**
   * @param {string} url
   * @param {string} path
   * @param {boolean} isEqualLength
   */
  static matchPath(url, path, isEqualLength = true) {
    const urlSegments = url.split("/");
    const pathSegments = path.split("/");

    if (urlSegments.length !== pathSegments.length && isEqualLength) {
      return false;
    }

    const len = Math.min(urlSegments.length, pathSegments.length);

    for (let i = 0; i < len; i++) {
      if (
        urlSegments[i] !== pathSegments[i] &&
        !pathSegments[i].startsWith(":")
      ) {
        return false;
      }
    }

    return true;
  }

  /**
   * @param {string} url
   * @param {string} path
   */
  static extractParams(url, path) {
    const urlSegments = url.split("/");
    const routeSegments = path.split("/");
    const params = {};

    for (let i = 0; i < routeSegments.length; i++) {
      if (routeSegments[i].startsWith(":")) {
        const paramKey = routeSegments[i].slice(1);
        params[paramKey] = urlSegments[i];
      }
    }

    return params;
  }

  static pushState(url) {
    window.history.pushState(null, null, url);
    window.dispatchEvent(new CustomEvent("urlChanged"));
  }
}
