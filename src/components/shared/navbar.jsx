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
  const { history } = props;

  useEffect(() => {
    (async () => {
      var url = BASE_URL + "/currentUser";
      var response;
      response = await axios.get(url);
      const userId = response.data.id;
      if (userId === undefined || userId === null || userId === "")
        props.history.replace("/login");
      url = BASE_URL + "/users/" + userId;
      response = await axios.get(url);
      setUser(response.data);
    })();
  }, []);

  const logout = async (e) => {
    const url = BASE_URL + "/currentUser/" + user.id;
    var response;
    try {
      response = await axios.delete(url);
      history.replace("/login");
    } catch (error) {
      setMessage("Something went wrong");
      setNotificationType("error");
      setOpenNotify(true);
      history.replace("/login");
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
            <Link to="/home/profile" style={linkStyle}>
              My profile
            </Link>
            <Link to="/home/transaction/new" style={linkStyle}>
              New Transaction
            </Link>
          </Nav>
          {/* <Nav>
            <Link style={linkStyle} onClick={(e) => logout(e)}>
              Sign Out
            </Link>
          </Nav> */}
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
