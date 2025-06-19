import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Student Projects Repository
        </Link>
        <ul className="navbar-nav">
          <li>
            <Link to="/" className="nav-link">
              Projects
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/create-project" className="nav-link">
                  Create Project
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none' }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 