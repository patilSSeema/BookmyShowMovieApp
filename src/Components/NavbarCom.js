import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import "./Navbar.css";
import { auth } from "../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { FaBars, FaTimes, FaUserAlt } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

const NavbarCom = (props) => {
  const navRef = useRef();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navigate = useNavigate();
  //signout
  const handleSignOut = async () => {
    try {
      await auth.signOut(); // Sign out the user
      navigate.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const showNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNavbar = () => {
    setIsNavOpen(false);
  };

  return (
    <header>
      <Link to="/">
        <div className="logo">
          <img src="./bookmyshow-logo.svg" alt="BookMyShow Logo" />
        </div>
      </Link>
      <nav ref={navRef} className={isNavOpen ? "responsive_nav" : ""}>
        <div className="main-nav">
          <Link to="/search" className="link">
            <div className="input-stye nav-items">
              <input type="text" placeholder="Search Movie" />
              <Button variant="contained">Search</Button>
            </div>
            <span className="nav-text">Search</span>
          </Link>

          <Link className="link" to="/wishlist">
            <MdFavorite className="nav-items" color="white" size={32} />
            <span className="nav-text">Wishlist</span>
          </Link>

          {auth.currentUser ? (
            <Navigate to="/" />
          ) : (
            <Link className="link" to="/login">
              <FaUserAlt className="nav-items" size={28} color="white" />
              <span className="nav-text">Login</span>
            </Link>
          )}

          {props.name && <p> {props.name}</p>}
          {auth.currentUser && (
            <button className="logout-style" onClick={handleSignOut}>
              Logout
            </button>
          )}
          <button className="nav-btn nav-btn-close" onClick={closeNavbar}>
            <FaTimes />
          </button>
        </div>
      </nav>

      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};

export default NavbarCom;
