import React, { useEffect, useState } from "react";
import "../Component/header.css";
import logo1 from "../better_logo.png";
import { FaShoppingBag } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { logout } from "../api";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          {/* Logo */}
          <a className="navbar-brand" href="#">
            <img src={logo1} alt="Logo" width={150} height={50} />
          </a>

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
                  NBA ODDS
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
                  className={`nav-link ${location.pathname === "/allpicks" ? "active-link" : ""}`}
                  to="/allpicks"
                >
                  FREE PICKS
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
            {/* Right Section: Cart, Login/Logout, and CTA Button */}
            <div className="header-content">
              {/* Cart Icon with Badge */}
              <div className="cart-container">
                <FaShoppingBag className="cart-icon" />
                <span className="cart-badge">2</span>
              </div>

              {/* Login/Logout */}
              <span className="login-text">
                {isLoggedIn ? (
                  <a href="#" className="login-link" onClick={handleLogout}>LOGOUT</a>
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