import { Router } from "@/routes";

export class Main {
  constructor() {
    // main content element
    this.main = document.createElement("main");
    this.main.id = "main";

    // main content initialization
    this.router = new Router();
    this.initMainContent();

    // event listeners for link clicks and window navigation
    document.addEventListener("click", this.handleLinkClick.bind(this));
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  // initializes the main content based on the current URL path
  initMainContent() {
    const currentPath = window.location.pathname;
    this.mainContent = this.router.getRouteComponent(currentPath).render();
    this.main.replaceChildren(this.mainContent);
  }

  // handles link clicks to reinitialize the main content
  handleLinkClick(event) {
    const target = event.target.closest(".link");
    if (target) {
      this.initMainContent();
    }
  }

  // handles window forward or backward navigation to reinitialize the main content
  handlePopState() {
    this.initMainContent();
  }

  render() {
    return this.main;
  }
}
