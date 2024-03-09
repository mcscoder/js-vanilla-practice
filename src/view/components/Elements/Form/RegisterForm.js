import { createContainer } from "@/utils";
import { Form } from "./Form";
import { OtherMethods, Checkbox } from ".";
import { chevronForwardIcon } from "@/constants";
import { Button, buttonSizes, buttonVariants, Input, Link } from "..";

export class RegisterForm extends Form {
  constructor() {
    super();

    // global container
    this.container = createContainer("form-container");

    // container 1 children --------------------
    // 1. Title 1
    this.title1 = document.createElement("h1");
    this.title1.className = "form-title-1";
    this.title1.textContent = "Register";
    // 2. Title 2.1
    this.title2_1 = document.createElement("p");
    this.title2_1.className = "form-title-2";
    this.title2_1.textContent = "Sign up with";
    // 3. Other methods
    this.otherMethods = new OtherMethods();
    // 4. Title 2.2
    this.title2_2 = document.createElement("p");
    this.title2_2.className = "form-title-2";
    this.title2_2.textContent = "OR";

    // container 1
    this.container1 = createContainer(
      "form-register-container-1",
      this.title1,
      this.title2_1,
      this.otherMethods.render(),
      this.title2_2
    );

    // form children --------------------
    // 1. Title 3.1
    this.title3_1 = document.createElement("p");
    this.title3_1.className = "form-title-3";
    this.title3_1.textContent = "Your Name";
    // 2. First name input
    this.firstNameInput = new Input(
      { placeholder: "First Name", required: true },
      "form-input"
    );
    // 3. Last name input
    this.lastNameInput = new Input(
      { placeholder: "Last Name", required: true },
      "form-input"
    );
    // 4. Title 3.2
    this.title3_2 = document.createElement("p");
    this.title3_2.className = "form-title-3";
    this.title3_2.textContent = "Login Details";
    // 5. Email input
    this.emailInput = new Input(
      { placeholder: "Email", required: true },
      "form-input"
    );
    // 6. Password input
    this.passwordInput = new Input(
      { placeholder: "Password", type: "password", required: true },
      "form-input"
    );
    // 7. Term & conditions checkbox
    // 7.1. Term & conditions link
    this.termConditionLink = new Link("#");
    this.termConditionLink.link.className = "form-link";
    this.termConditionLink.link.textContent = "Terms & Conditions";
    // 7.2. Term & conditions checkbox
    this.termConditionCheckbox = new Checkbox("acceptTerm", "form-checkbox", [
      "By clicking 'Log In' you agree to our website ",
      this.termConditionLink.render(),
      ".",
    ]);
    this.termConditionCheckbox.checkbox.required = true;
    // 8. Keep me logged in checkbox
    this.keepLoggedCheckbox = new Checkbox("keepLogged", "form-checkbox", [
      "Keep me logged in",
    ]);
    // 9. Register button
    this.registerButton = new Button(
      "Register",
      null,
      chevronForwardIcon,
      buttonVariants.secondary.filled,
      buttonSizes.lg,
      "",
      () => {}
    );

    // form
    this.form.append(
      this.title3_1,
      this.firstNameInput.render(),
      this.lastNameInput.render(),
      this.title3_2,
      this.emailInput.render(),
      this.passwordInput.render(),
      this.termConditionCheckbox.render(),
      this.keepLoggedCheckbox.render(),
      this.registerButton.render()
    );

    // add elements to global container
    this.container.append(this.container1, this.form);
  }

  render() {
    return this.container;
  }
}
