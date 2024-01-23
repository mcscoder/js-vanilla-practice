import { anchorAttributes } from "@/constants";

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

    // handle active navigation link when forward or backward
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  // return the class name for navigation link based on URL pathname
  // the link is active if its pathname matches the current URL pathname
  getNavLinkClassName(navLinkPathname) {
    const currentPath = window.location.pathname;
    return `nav-link ${navLinkPathname === currentPath ? "nav-link-active" : ""}`;
  }

  // update the class name for navigation link based on URL pathname
  updateNavLinkClassName() {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((navLink) => {
      navLink.className = this.getNavLinkClassName(
        navLink.getAttribute("href")
      );
    });
  }

  // handle navigation link click
  // purpose:
  // 1. prevent page reloading to achieve SPA
  // 2. handle active navigation link
  handleNavLinkClick(event) {
    event.preventDefault();
    // remove `bind(this)` in `this.navLink.addEventListener("click", this.handleNavLinkClick.bind(this));`
    // and uncomment line below to see the effect
    // console.log(this.getAttribute("href")); // uncomment this line
    // if `bind(this)` is present, this will refer to its class
    // otherwise, in this case it will refer to the event dom
    window.history.pushState(null, null, this.navLink.getAttribute("href"));
    this.updateNavLinkClassName();
  }

  // handle window forward or backward
  // purpose:
  // 1. prevent page reloading to achieve SPA
  // 2. handle active navigation link
  handlePopState() {
    this.navLink.className = this.getNavLinkClassName(
      this.navLink.getAttribute("href")
    );
  }

  render() {
    return this.navLink;
  }
}
