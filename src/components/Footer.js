/**
 * The footer is displayed at the bottom of every page. It contains some
 * basic information and expands when the page content is not long enough.
 */
import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";
import "../styles/Footer.css";
import logo from "../images/logo.png";

function Footer() {
    return (
        <footer className="text-div" id="footer-div">
            <img className="logo" src={logo} alt="logo" />
            <div className="left-half">
                Alexander Wu
                <br />
                Let there be light.
            </div>
            <div className="right-half">
                <Link to="/contact">Contact me</Link>
            </div>
        </footer>
    );
}

export default Footer;
