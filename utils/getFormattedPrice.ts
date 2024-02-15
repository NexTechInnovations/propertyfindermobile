export const getFormattedPrice = (
  price: number | string,
  locale: string = "en-US",
  currency: string
): string => {
  return price.toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
};
