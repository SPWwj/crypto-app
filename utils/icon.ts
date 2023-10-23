export const getIconUrl = (currency: string): string => {
  return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency.toUpperCase()}.svg`;
};