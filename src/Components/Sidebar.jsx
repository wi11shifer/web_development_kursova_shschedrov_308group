import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../Contexts/AppContext';

function Sidebar() {
  const { state } = useContext(AppContext);

  return (
    <aside>
      <ul>
        {state.categories.map((category, index) => (
          <li key={index}>
          <Link to={`/category/${category}`}>{category}</Link>

          </li>
        ))}
      </ul>
    </aside>
  );
}
