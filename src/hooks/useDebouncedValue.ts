import { useEffect, useState } from "react";

/**
 * Небольшая задержка нужна, чтобы автодополнение не отправляло
 * запрос после каждого мгновенного нажатия клавиши.
 */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
