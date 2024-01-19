export const NavLink = (startIcon, label, to) => {
  const currentPath = window.location.pathname;
  const navLinkClasses = `nav-link ${to === currentPath ? "nav-link-active" : ""}`;
  return /*html*/ `
    <a href="${to}" class="${navLinkClasses}">
      ${startIcon}
      <span>${label}</span>
    </a>
  `;
};
