// Components/HistoryPage/HistoryPage.jsx

import React from 'react';
import { useHistoryTracker } from '../../hooks/useHistoryTracker';

const HistoryPage = () => {
  const { history } = useHistoryTracker();

  return (
    <div>
      <h2>Navigation History</h2>
      <ul>
        {history.map((path, index) => (
          <li key={index}>{path}</li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
