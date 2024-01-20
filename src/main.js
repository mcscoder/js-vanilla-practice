import "./main.scss";
import { DefaultLayout } from "./view";

// initialize UI
document.querySelector("#app").appendChild(new DefaultLayout().render());
