import { chevronDownIcon, notificationsIcon, searchIcon } from "@/constants";
import {
  Button,
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

    let admin = new Admin(
      JSON.parse(
        localStorage.getItem("admin") || sessionStorage.getItem("admin")
      ) || {}
    );
    // account button element
    this.account = new Button(
      `${admin.firstName} ${admin.lastName}`,
      null,
      chevronDownIcon,
      buttonVariants.primary.outlined,
      buttonSizes.sm,
      "",
      this.onAccountClick.bind(this)
    );

    // add children
    this.header.append(
      this.search.render(),
      this.notification.render(),
      this.account.render()
    );
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

  onAccountClick() {
    console.log("onNotificationClick");
  }

  render() {
    return this.header;
  }
}
