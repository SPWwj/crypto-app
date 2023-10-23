"use client"

import React, { useEffect, useState } from 'react';
import { fetchAvailableCurrencies, fetchExchangeRate } from '../utils/api';
import CurrencyBox from './CurrencyBox';

const SwapForm: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<string>('eth');
  const [toCurrency, setToCurrency] = useState<string>('usd');
  const [amount, setAmount] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);
  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('pay'); // Add this line

  useEffect(() => {
    const getCurrencies = async () => {
      const currencies = await fetchAvailableCurrencies();
      setAvailableCurrencies(currencies);
    };
    getCurrencies();
  }, []);
  useEffect(() => {
    const updateResult = async () => {
      if (amount > 0 && lastUpdated === 'pay') {
        try {
          const rate = await fetchExchangeRate(fromCurrency, toCurrency);
          const newResult = amount * rate;
          setResult(newResult);
        } catch (error) {
          console.error('Error fetching exchange rate:', error);
        }
      } else if (result !== null && lastUpdated === 'receive') {
        try {
          const rate = await fetchExchangeRate(toCurrency, fromCurrency);
          const newAmount = result / rate;
          setAmount(newAmount);
        } catch (error) {
          console.error('Error fetching exchange rate:', error);
        }
      }
    };
    updateResult();
  }, [fromCurrency, toCurrency, amount, result, lastUpdated]);

  const handleSwap = () => {
    // Swap the currencies
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);

    // Swap the amounts
    const tempAmount = amount;
    setAmount(result || 0);
    setResult(tempAmount);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-10">
          <CurrencyBox
            label="Pay"
            rounding='up'
            amount={amount}
            selectedCurrency={fromCurrency}
            availableCurrencies={availableCurrencies}
            onAmountChange={setAmount}
            onCurrencySelect={setFromCurrency}
            onFocus={() => setLastUpdated('pay')}
          />
        </div>
        <button
          onClick={handleSwap}
          className="bg-blue-500 text-white py-2 px-4 rounded mx-auto block mb-10"
        >
          Swap
        </button>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <CurrencyBox
            onFocus={() => setLastUpdated('receive')}
            label="Receive"
            rounding='down'
            amount={result || 0}
            selectedCurrency={toCurrency}
            availableCurrencies={availableCurrencies}
            onAmountChange={setResult}
            onCurrencySelect={setToCurrency}
          />
        </div>
      </div>
    </div>
  );

};

export default SwapForm;