import { createContainer } from "@/utils";
import { LoginForm, LoginLayout, RegisterForm } from "../components";

export class Login {
  constructor(isRegister = false) {
    // leading class name: login

    // global container
    this.container = createContainer("login-container");

    // login layout
    this.loginLayout = new LoginLayout(
      isRegister ? new RegisterForm() : new LoginForm()
    );

    // add elements to container
    this.container.append(this.loginLayout.render());
  }

  render() {
    return this.container;
  }
}
