import { formatINR } from "@/utils";
import { CustomerName, DeliveryStatus, Link } from "..";

export class TableBody {
  static render(bodyItems = []) {
    // table body group element
    const tableBody = document.createElement("tbody");
    tableBody.className = "order_table-table-body";

    bodyItems.forEach(
      ({ product, orderId, date, customerName, status, amount }) => {
        // table row element. this will cover all of <td> tags
        const tableRow = document.createElement("tr");
        tableRow.className = "order_table-table-body-row";

        const tableDataItems = [];
        for (let i = 0; i < 6; i++) {
          const tableData = document.createElement("td");
          tableData.className = `order_table-table-body-row-data-${i}`;
          tableDataItems.push(tableData);
        }

        // product name
        const productLink = new Link("#").render();
        productLink.textContent = product;
        productLink.className = "order_table-table-body-row-data-0-link";
        tableDataItems[0].append(productLink);

        // order id link
        const orderIdLink = new Link("#").render();
        orderIdLink.textContent = orderId;
        orderIdLink.className = "order_table-table-body-row-data-1-link";
        tableDataItems[1].append(orderIdLink);

        // date. temp code for designing UI
        // will be refactor later because date now is not string anymore
        // date will be a number or any date format
        // that should be convert to expected format later
        tableDataItems[2].textContent = date;

        // customer name. that will be link
        // purpose: show user profile when clicked
        // increase UX
        tableDataItems[3].append(
          CustomerName.render(customerName.imgURL, customerName.name)
        );

        // delivery status
        tableDataItems[4].append(DeliveryStatus.render(status));

        // amount
        tableDataItems[5].append(formatINR(amount));

        // add table data items to table row
        tableRow.append(...tableDataItems);

        // add table row to table body group
        tableBody.append(tableRow);
      }
    );

    return tableBody;
  }
}
