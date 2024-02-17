// example: 12412 => 20000
export const roundToNearest = (number) => {
  const power = Math.pow(10, Math.floor(Math.log10(number)));
  return Math.ceil(number / power) * power;
};
