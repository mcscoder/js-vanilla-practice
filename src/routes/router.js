import { LoginController } from "@/controllers";
import { routes } from ".";
import { Admin } from "@/model/dto";

export class Router {
  constructor() {
    window.addEventListener("popstate", () => {
      window.dispatchEvent(new CustomEvent("urlChanged"));
    });
    window.addEventListener("urlChanged", () => {
      Router.routeToMatchingComponent();
    });

    // get data from local storage
    let admin = localStorage.getItem("admin");
    if (admin) {
      LoginController.authentication(new Admin(JSON.parse(admin)), {
        isKeepLogged: true, // true cause data is from local storage
        autoNavigate: false,
        isAlert: false,
        result: this.authenticationResult,
      });
      return;
    }

    // get data from session storage
    admin = sessionStorage.getItem("admin");
    if (admin) {
      LoginController.authentication(new Admin(JSON.parse(admin)), {
        isKeepLogged: false, // false cause data is from session storage
        autoNavigate: false,
        isAlert: false,
        result: this.authenticationResult,
      });
      return;
    }

    // if pathname is not included below, direct to `/login`
    // if pathname is included, direct to current pathname
    const path = ["/login", "/register"].some(
      (item) => item === location.pathname
    )
      ? location.pathname
      : "/login";
    Router.pushState(path);
  }

  /**
   *
   * @param {boolean} isAuthenticated
   */
  authenticationResult(isAuthenticated) {
    if (isAuthenticated) {
      // prevent access authentication page if it's already authenticated
      const path = ["/login", "/register"].some(
        (item) => item === location.pathname
      )
        ? "/"
        : location.pathname;
      Router.pushState(path);
    } else {
      // if there is data from local or session storage
      // but that is failed at authentication
      // then direct it to `/login` page
      Router.pushState("/login");
    }
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
          childNode = route1.component.render();
          params = Router.extractParams(urlPath, componentPath);
          return { childNode, componentPath, params };
        }
      }
    }
    return { childNode, componentPath, params };
  }

  /**
   * @returns {object}
   * Usage: to get productId, we use
   * const productId = Router.getParam().productId
   */
  static getParams() {
    const urlPath = window.location.pathname;
    let [componentPath, params] = [null, null];

    for (const route1 of routes) {
      if (route1.children) {
        for (const route2 of route1.children) {
          componentPath = `${route1.path}${route2.path}`;
          if (Router.matchPath(urlPath, componentPath)) {
            params = Router.extractParams(urlPath, componentPath);
            return params;
          }
        }
      } else {
        componentPath = route1.path;
        if (Router.matchPath(urlPath, componentPath)) {
          params = Router.extractParams(urlPath, componentPath);
          return params;
        }
      }
    }
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

  /**
   * @callback ActionCallback
   * @param {URLSearchParams} searchParams - The URLSearchParams object representing the search parameters.
   * @returns {void}
   */

  /**
   * @param {ActionCallback} [action]
   */
  static urlSearchParams(
    action = (searchParams) => {
      searchParams;
    }
  ) {
    const url = new URL(window.location);

    const searchParams = new URLSearchParams(url.search);
    action(searchParams);

    if (url.search !== searchParams.toString()) {
      url.search = searchParams.toString();
      window.history.pushState(null, null, url);
    }
  }

  static setSearchParam(key, value) {
    Router.urlSearchParams((searchParams) => {
      searchParams.set(key, value);
    });
  }

  static getSearchParam(key) {
    let searchParamValue;
    Router.urlSearchParams((searchParams) => {
      searchParamValue = searchParams.get(key);
    });
    return searchParamValue;
  }

  static deleteSearchParam(key) {
    Router.urlSearchParams((searchParams) => {
      searchParams.delete(key);
    });
  }
}
