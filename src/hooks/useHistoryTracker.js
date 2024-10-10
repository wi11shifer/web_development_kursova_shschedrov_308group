import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useHistoryTracker = () => {
  const [history, setHistory] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setHistory((prevHistory) => [...prevHistory, location.pathname]);
  }, [location]);

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      navigate(newHistory[newHistory.length - 1]);
    }
  };

  return { history, goBack };
};
