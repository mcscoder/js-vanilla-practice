import {
  createContainer,
  handleEmailFormat,
  handlePasswordFormat,
} from "@/utils";
import { OtherMethods, Checkbox } from ".";
import { Link, Input, Button, buttonSizes, buttonVariants } from "..";
import { chevronForwardIcon } from "@/constants";
import { Form } from "./Form";

export class LoginForm extends Form {
  constructor() {
    // leading class name: form-login

    super();

    // global container
    this.container = createContainer("form-container");

    // container 1 children --------------------
    // 1. Title
    this.title = document.createElement("h1");
    this.title.className = "form-title-1";
    this.title.textContent = "Login";

    // 2. Forgot password link
    this.forgotPassword = new Link("#");
    this.forgotPassword.link.className = "form-link";
    this.forgotPassword.link.textContent = "Forgot your password?";

    // container 1
    this.container1 = createContainer(
      "form-login-container-1",
      this.title,
      this.forgotPassword.render()
    );

    // form children --------------------
    // 1. Email input field
    this.emailInput = new Input(
      {
        placeholder: "Email",
        required: true,
        onchange: () => handleEmailFormat(this.emailInput.input),
      },
      "form-input"
    );
    // 2. Password input field
    this.passwordInput = new Input(
      {
        placeholder: "Password",
        required: true,
        type: "password",
        onchange: () => handlePasswordFormat(this.passwordInput.input),
      },
      "form-input"
    );
    // 3. Keep login
    this.keepLoggedCheckbox = new Checkbox("keepLogin", "form-checkbox", [
      "Keep me logged in",
    ]);

    // 4. Login button
    this.loginButton = new Button(
      "email login",
      null,
      chevronForwardIcon,
      buttonVariants.secondary.filled,
      buttonSizes.lg,
      "",
      () => {}
    );

    // add elements to form
    this.form.append(
      this.emailInput.render(),
      this.passwordInput.render(),
      this.keepLoggedCheckbox.render(),
      this.loginButton.render()
    );

    this.otherMethods = new OtherMethods();

    // remind
    this.remind = document.createElement("p");

    this.termAndCondition = new Link("#");
    this.termAndCondition.link.className = "form-link";
    this.termAndCondition.link.textContent = "Terms & Conditions";
    this.remind.append(
      "By clicking 'Log In' you agree to our website ",
      this.termAndCondition.render(),
      "."
    );

    this.register = document.createElement("p");

    this.registerLink = new Link("/register");
    this.registerLink.link.className = "form-link";
    this.registerLink.link.textContent = "Register";
    this.register.append("Need an account? ", this.registerLink.render());

    // add elements to global container
    this.container.append(
      this.container1,
      this.form,
      this.otherMethods.render(),
      this.remind,
      this.register
    );
  }

  render() {
    return this.container;
  }
}
