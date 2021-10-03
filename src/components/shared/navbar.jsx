import axios from "axios";
import React, { useState, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import BASE_URL from "../../services/api";

const NavbarComponent = (props) => {
  const [user, setUser] = useState(null);
  const linkStyle = { color: "white", marginRight: "20px" };

  useEffect(() => {
    (async () => {
      var url = BASE_URL + "/currentUser";
      var response;
      response = await axios.get(url);
      const userId = response.data.id;
      url = BASE_URL + "/users/" + userId;
      response = await axios.get(url);
      setUser(response.data);
    })();
  }, []);

  return user != null ? (
    <Navbar bg="primary" variant="dark" fixed="top">
      <Navbar.Brand>Welcome {user ? user.id : "Guest"}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/home" style={linkStyle}>
            Dashboard
          </Link>
          <Link to="/home/profile" style={linkStyle}>
            My profile
          </Link>
          <Link to="/home/transaction/new" style={linkStyle}>
            New Transaction
          </Link>
        </Nav>
        <Nav>
          {/* <Link style={linkStyle} onClick={(e) => logout()}>
            Sign Out
          </Link> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  ) : null;
};

export default NavbarComponent;
