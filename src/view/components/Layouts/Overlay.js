import { createContainer } from "@/utils";

export class Overlay {
  constructor() {
    // leading class name: overlay

    this.app = document.querySelector("#app");

    // global container
    this.container = createContainer("overlay-container");

    // close container by click on it
    this.container.addEventListener("click", () => {
      this.display(false);
    });

    // container 1 (content container)
    this.container1 = createContainer("overlay-container-1");

    // prevent event propagation to the container
    this.container1.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // add content container to global container
    this.container.append(this.container1);
  }

  /**
   * @param {boolean} isDisplay
   * @param {HTMLElement[]} children
   */
  display(isDisplay, children = []) {
    if (isDisplay) {
      this.container1.append(...children);
      this.app.appendChild(this.container);
    } else {
      this.app.removeChild(this.container);
      this.container1.innerText = "";
    }
  }

  /**
   * @callback onClickCallBack
   * @param {MouseEvent} event
   * @returns {void}
   */
  /**
   *
   * @param {onClickCallBack} onClick
   */
  onClickContainer(
    onClick = (event) => {
      event;
    }
  ) {
    this.container.addEventListener("click", onClick);
  }
}
