import React, { useEffect, useState } from "react";
import "../Component/header.css";
import logo1 from "../better_logo.png";
import { FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Dropdown } from "react-bootstrap";
import { logout } from "../api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [location]);

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo1} alt="Logo" width={150} height={50} />
        </Link>

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
            {isLoggedIn && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/aipicks" ? "active-link" : ""}`}
                  to="/aipicks"
                >
                  AI PICKS
                </Link>
              </li>
            )}
          </ul>

          <div className="header-content d-flex align-items-center gap-3">
            {/* Cart Icon */}
            <div
              className="cart-container"
              onClick={handleCartClick}
              style={{ cursor: "pointer" }}
            >
              <FaShoppingBag className="cart-icon" />
              {cartQuantity > 0 && <span className="cart-badge">{cartQuantity}</span>}
            </div>

            <div className="divider"></div>

            {/* Auth Section */}
            {isLoggedIn ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" className="profile-icon-btn">
                  <FaUserCircle size={24} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate("/profile")}>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/subscription")}>
                    Manage Subscription
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link to="/signin" className="login-link">
                LOGIN
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
