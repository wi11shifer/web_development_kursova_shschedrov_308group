// hooks/useStatus.js
import { useState, useEffect } from 'react';

export const useStatus = () => {
  const [status, setStatus] = useState(false);

  const toggleStatus = (value) => setStatus(value);

  useEffect(() => {
    console.log("Status changed:", status);
  }, [status]);

  return { status, toggleStatus };
};
