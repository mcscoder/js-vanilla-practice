import { routePaths } from "@/constants";
import { Breadcrumb } from "..";

export class Home {
  constructor() {
    this.home = document.createElement("div");
    this.breadcrumb = new Breadcrumb(routePaths.home);
    this.home.append(this.breadcrumb.render());
  }

  render() {
    return this.home;
  }
}
