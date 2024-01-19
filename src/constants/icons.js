import albums from "@/assets/icons/albums.svg";
import dashboard from "@/assets/icons/dashboard.svg";
import documentText from "@/assets/icons/document-text.svg";

const loadSvg = async (filePath) => {
  try {
    const response = await fetch(filePath);
    return await response.text();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const [AlbumsIcon, DashboardIcon, DocumentTextIcon] = await Promise.all([
  loadSvg(albums),
  loadSvg(dashboard),
  loadSvg(documentText),
]);

export { AlbumsIcon, DashboardIcon, DocumentTextIcon };
