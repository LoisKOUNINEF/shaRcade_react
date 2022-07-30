import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare, FaTwitterSquare, FaLinkedin } from "react-icons/fa";
import { Nav, NavDropdown} from 'react-bootstrap'
import Logo from '../../assets/images/logo/logo.png'
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer-container retro">
            <div className="footer-links">
                <div className="footer-logo-container">
                    <img className="footer-logo" alt='ShaRcade logo' src={Logo} />
                </div>
            </div>
            <div className="footer-dropdowns">
                <Nav className="footer-dropdowns-nav">
                    <NavDropdown title="Games" drop="up" id="connection-nav-dropdown">
                        <NavDropdown.Item href="/about">Submit Game</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </div>
        </footer >
    )
}

export default Footer;
