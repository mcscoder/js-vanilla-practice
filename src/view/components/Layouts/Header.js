import {
  chevronDownIcon,
  logoutIcon,
  notificationsIcon,
  searchIcon,
} from "@/constants";
import {
  Button,
  ConfirmToast,
  ContentSection,
  Overlay,
  SearchOverlay,
  buttonSizes,
  buttonVariants,
} from "..";
import { Admin } from "@/model/dto";
import { Router } from "@/routes";

export class Header {
  constructor() {
    // leading class name: primary_header

    this.overlay = new Overlay();

    // primary header
    this.header = document.createElement("header");
    this.header.className = "primary_header";

    // search button element
    this.search = new Button(
      null,
      searchIcon,
      null,
      buttonVariants.iconOnly,
      buttonSizes.iconOnly,
      "",
      this.onSearchClick.bind(this)
    );

    // notification button element
    this.notification = new Button(
      null,
      notificationsIcon,
      null,
      buttonVariants.iconOnly,
      buttonSizes.iconOnly,
      "",
      this.onNotificationClick.bind(this)
    );

    this.admin = new Admin(
      JSON.parse(
        localStorage.getItem("admin") || sessionStorage.getItem("admin")
      ) || {}
    );
    // account button element
    this.isAccountDropdownDisplayed = false;
    this.account = new Button(
      `${this.admin.firstName} ${this.admin.lastName}`,
      null,
      chevronDownIcon,
      buttonVariants.primary.outlined,
      buttonSizes.sm,
      "primary_header-account-btn",
      () => {
        this.onAccountClick(!this.isAccountDropdownDisplayed);
      }
    );
    this.account.button.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    // add children
    this.header.append(
      this.search.render(),
      this.notification.render(),
      this.account.render()
    );

    // dropdown elements --------------------
    // 1. Account dropdown
    // 1.1. Admin name title
    this.adminName = document.createElement("h4");
    this.adminName.textContent = `${this.admin.firstName} ${this.admin.lastName}`;
    this.adminName.className = "primary_header-dropdown-title";
    // 1.2. Logout button
    this.logoutButton = new Button(
      "Logout",
      null,
      logoutIcon,
      buttonVariants.secondary.filled,
      buttonSizes.sm,
      "",
      () => {
        ConfirmToast.render({
          title: "Logout",
          message: "Are you logging out?",
          confirmationLabel: "Yes",
          onClickConfirm: (isConfirmed) => {
            if (isConfirmed) {
              localStorage.removeItem("admin");
              sessionStorage.removeItem("admin");
              location.reload();
            }
          },
        });
      }
    );
    // 1.3. Dropdown container
    this.adminDropDown = new ContentSection("");
    this.isAccountDropdownDisplayed = false;
    this.adminDropDown.sectionContainer.append(
      this.adminName,
      this.logoutButton.render()
    );
    this.adminDropDown.sectionContainer.classList.add(
      "primary_header-dropdown"
    );
    this.adminDropDown.sectionContainer.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    window.addEventListener("click", () => this.onAccountClick(false));
  }

  onSearchClick() {
    const searchOverlay = new SearchOverlay();
    searchOverlay.display(true);
    searchOverlay.onSearchSubmit(() => {
      Router.pushState(`/products?search=${searchOverlay.input.input.value}`);
    });
  }

  onNotificationClick() {
    console.log("onNotificationClick");
  }

  onAccountClick(display) {
    if (display) {
      this.isAccountDropdownDisplayed = true;
      this.header.append(this.adminDropDown.sectionContainer);
    } else {
      if (!this.isAccountDropdownDisplayed) {
        return;
      }
      this.isAccountDropdownDisplayed = false;
      this.header.removeChild(this.adminDropDown.sectionContainer);
    }
  }

  render() {
    return this.header;
  }
}
