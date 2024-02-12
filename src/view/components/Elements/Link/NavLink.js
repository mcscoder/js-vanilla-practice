import { anchorAttributes } from "@/constants";
import { Router } from "@/routes";

export class NavLink {
  constructor(startIcon, label, to) {
    this.startIcon = startIcon;
    this.label = label;
    this.to = to;

    // navigation link
    this.navLink = document.createElement("a");
    this.navLink.setAttribute(anchorAttributes.navLink, "");
    this.navLink.href = this.to;
    this.navLink.className = this.getNavLinkClassName(
      this.navLink.getAttribute("href")
    );

    // navigation link icon
    this.navLinkIcon = document.createElement("span");
    this.navLinkIcon.innerHTML = startIcon;
    this.navLinkIcon = this.navLinkIcon.firstChild;

    // navigation link text
    this.navLinkLabel = document.createElement("span");
    this.navLinkLabel.textContent = this.label;

    // add icon and text to navigation link element
    this.navLink.append(this.navLinkIcon, this.navLinkLabel);

    // handle click event to prevent page reloading
    this.navLink.addEventListener("click", this.handleNavLinkClick.bind(this));

    // handle active navigation link
    window.addEventListener(
      "urlChanged",
      this.updateNavLinkClassName.bind(this)
    );
  }

  // return the class name for navigation link based on URL pathname
  // the link is active if its pathname matches the current URL pathname
  getNavLinkClassName(navLinkPathname) {
    const currentPath = window.location.pathname;
    return `nav-link ${Router.matchPath(navLinkPathname, currentPath, false) ? "nav-link-active" : ""}`;
  }

  // update the class name for navigation link based on URL pathname
  updateNavLinkClassName() {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((navLink) => {
      navLink.className = this.getNavLinkClassName(
        navLink.getAttribute("href")
      );
    });
    this.navLink.className = this.getNavLinkClassName(
      this.navLink.getAttribute("href")
    );
  }

  // handle navigation link click
  // purpose:
  // 1. prevent page reloading to achieve SPA
  handleNavLinkClick(event) {
    event.preventDefault();
    Router.pushState(this.navLink.getAttribute("href"));
  }

  render() {
    return this.navLink;
  }
}
