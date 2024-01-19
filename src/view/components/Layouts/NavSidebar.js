import {
  albumsIcon,
  dashboardIcon,
  documentTextIcon,
  routePaths,
} from "@/constants";
import { NavLink } from "..";

export const NavSidebar = () => {
  return /*html*/ `
    <div class="primary-sidebar">
      <nav>
        ${NavLink(dashboardIcon, "dashboard", routePaths.home)}
        ${NavLink(albumsIcon, "all products", routePaths.products)}
        ${NavLink(documentTextIcon, "order list", routePaths.orders)}
      </nav>
    </div>
  `;
};
