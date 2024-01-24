import { chevronDownIcon, notificationsIcon, searchIcon } from "@/constants";
import { Button, buttonSizes, buttonVariants } from "..";

export class Header {
  constructor() {
    // primary header
    this.header = document.createElement("header");
    this.header.className = "primary-header";

    // search button element
    this.search = new Button(
      null,
      searchIcon,
      null,
      buttonVariants.iconOnly,
      buttonSizes.iconOnly,
      this.onSearchClick.bind(this)
    ).render();

    // notification button element
    this.notification = new Button(
      null,
      notificationsIcon,
      null,
      buttonVariants.iconOnly,
      buttonSizes.iconOnly,
      this.onNotificationClick.bind(this)
    ).render();

    // account button element
    this.account = new Button(
      "admin",
      null,
      chevronDownIcon,
      buttonVariants.primary.outlined,
      buttonSizes.sm,
      this.onAccountClick.bind(this)
    ).render();

    // add children
    this.header.append(this.search, this.notification, this.account);
  }

  onSearchClick() {
    console.log("onSearchClick");
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
