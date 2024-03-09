import { DTOMethod } from "..";

export const AdminType = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const AdminAuthenticationRequestType = {
  email: "",
  password: "",
};

export const AdminRegisterRequestType = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export class Admin extends DTOMethod {
  /**
   *
   * @param {typeof AdminType} param0
   */
  constructor({ id, firstName, lastName, email, password }) {
    super();
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  /**
   *
   * @returns {typeof AdminAuthenticationRequestType}
   */
  getAuthenticationBody() {
    return {
      email: this.email,
      password: this.password,
    };
  }

  /**
   * @returns {typeof AdminRegisterRequestType}
   */
  getRegisterBody() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };
  }
}
