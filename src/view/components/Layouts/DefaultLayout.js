import { DefaultLayoutController } from "@/controllers";
import { NavSidebar, Header, Footer, Main } from ".";

export class DefaultLayout {
  constructor() {
    this.defaultLayoutController = new DefaultLayoutController();

    // Global container
    this.globalContainer = document.createElement("div");
    this.globalContainer.className = "global-container";

    // Navigation sidebar
    this.navSidebar = new NavSidebar();
    this.globalContainer.append(this.navSidebar.render());
    this.defaultLayoutController.fetchCategoryData(
      this.navSidebar.categoryDataFetched.bind(this.navSidebar)
    );

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
    this.contentContainer.addEventListener("click", () => {
      window.dispatchEvent(new CustomEvent("mainContainerClicked"));
    });

    this.mainContainer.append(this.main.render(), this.footer.render());
    this.contentContainer.append(this.header.render(), this.mainContainer);
  }

  render(childNode) {
    this.main.container.replaceChildren(childNode);
    return this.globalContainer;
  }
}
