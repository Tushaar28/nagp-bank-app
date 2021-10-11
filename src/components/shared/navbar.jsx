import axios from "axios";
import React, { useState, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import BASE_URL from "../../services/api";
import NotificationComponent from "./notification.jsx";

const NavbarComponent = (props) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("info");
  const [openNotify, setOpenNotify] = useState(false);
  const linkStyle = { color: "white", marginRight: "20px" };

  useEffect(() => {
    (async () => {
      var url = BASE_URL + "/currentUser/1";
      var response;
      response = await axios.get(url);
      const userId = response.data.user;
      if (userId === undefined || userId === null || userId === "")
        props.history.replace("/login");
      url = BASE_URL + "/users/" + userId;
      response = await axios.get(url);
      setUser(response.data);
    })();
  }, []);

  const logout = async (e) => {
    const url = BASE_URL + "/currentUser/1";
    var response;
    try {
      response = await axios.delete(url);
      window.location.href = "/login";
    } catch (error) {
      // alert(error.toString());
      setMessage("Something went wrong");
      setNotificationType("error");
      setOpenNotify(true);
      window.location.href = "/login";
    }
  };

  return user != null ? (
    <>
      <Navbar bg="primary" variant="dark" fixed="top">
        <Navbar.Brand>Welcome {user ? user.id : "Guest"}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/home" style={linkStyle}>
              Dashboard
            </Link>
            <Link to="/home/transaction/new" style={linkStyle}>
              New Transaction
            </Link>
            <Link to="/home/profile" style={linkStyle}>
              My profile
            </Link>
          </Nav>
          <Nav>
            <Link style={linkStyle} onClick={(e) => logout(e)}>
              Sign Out
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <NotificationComponent
        openNotify={openNotify}
        setOpenNotify={setOpenNotify}
        message={message}
        notificationType={notificationType}
      />
    </>
  ) : null;
};

export default NavbarComponent;
