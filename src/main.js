import "./main.scss";
import { navigate } from "./routes";
import { DefaultLayout } from "./view";

document.querySelector("#app").innerHTML = DefaultLayout();

navigate();
