import { threeDotsVerticalIcon } from "@/constants";
import {
  Button,
  TableBody,
  TableHeader,
  buttonSizes,
  buttonVariants,
} from "..";
import { createContainer } from "@/utils";

export class ListTable {
  /**
   *
   * @param {string} titleText
   * @param {string[]} headerTextItems
   * @param {(string|HTMLElement)[][]} bodyItems
   */
  constructor(titleText, headerTextItems, bodyItems) {
    // leading class name: list_table

    // container element covering container 1 and table
    this.container = document.createElement("div");
    this.container.className = "list_table-container";

    // container 1 element covering title and option button
    this.container1 = document.createElement("div");
    this.container1.className = "list_table-container-1";

    // container 1 children --------------------
    // 1. title element
    this.title = document.createElement("h3");
    this.title.className = "list_table-title";
    this.title.textContent = titleText;

    // 2. option button
    this.option = new Button(
      null,
      threeDotsVerticalIcon,
      null,
      buttonVariants.iconOnly,
      buttonSizes.iconOnly,
      "list_table-option_button",
      () => {}
    );

    // add elements to container 1
    this.container1.append(this.title, this.option.render());

    // table element covering table header and table body
    this.table = document.createElement("table");
    this.table.className = "list_table-table";

    // table children
    // 1. table header
    this.tableHeader = new TableHeader(headerTextItems);

    // 2. table body
    this.tableBody = new TableBody(bodyItems);

    // add elements to table
    this.table.append(this.tableHeader.render(), this.tableBody.render());

    // container 2 covering table
    this.container2 = createContainer("list_table-container-2", this.table);

    // add elements to global container
    this.container.append(this.container1, this.container2);
  }
  render() {
    return this.container;
  }
}
