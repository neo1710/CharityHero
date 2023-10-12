import { useRef } from "react";

export const useDebounce = () => {
  const timeoutRef = useRef();

  const debounce = (e, func, delay) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!e.target.value) {
      return; // No need to set a timeout if there's no value
    }

    timeoutRef.current = setTimeout(() => {
      func(e.target.value);
    }, delay);
  };

  return debounce;
};
