export class Home {
  constructor() {
    this.home = document.createElement("span");
    this.home.textContent = "home";
  }

  render() {
    return this.home;
  }
}
