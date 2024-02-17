export class TableBody {
  /**
   * @param {(string|HTMLElement)[][]} bodyItems
   */
  constructor(bodyItems) {
    // leading class name: list_table-table

    // table body element covering all of table data
    this.tableBody = document.createElement("tbody");
    this.tableBody.className = "list_table-table-body";

    // table data nodes
    /** @type {HTMLTableCellElement[][]} */
    this.tableDataNodes = [];

    // initializes table data
    bodyItems.forEach((rowItems) => {
      const tableRow = document.createElement("tr");
      tableRow.className = "list_table-table-body-row";

      /** @type {HTMLTableCellElement[]} */
      const tableDataRowNodes = [];
      rowItems.forEach((data) => {
        const td = document.createElement("td");
        td.className = "list_table-table-body-data";
        td.append(data);
        tableDataRowNodes.push(td);
      });

      // push table data to table data nodes
      this.tableDataNodes.push(tableDataRowNodes);

      // add table data to the table row
      tableRow.append(...tableDataRowNodes);

      // add table row to the table data
      this.tableBody.appendChild(tableRow);
    });
  }

  /**
   * Add new class name for a column of the body
   * @param {number} columnIndex - The index of column, start from 0
   * @param {...string} className - New class name for the column
   * @returns {void}
   */
  addColumnClassName(columnIndex, ...className) {
    this.tableDataNodes.forEach((tableDataRowNodes) => {
      tableDataRowNodes[columnIndex].classList.add(...className);
    });
  }

  /**
   * Remove class name for a column of the header
   * @param {number} columnIndex - The index of column, start from 0
   * @param  {...any} className - Class name for removing
   * @returns {void}
   */
  removeColumnClassName(columnIndex, ...className) {
    className.forEach((name) => {
      this.tableDataNodes.forEach((tableDataRowNodes) => {
        const tableDataClassList = tableDataRowNodes[columnIndex].classList;
        if (tableDataClassList.contains(name)) {
          tableDataClassList.remove(name);
        }
      });
    });
  }

  render() {
    return this.tableBody;
  }
}
