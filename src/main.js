import "./main.scss";
import { Router } from "./routes";
import { createContainer } from "./utils";

// initialize UI
// document.querySelector("#app").appendChild(new DefaultLayout().render());
// Router.routeToMatchingComponent();
new Router();

// add toast container
document.querySelector("body").appendChild(createContainer("toast-container"));
