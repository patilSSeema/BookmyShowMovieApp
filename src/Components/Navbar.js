import React, { useRef } from "react";
import { MdFavorite } from "react-icons/md";
import { FaBars, FaTimes, FaUserAlt } from "react-icons/fa";
import Button from "@mui/material/Button";
import "./Navbar.css";
import { auth } from "../firebase";
import { Link, Navigate } from "react-router-dom";

const Navbar = (props) => {
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  return (
    <header>
      <Link to="/">
        <div className="logo">
          <img src="./bookmyshow-logo.svg"></img>
        </div>
      </Link>
      <nav ref={navRef}>
        <div className="main-nav">
          <Link to="/search">
            <div className="input-sty" clickable>
              <input type="text" placeholder="Search Movie" />
              <Button variant="contained">Search</Button>
            </div>
          </Link>
          <Link style={{ margin: "30px" }} to="/wishlist">
            <MdFavorite color="white" size={32} />
          </Link>

          {auth.currentUser ? (
            <Navigate to="/" />
          ) : (
            <Link to="/login">
              <FaUserAlt color="white" />
            </Link>
          )}

          <p> {props.name}</p>
          {auth.currentUser ? <button>Logout</button> : ""}
          <button className="nav-btn nav-btn-close" onClick={showNavbar}>
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

export default Navbar;
