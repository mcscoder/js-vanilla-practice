import { Link } from "..";

export class CustomerName {
  static render(imgURL, name) {
    // leading class name: order_table-customer_name

    // container element
    const container = new Link("#").render();
    container.className =
      "order_table-customer_name-container order_table-link";

    // user avatar element
    const userAvatar = document.createElement("img");
    userAvatar.src = imgURL;
    userAvatar.width = 32;
    userAvatar.height = 32;
    userAvatar.className = "order_table-customer_name-avatar";

    // user name element
    const userName = document.createElement("span");
    userName.textContent = name;

    // add elements to container
    container.append(userAvatar, userName);

    return container;
  }
}
/*
          &-3 {
            &-container {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;

              @include google-link-style;
            }

            &-avatar {
              border-radius: 999px;
              object-fit: cover;
            }
          }
*/
