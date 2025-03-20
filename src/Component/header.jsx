import React from "react";
import "../Component/header.css";
import logo1 from "../better_logo.png";
import { FaShoppingBag } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Header = () => {
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
                <a className="nav-link active" aria-current="page" href="/">
                SUBSCRIPTIONS
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/ourteam">
                  TEAM
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/allpicks">
                  FREE PICKS
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  BLOG
                </a>
              </li>
            </ul>

            {/* Right Section: Cart, Login, and CTA Button */}
            <div className="header-content">
              {/* Cart Icon with Badge */}
              <div className="cart-container">
                <FaShoppingBag className="cart-icon" />
                <span className="cart-badge">2</span>
              </div>

              {/* Login */}
              {/* <span className="login-text">LOGIN</span> */}
              <span className="login-text">
  <Link to="/signin" className="login-link">LOGIN</Link>
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
