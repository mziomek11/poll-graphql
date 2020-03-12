import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <main>
      <h2>HomePage page</h2>
      <ul>
        <li>
          <Link to="/poll/1">First poll</Link>
        </li>
        <li>
          <Link to="/poll/2">Second poll</Link>
        </li>
      </ul>
    </main>
  );
};

export default HomePage;
