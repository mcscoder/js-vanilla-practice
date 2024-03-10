import { createContainer } from "@/utils";
import { LoginForm, RegisterForm } from ".."; // eslint-disable-line no-unused-vars
// import { loginLayoutThumbnail } from "@/constants";

export class LoginLayout {
  /**
   *
   * @param {LoginForm | RegisterForm} form
   */
  constructor(form) {
    // leading class name: login_layout

    // global container
    this.container = createContainer("login_layout-container");

    // container 1 children --------------------
    // 1. Big image
    // this.bigImage = document.createElement("img");
    // this.bigImage.className = "login_layout-big_image";
    // this.bigImage.src = loginLayoutThumbnail;

    // container 1
    this.container1 = createContainer("login_layout-container-1");

    // form
    this.form = form;

    // add elements to global container
    this.container.append(this.container1, this.form.render());
  }

  render() {
    return this.container;
  }
}
