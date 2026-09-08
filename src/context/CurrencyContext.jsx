import React, { createContext, useContext, useState, useEffect } from 'react';

export const CURRENCY_CONFIGS = {
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    rate: 1,
    locale: 'en-IN',
    flag: '🇮🇳'
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rate: 0.0116,
    locale: 'en-US',
    flag: '🇺🇸'
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    name: 'UAE Dirham',
    rate: 0.0425,
    locale: 'en-AE',
    flag: '🇦🇪'
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    rate: 0.0091,
    locale: 'en-GB',
    flag: '🇬🇧'
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rate: 0.0108,
    locale: 'de-DE',
    flag: '🇪🇺'
  },
  CAD: {
    code: 'CAD',
    symbol: 'C$',
    name: 'Canadian Dollar',
    rate: 0.0162,
    locale: 'en-CA',
    flag: '🇨🇦'
  }
};

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('avm_currency');
    return saved && CURRENCY_CONFIGS[saved] ? saved : 'INR';
  });

  useEffect(() => {
    localStorage.setItem('avm_currency', currency);
  }, [currency]);

  const activeConfig = CURRENCY_CONFIGS[currency] || CURRENCY_CONFIGS.INR;

  const convertAmount = (inrAmount) => {
    if (typeof inrAmount !== 'number' || isNaN(inrAmount)) return 0;
    return inrAmount * activeConfig.rate;
  };

  const formatPrice = (inrAmount, options = {}) => {
    if (typeof inrAmount !== 'number' || isNaN(inrAmount)) return '';
    const converted = inrAmount * activeConfig.rate;

    if (currency === 'INR') {
      if (options.compact && inrAmount >= 10000000) {
        return `₹${(inrAmount / 10000000).toFixed(2)} Cr`;
      }
      if (options.compact && inrAmount >= 100000) {
        return `₹${(inrAmount / 100000).toFixed(2)} Lacs`;
      }
      return `₹${inrAmount.toLocaleString('en-IN')}`;
    }

    if (options.compact && converted >= 1000000) {
      return `${activeConfig.symbol} ${(converted / 1000000).toFixed(2)}M`;
    }
    if (options.compact && converted >= 1000) {
      return `${activeConfig.symbol} ${(converted / 1000).toFixed(1)}k`;
    }

    return `${activeConfig.symbol} ${Math.round(converted).toLocaleString(activeConfig.locale)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        activeConfig,
        convertAmount,
        formatPrice,
        currencies: Object.values(CURRENCY_CONFIGS)
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
