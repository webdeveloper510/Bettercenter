import React from "react";
import "../Component/footer.css";
import logo1 from "../better_logo.png";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Column 1 - Logo & Description */}
          <div className="col-md-3 footer-column">
            <img src={logo1} alt="Logo" className="footer-logo" />
            <p className="footer-description">
              Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.
            </p>
          </div>

          {/* Column 2 - Links */}
          <div className="col-md-3 footer-column">
            <h4>Links</h4>
            <ul>
              <li><a href="/">Subscriptions</a></li>
              <li><a href="/">Team</a></li>
              <li><a href="/">Free Picks</a></li>
              <li><a href="/">Blog</a></li>
              <li><a href="/">Login</a></li>
            </ul>
          </div>

          {/* Column 3 - Info */}
          <div className="col-md-3 footer-column">
            <h4>Info</h4>
            <p><FaMapMarkerAlt className="icon" /> 6660 W. Charleston Blvd.<br /> Las Vegas, NV 89106</p>
            <p><FaEnvelope className="icon" /> info@bettorcenter.com</p>
          </div>
        <div className="col-md-3 footer-newsletter">
        <h4>Winning tips directly to your inbox.</h4>
            <p>Sign up with your email address to receive updates, expert plays & more.</p>
            <div className="footer-inputs">
              <div className="name-fields">
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
              </div>
              <input type="email" placeholder="Email ID" className="full-width" />
              <button className="signup-btn">SIGN UP</button>
            </div>
        </div>
        </div>
        {/* Disclaimer */}
        <p className="footer-disclaimer">
          <b>Disclaimer:</b> The handicapping and odds information (both sports and entertainment) found on BettorCenter.com are strictly for entertainment purposes. 
          Furthermore, the unique odds we produce in select news articles are also for amusement, and are not available to be wagered on...
        </p>

        {/* Bottom Section */}
        <div className="footer-bottom row">
          <div className="col-md-6">
            <p>Support@bettorcenter.com</p>
          </div>
          <div className="col-md-6 footer-links text-md-end">
            <a href="/">Privacy Policy</a>
            <a href="/">Returns Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
