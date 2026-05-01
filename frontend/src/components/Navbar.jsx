import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        ✍️ BlogSpace
      </Link>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Home
        </NavLink>
        <NavLink to="/create" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Write Post
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;