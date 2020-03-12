import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">
          <h4>Voter</h4>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
