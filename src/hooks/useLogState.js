// hooks/useLogState.js
import { useEffect, useCounter } from 'react';

export const useLogState = (state, label) => {
  useEffect(() => {
    console.log(`${label}:`, state);
  }, [state]);
};