import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <div className='navbar'>
      <ul>
        <li>
          <Link to='/productview'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/charts'>Charts</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;


