export const formatINR = (current) => {
  // Create our number formatter.
  const usd = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(current);
  return usd;
};
