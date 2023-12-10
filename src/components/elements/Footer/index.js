import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer px-0 px-lg-3">
      <Container fluid>
        <nav>
          <ul className="footer-menu">
            <li>
              <Link to={'/'} onClick={(e) => e.preventDefault()}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to={'/'} onClick={(e) => e.preventDefault()}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to={'/'} onClick={(e) => e.preventDefault()}>
                About Us
              </Link>
            </li>
          </ul>
          <p className="copyright text-center">
            © {new Date().getFullYear()}{" "}
            <Link to="/">AutoVote</Link>
          </p>
        </nav>
      </Container>
    </footer>
  )
}

export default Footer;
