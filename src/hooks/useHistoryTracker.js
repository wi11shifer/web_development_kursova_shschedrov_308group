// hooks/useHistoryTracker.js
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistoryContext } from '../Contexts/HistoryContext';

export const useHistoryTracker = () => {
  const history = useHistoryContext();
  return { history };
};
