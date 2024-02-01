export class TableHeader {
  static render(headingItems = []) {
    // table header group element
    const tableHeader = document.createElement("thead");
    tableHeader.className = "order_table-table-header";

    // table row element. this will cover all of <th> tags
    const tableRow = document.createElement("tr");
    tableRow.className = "order_table-table-header-row";

    headingItems.forEach((textContent, index) => {
      const heading = document.createElement("th");
      heading.className = "order_table-table-header-row-heading";

      // text-align of product cell should be from start
      index === 0 && heading.classList.add("order_table-table-product_cell");

      heading.textContent = textContent;

      // add heading to table row
      tableRow.append(heading);
    });

    tableHeader.append(tableRow);

    return tableHeader;
  }
}
