import React, { useEffect, useRef, useState } from 'react';
import { getIconUrl } from '../utils/icon';
import Image from 'next/image';

interface CurrencyBoxProps {
  label: string;
  amount: number;
  selectedCurrency: string;
  availableCurrencies: string[];
  onAmountChange: (amount: number) => void;
  onCurrencySelect: (currency: string) => void;
  onFocus: () => void;
  rounding: 'up' | 'down';
}



const CurrencyBox: React.FC<CurrencyBoxProps> = ({
  label,
  amount,
  selectedCurrency,
  availableCurrencies,
  onAmountChange,
  onCurrencySelect,
  onFocus,
  rounding
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const precision = 2;
  const factor = Math.pow(10, precision);

  const roundedAmount = rounding === 'up'
    ? Math.ceil(amount * factor) / factor
    : Math.floor(amount * factor) / factor;

  const formattedAmount = `${roundedAmount.toFixed(precision)} ${selectedCurrency.toUpperCase()}`;


  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleCurrencySelect = (currency: string) => {
    onCurrencySelect(currency);
    setIsDropdownOpen(false);
  };

  const filteredCurrencies = availableCurrencies.filter(currency =>
    currency.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/shield.png';
  };

  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <label className="block text-gray-700 text-lg font-bold mb-2">{label}</label>
      <div className="relative">
        <div className="flex">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onFocus={onFocus}
            onChange={(e) => {
              const value = e.target.value;
              const isValidValue = /^[0-9]*\.?[0-9]*$/.test(value);
              if (isValidValue || value === '') {
                onAmountChange(Number(value));
              }
            }}
            className="border p-2 rounded-l-lg flex-grow"
          />
          <button onClick={toggleDropdown} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent p-2 rounded-r-lg flex items-center">
            <Image src={getIconUrl(selectedCurrency)} alt={`${selectedCurrency} icon`} width={24} height={24} className="mr-2" onError={handleError} />
            {selectedCurrency.toUpperCase()}
          </button>
        </div>
        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full mt-2 rounded-md shadow-lg z-10">
            <div className="rounded-md bg-white shadow-xs">
              <div className="py-1">
                <input
                  type="text"
                  placeholder="Search"
                  ref={searchInputRef}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-full mb-2"
                />
                <div className="max-h-48 overflow-auto">
                  {filteredCurrencies.map(currency => (
                    <button
                      key={currency}
                      onClick={() => handleCurrencySelect(currency)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <div className="mr-2">
                        <Image
                          onError={handleError}
                          src={getIconUrl(currency)}
                          alt={`${currency} icon`}
                          width={24}
                          height={24}
                        />
                      </div>
                      {currency.toUpperCase()}
                    </button>
                  ))}

                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <label className="block text-gray-700 mt-2">{formattedAmount}</label>
    </div>
  );
};

export default CurrencyBox;