export class TableHeader {
  /**
   * @param {string[]} headerTextItems
   */
  constructor(headerTextItems) {
    // leading class name: list_table-table

    // table header element covering table row
    this.tableHeader = document.createElement("thead");
    this.tableHeader.className = "list_table-table-header";

    // table row element covering all of table heading tags
    this.tableRow = document.createElement("tr");
    this.tableRow.className = "list_table-table-header-row";

    // table header text nodes
    /** @type {HTMLTableCellElement[]} */
    this.headerTextNodes = [];

    // initializes table header items
    headerTextItems.forEach((text) => {
      const th = document.createElement("th");
      th.className = "list_table-table-header-data";
      th.textContent = text;
      this.headerTextNodes.push(th);
    });
    this.tableRow.append(...this.headerTextNodes);

    // add row to table header
    this.tableHeader.append(this.tableRow);
  }

  /**
   * Add new class name for a column of the header
   * @param {number} columnIndex - The index of column, start from 0
   * @param {...string} className - New class name for the column
   * @returns {void}
   */
  addColumnClassName(columnIndex, ...className) {
    this.headerTextNodes[columnIndex].classList.add(...className);
  }

  /**
   * Remove class name for a column of the header
   * @param {number} columnIndex - The index of column, start from 0
   * @param  {...any} className - Class name for removing
   * @returns {void}
   */
  removeColumnClassName(columnIndex, ...className) {
    const tableHeadingClassList = this.headerTextNodes[columnIndex].classList;
    className.forEach((name) => {
      if (tableHeadingClassList.contains(name)) {
        tableHeadingClassList.remove(name);
      }
    });
  }

  render() {
    return this.tableHeader;
  }
}
