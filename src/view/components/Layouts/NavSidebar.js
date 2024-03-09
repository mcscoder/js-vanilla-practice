import {
  albumsIcon,
  barsIcon,
  dashboardIcon,
  documentTextIcon,
  logoIcon,
} from "@/constants";
import {
  Button,
  CategoryToggle,
  NavLink,
  buttonSizes,
  buttonVariants,
} from "..";
import { Category } from "@/model/dto"; // eslint-disable-line no-unused-vars
import { createContainer } from "@/utils";

export class NavSidebar {
  constructor() {
    // leading class name: primary_sidebar

    // sidebar container element
    this.container = document.createElement("div");
    this.container.className = "primary_sidebar sidebar-hide";
    window.addEventListener("mainContainerClicked", () => {
      this.container.classList.add("sidebar-hide");
    });
    window.addEventListener("urlChanged", () => {
      this.container.classList.add("sidebar-hide");
    });
  }

  /** @private */
  initContent() {
    this.container.innerText = "";

    // show sidebar button element
    this.showSidebar = new Button(
      null,
      barsIcon,
      null,
      buttonVariants.iconOnly,
      buttonSizes.iconOnly,
      "primary_sidebar-show_sidebar-btn",
      this.onClickShowSidebar.bind(this)
    );

    // logo container element
    this.logoContainer = document.createElement("div");
    this.logoContainer.className = "center";
    this.logoContainer.innerHTML = logoIcon;

    // navigation links container element
    this.navLinkContainer = document.createElement("nav");
    this.navLinkContainer.className = "primary_sidebar-nav_container";

    // initializes navigation links
    this.initNavigationLink();

    // category toggle
    this.categoryToggle = new CategoryToggle(this.categories).render();

    // content container
    this.sidebarContainer = createContainer(
      "primary_sidebar-container",
      createContainer(
        "primary_sidebar-show_sidebar-container",
        this.showSidebar.render()
      ),
      this.logoContainer,
      this.navLinkContainer,
      this.categoryToggle
    );

    this.container.append(this.sidebarContainer);
  }
  /**
   *
   * @param {Category[]} categories
   */
  categoryDataFetched(categories) {
    this.categories = categories;
    this.initContent();
  }

  // initializes navigation links with predefined data
  initNavigationLink() {
    const navigationLinkItems = [
      {
        startIcon: dashboardIcon,
        label: "dashboard",
        to: "/",
        componentPaths: ["/"],
      },
      {
        startIcon: albumsIcon,
        label: "all products",
        to: `/products`,
        componentPaths: ["/products", "/products/:categoryId"],
      },
      {
        startIcon: documentTextIcon,
        label: "order list",
        to: "/orders",
        componentPaths: ["/orders"],
      },
    ];

    // add navigation link items to the container
    navigationLinkItems.forEach((item) => {
      const navLink = new NavLink(
        item.startIcon,
        item.label,
        item.to,
        item.componentPaths
      );
      this.navLinkContainer.append(navLink.render());
    });
  }

  onClickShowSidebar() {
    this.container.classList.toggle("sidebar-hide");
  }

  render() {
    return this.container;
  }
}
