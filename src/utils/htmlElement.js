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
 * @param {object} param0
 * @param {string} param0.imageName
 * @param {string} param0.imageURL
 */
/**
 * Generates a preview of an image file.
 * @param {File} file - The image file to generate a preview for.
 * @param {onLoadendCallback} onLoadend
 */
export const extractImageFile = (
  file,
  onLoadend = ({ imageName, imageURL }) => {
    imageName, imageURL;
  }
) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    onLoadend({ imageName: file.name, imageURL: reader.result });
  };
};
