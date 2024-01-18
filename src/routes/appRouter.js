import { routeComponents } from "@/constants";

export const navigate = () => {
  const path = window.location.pathname;
  const component = routeComponents[path];
  const main = document.querySelector("#main");
  main.innerHTML = component;
};
