import { routeComponents } from "@/constants";
import { DefaultLayout } from "@/view";

export class Router {
  constructor() {
    document.addEventListener("click", this.handleLinkClick.bind(this));
    window.addEventListener("popstate", this.handlePopState.bind(this));
    this.navigate();
  }

  navigate() {
    document.querySelector("#app").innerHTML = DefaultLayout();
    document.querySelector("#main").innerHTML =
      routeComponents[window.location.pathname];
  }

  handleLinkClick(event) {
    const target = event.target.closest(".nav-link");
    if (target) {
      event.preventDefault();
      const newPath = target.getAttribute("href");
      window.history.pushState({}, "", newPath);
      this.navigate();
    }
  }

  handlePopState() {
    this.navigate();
  }
}
