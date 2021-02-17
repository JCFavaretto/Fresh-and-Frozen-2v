import { useState } from "react";

export function useLocalCart() {
  const emptyCart = [];
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem("cart");
      return item ? JSON.parse(item) : emptyCart;
    } catch (err) {
      console.log(err);
    }
  });

  const setValue = (value) => {
    setStoredValue(value);
    try {
      window.localStorage.setItem("cart", JSON.stringify(value));
    } catch (err) {
      console.log(err);
    }
  };

  const emptyStorage = () => {
    try {
      window.localStorage.removeItem("cart");
    } catch (err) {
      console.log(err);
    }
  };

  return [storedValue, setValue, emptyStorage];
}
