import {
  albumsIcon,
  dashboardIcon,
  documentTextIcon,
  routePaths,
} from "@/constants";
import { NavLink } from "..";

export class NavSidebar {
  constructor() {
    // sidebar container element
    this.sidebarContainer = document.createElement("div");
    this.sidebarContainer.className = "primary-sidebar";

    // navigation links container element
    this.navLinkContainer = document.createElement("nav");
    this.sidebarContainer.appendChild(this.navLinkContainer);

    // initializes navigation links
    this.initNavigationLink();
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
        to: routePaths.products,
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
