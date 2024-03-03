export class User {
  /**
   *
   * @param {object} param0
   * @param {number} param0.id
   * @param {string} param0.firstName
   * @param {string} param0.lastName
   * @param {string} param0.email
   * @param {string} param0.phone
   */
  constructor({ id, firstName, lastName, email, phone, avatar }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.avatar = avatar;
  }
}
