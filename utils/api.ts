// utils/api.ts
export const fetchExchangeRate = async (fromCurrency: string, toCurrency: string): Promise<number> => {
  try {
    const response = await fetch('https://interview.switcheo.com/prices.json');
    if (!response.ok) {
      throw new Error(`API response error: ${response.statusText}`);
    }
    const data = await response.json();
    const fromCurrencyPrice = data.find((item: any) => item.currency.toUpperCase() === fromCurrency.toUpperCase())?.price;
    const toCurrencyPrice = data.find((item: any) => item.currency.toUpperCase() === toCurrency.toUpperCase())?.price;
    if (fromCurrencyPrice && toCurrencyPrice) {
      return fromCurrencyPrice / toCurrencyPrice;
    } else {
      throw new Error('Could not find prices for the specified currencies.');
    }
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('There was an error fetching the exchange rate.');
  }
};


export const fetchAvailableCurrencies = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://interview.switcheo.com/prices.json');
    if (!response.ok) {
      throw new Error(`API response error: ${response.statusText}`);
    }
    const data: { currency: string }[] = await response.json();
    const currencies = Array.from(new Set(data.map((item) => item.currency)));
    return currencies;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('There was an error fetching the available currencies.');
  }
};