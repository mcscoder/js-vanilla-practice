import albums from "@/assets/icons/albums.svg";
import dashboard from "@/assets/icons/dashboard.svg";
import documentText from "@/assets/icons/documentText.svg";
import logo from "@/assets/icons/logo.svg";
import notifications from "@/assets/icons/notifications.svg";
import printer from "@/assets/icons/printer.svg";
import calendar from "@/assets/icons/calendar.svg";
import chevronForward from "@/assets/icons/chevronForward.svg";
import threeDotsHorizontal from "@/assets/icons/threeDotsHorizontal.svg";
import addCircle from "@/assets/icons/addCircle.svg";
import threeDotsVertical from "@/assets/icons/threeDotsVertical.svg";
import arrowUp from "@/assets/icons/arrowUp.svg";
import bagHandle from "@/assets/icons/bagHandle.svg";
import search from "@/assets/icons/search.svg";
import chevronDown from "@/assets/icons/chevronDown.svg";

const loadSvg = async (filePath) => {
  try {
    const response = await fetch(filePath);
    return await response.text();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const [
  albumsIcon,
  dashboardIcon,
  documentTextIcon,
  logoIcon,
  notificationsIcon,
  printerIcon,
  calendarIcon,
  chevronForwardIcon,
  threeDotsHorizontalIcon,
  addCircleIcon,
  threeDotsVerticalIcon,
  arrowUpIcon,
  bagHandleIcon,
  searchIcon,
  chevronDownIcon,
] = await Promise.all([
  loadSvg(albums),
  loadSvg(dashboard),
  loadSvg(documentText),
  loadSvg(logo),
  loadSvg(notifications),
  loadSvg(printer),
  loadSvg(calendar),
  loadSvg(chevronForward),
  loadSvg(threeDotsHorizontal),
  loadSvg(addCircle),
  loadSvg(threeDotsVertical),
  loadSvg(arrowUp),
  loadSvg(bagHandle),
  loadSvg(search),
  loadSvg(chevronDown),
]);
