import { NavSidebar, Header, Footer, Main } from ".";

export class DefaultLayout {
  constructor() {
    // Global container
    this.globalContainer = document.createElement("span");
    this.globalContainer.className = "global-container";

    // Navigation sidebar
    this.navSidebar = new NavSidebar();
    this.globalContainer.append(this.navSidebar.render());

    // Content container
    this.contentContainer = document.createElement("div");
    this.contentContainer.className = "content-container";
    this.globalContainer.append(this.contentContainer);

    // Content components
    this.header = new Header();
    this.main = new Main();
    this.footer = new Footer();

    this.mainContainer = document.createElement("div");
    this.mainContainer.className = "main-container";
    this.mainContainer.append(this.main.render(), this.footer.render());
    this.contentContainer.append(this.header.render(), this.mainContainer);
  }

  render() {
    return this.globalContainer;
  }
}
