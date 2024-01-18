import { NavSidebar, Header, Footer, Main } from ".";

export const DefaultLayout = () => {
  return /*html*/ `
    <div class="global-container">
      ${NavSidebar()}
      <div class="content-container">
        ${Header()}
        ${Main()}
        ${Footer()}
      </div>
    </div>
  `;
};
