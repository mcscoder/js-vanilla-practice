import { createContainer } from "@/utils";
import { LoginForm, LoginLayout, RegisterForm } from "../components";
import { Admin } from "@/model/dto";
import { LoginController } from "@/controllers";

export class Login {
  constructor(isRegister = false) {
    // leading class name: login

    // global container
    this.container = createContainer("login-container");

    // login layout
    this.loginLayout = new LoginLayout(
      isRegister ? new RegisterForm() : new LoginForm()
    );

    this.formData = this.loginLayout.form;

    this.loginLayout.form.form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!isRegister) {
        console.log(this.formData.keepLoggedCheckbox.checkbox.checked);
        LoginController.authentication(
          new Admin({
            email: this.formData.emailInput.input.value,
            password: this.formData.passwordInput.input.value,
          }),
          { isKeepLogged: this.formData.keepLoggedCheckbox.checkbox.checked }
        );
      } else {
        LoginController.register(
          new Admin({
            firstName: this.formData.firstNameInput.input.value,
            lastName: this.formData.lastNameInput.input.value,
            email: this.formData.emailInput.input.value,
            password: this.formData.passwordInput.input.value,
          })
        );
      }
    });

    // add elements to container
    this.container.append(this.loginLayout.render());
  }

  render() {
    return this.container;
  }
}
