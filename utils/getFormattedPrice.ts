export const getFormattedPrice = (
  price: number,
  locale: string,
  currency: string
): string => {
  return price.toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
};
