import {
  AlbumsIcon,
  DashboardIcon,
  DocumentTextIcon,
  routePaths,
} from "@/constants";
import { NavLink } from "..";

export const NavSidebar = () => {
  return /*html*/ `
    <div class="primary-sidebar">
      <nav>
        ${NavLink(DashboardIcon, "dashboard", routePaths.home)}
        ${NavLink(AlbumsIcon, "all products", routePaths.products)}
        ${NavLink(DocumentTextIcon, "order list", routePaths.orders)}
      </nav>
    </div>
  `;
};
