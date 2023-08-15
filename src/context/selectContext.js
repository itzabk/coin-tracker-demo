import { createContext, useContext, useState } from "react";
import "../components/Header/currencyList";

export const currencyType = createContext(null);

const CurrencyTypeProvider = ({ children }) => {
  const [currency, setCurrency] = useState({
    type: "inr",
    symbol: "₹",
  });

  console.log(currency);
  return (
    <currencyType.Provider value={{ currency, setCurrency }}>
      {children}
    </currencyType.Provider>
  );
};

export default CurrencyTypeProvider;

export const useCurrency = () => {
  return useContext(currencyType);
};
