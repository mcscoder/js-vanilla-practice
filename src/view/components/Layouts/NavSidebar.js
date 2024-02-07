import {
  albumsIcon,
  dashboardIcon,
  documentTextIcon,
  logoIcon,
  routePaths,
} from "@/constants";
import { CategoryToggle, NavLink } from "..";

export class NavSidebar {
  constructor() {
    // sidebar container element
    this.sidebarContainer = document.createElement("span");
    this.sidebarContainer.className = "primary-sidebar";

    // logo container element
    this.logoContainer = document.createElement("span");
    this.logoContainer.className = "center";
    this.logoContainer.innerHTML = logoIcon;

    // add logo element
    this.sidebarContainer.appendChild(this.logoContainer);

    // navigation links container element
    this.navLinkContainer = document.createElement("nav");
    this.navLinkContainer.className = "nav-container";
    this.sidebarContainer.appendChild(this.navLinkContainer);

    // initializes navigation links
    this.initNavigationLink();

    // category toggle
    this.categoryToggle = new CategoryToggle().render();
    this.sidebarContainer.appendChild(this.categoryToggle);
  }

  // initializes navigation links with predefined data
  initNavigationLink() {
    const navigationLinkItems = [
      {
        startIcon: dashboardIcon,
        label: "dashboard",
        to: routePaths.home,
      },
      {
        startIcon: albumsIcon,
        label: "all products",
        to: `${routePaths.products}/1`,
      },
      {
        startIcon: documentTextIcon,
        label: "order list",
        to: routePaths.orders,
      },
    ];

    // add navigation link items to the container
    navigationLinkItems.forEach((item) => {
      const navLink = new NavLink(item.startIcon, item.label, item.to);
      this.navLinkContainer.append(navLink.render());
    });
  }

  render() {
    return this.sidebarContainer;
  }
}
