/** @format */

import "./Navbar.css";
import codelogo from "../src/assets/codelogo.png";
import { Link } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";

export default function Navbar() {
  const [toggleNav, setToggleNav] = useState(false);

  // Toggling the mobile-navbar
  const handleToggleMenu = () => {
    setToggleNav(!toggleNav);
  };

  // Removing the mobile-navbar when a link is clicked
  const handleClicks = () => {
    setToggleNav(false);
  };

  return (
    <div className="navbar">
      <div className="layer-two">
        <div className="company-logo">
          <img src={codelogo} alt="codecraft Logo" width="50px" height="50px" />
        </div>
        <div className={toggleNav ? "mobile-navbar-links" : "navbar-links"}>
          <ul>
            <li>
              <Link to="/" className="nav-link" onClick={handleClicks}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link" onClick={handleClicks}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/events" className="nav-link " onClick={handleClicks}>
                T&C's
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="nav-link" onClick={handleClicks}>
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <button onClick={handleToggleMenu} className="show-nav-btn">
          {toggleNav ? (
            <CancelIcon className="cancel-nav" />
          ) : (
            <i className="fa-solid fa-bars"></i>
          )}
        </button>
      </div>
    </div>
  );
}
