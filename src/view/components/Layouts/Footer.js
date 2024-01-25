import { Link } from "..";

export class Footer {
  constructor() {
    // primary footer
    this.footer = document.createElement("footer");
    this.footer.className = "primary-footer";

    this.copyright = document.createElement("p");
    this.copyright.className = "primary-footer-copyright";
    this.copyright.textContent = "© 2023 - pulstron Dashboard";

    this.navContainer = document.createElement("nav");
    this.navContainer.className = "primary-footer-footer_nav";

    this.initFooterLink();

    // add footer
    this.footer.append(this.copyright, this.navContainer);
  }

  initFooterLink() {
    const footerLinkItems = [
      {
        label: "About",
        to: "#",
      },
      {
        label: "Careers",
        to: "#",
      },
      {
        label: "Policy",
        to: "#",
      },
      {
        label: "Contact",
        to: "#",
      },
    ];

    footerLinkItems.forEach(({ label, to }) => {
      const link = new Link().render();
      link.href = to;
      link.textContent = label;
      this.navContainer.append(link);
    });
  }

  render() {
    return this.footer;
  }
}
