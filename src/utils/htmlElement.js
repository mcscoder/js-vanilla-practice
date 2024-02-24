/**
 *
 * @param {string} className
 * @param {...HTMLElement} children
 */
export const createContainer = (className, ...children) => {
  const container = document.createElement("div");
  container.className = className;
  container.append(...children);
  return container;
};

/**
 * @callback onLoadendCallback
 * @param {string} fileName
 * @param {string} imageURL
 */
/**
 * Generates a preview of an image file.
 * @param {File} file - The image file to generate a preview for.
 * @param {onLoadendCallback} onloadend
 */
export const extractImageFile = (
  file,
  onLoadend = (fileName, imageURL) => {
    fileName, imageURL;
  }
) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    onLoadend(file.name, reader.result);
  };
};
