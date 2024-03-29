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
import arrowDown from "@/assets/icons/arrowDown.svg";
import bagHandle from "@/assets/icons/bagHandle.svg";
import search from "@/assets/icons/search.svg";
import chevronDown from "@/assets/icons/chevronDown.svg";
import chevronUp from "@/assets/icons/chevronUp.svg";
import user from "@/assets/icons/user.svg";
import masterCard from "@/assets/icons/masterCard.svg";
import picture from "@/assets/icons/picture.svg";
import checkCircle from "@/assets/icons/checkCircle.svg";
import xMark from "@/assets/icons/xMark.svg";
import bars from "@/assets/icons/bars.svg";
import google from "@/assets/icons/google.svg";
import apple from "@/assets/icons/apple.svg";
import facebook from "@/assets/icons/facebook.svg";
import logout from "@/assets/icons/logout.svg";
import checkSuccess from "@/assets/icons/checkSuccess.svg";
import errorCircle from "@/assets/icons/errorCircle.svg";
import infoCircle from "@/assets/icons/infoCircle.svg";
import warning from "@/assets/icons/warning.svg";

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
  chevronUpIcon,
  arrowDownIcon,
  userIcon,
  masterCardIcon,
  pictureIcon,
  checkCircleIcon,
  xMarkIcon,
  barsIcon,
  googleIcon,
  appleIcon,
  facebookIcon,
  logoutIcon,
  checkSuccessIcon,
  errorCircleIcon,
  infoCircleIcon,
  warningIcon,
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
  loadSvg(chevronUp),
  loadSvg(arrowDown),
  loadSvg(user),
  loadSvg(masterCard),
  loadSvg(picture),
  loadSvg(checkCircle),
  loadSvg(xMark),
  loadSvg(bars),
  loadSvg(google),
  loadSvg(apple),
  loadSvg(facebook),
  loadSvg(logout),
  loadSvg(checkSuccess),
  loadSvg(errorCircle),
  loadSvg(infoCircle),
  loadSvg(warning),
]);
