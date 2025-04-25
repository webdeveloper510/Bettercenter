import React, { useEffect, useState } from "react";
import "../Component/header.css";
import logo1 from "../better_logo.png";
import { FaShoppingBag } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { logout } from "../api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cartQuantity = useSelector(state => state.cart.totalQuantity);
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    }; 
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);  
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [location]);
  const handleCartClick = () => {
    navigate('/cart');
  };
  
  const handleLogout = () => {
    logout();
    localStorage.removeItem("accessToken"); 
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
    navigate("/"); 
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img src={logo1} alt="Logo" width={150} height={50} />
          </Link>
          
          {/* Mobile Menu Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links & Right Section */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/" ? "active-link" : ""}`}
                  to="/"
                >
                  ODDS
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/ourteam" ? "active-link" : ""}`}
                  to="/ourteam"
                >
                  TEAM
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/blog" ? "active-link" : ""}`}
                  to="/blog"
                >
                  BLOG
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/newspage" ? "active-link" : ""}`}
                  to="/newspage"
                >
                  NEWS
                </Link>
              </li>
            </ul>
    
            <div className="header-content">
  
              <div className="cart-container" onClick={handleCartClick} style={{ cursor: 'pointer' }}>
          <FaShoppingBag className="cart-icon" />
          <span className="cart-badge">{cartQuantity > 0 ? cartQuantity : ''}</span>
        </div>

              {/* Login/Logout Toggle */}
              <span className="login-text">
                {isLoggedIn ? (
                  <a href="#" onClick={handleLogout} className="login-link">LOGOUT</a>
                ) : (
                  <Link to="/signin" className="login-link">LOGIN</Link>
                )}
              </span>

              {/* Divider */}
              <div className="divider"></div>

              {/* Talk to an Expert Button */}
              <button className="talk-btn">TALK TO AN EXPERT</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;