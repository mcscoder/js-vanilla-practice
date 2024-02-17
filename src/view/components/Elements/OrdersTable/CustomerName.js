import { Link } from "..";

export class CustomerName {
  static render(imgURL, name) {
    // container element
    const container = new Link("#").render();
    container.className = "order_table-table-body-row-data-3-container";

    // user avatar element
    const userAvatar = document.createElement("img");
    userAvatar.src = imgURL;
    userAvatar.width = 32;
    userAvatar.height = 32;
    userAvatar.className = "order_table-table-body-row-data-3-user_avatar";

    // user name element
    const userName = document.createElement("span");
    userName.textContent = name;

    // add elements to container
    container.append(userAvatar, userName);

    return container;
  }
}
