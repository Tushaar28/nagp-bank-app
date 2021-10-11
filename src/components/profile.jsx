import axios from "axios";
import React, { useState, useEffect } from "react";
import NavbarComponent from "./shared/navbar.jsx";
import BASE_URL from "../services/api";

export default function ProfileComponent(props) {
  const [user, setUser] = useState(null);

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

  return user != null ? (
    <div>
      <NavbarComponent {...props} />
      <div style={{ marginTop: "60px", marginLeft: "100px" }}>
        <form className="g-3 needs-validation">
          <div className="form-group row">
            <label
              htmlFor="account-number"
              className="col-sm-2 col-form-label"
              style={{ marginRight: "20px" }}
            >
              Username
            </label>
            <div className="col-sm-10">
              <input
                style={{
                  width: "50%",
                }}
                type="text"
                className="form-control"
                id="account-number"
                name="accountNumber"
                value={user.id}
                readonly
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="account-number"
              className="col-sm-2 col-form-label"
              style={{ marginRight: "20px" }}
            >
              Account Number
            </label>
            <div className="col-sm-10">
              <input
                style={{
                  width: "50%",
                }}
                type="text"
                className="form-control"
                id="account-number"
                name="accountNumber"
                value={user.accountNumber}
                readonly
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="account-number"
              className="col-sm-2 col-form-label"
              style={{ marginRight: "20px" }}
            >
              Account Type
            </label>
            <div className="col-sm-10">
              <input
                style={{
                  width: "50%",
                }}
                type="text"
                className="form-control"
                id="account-number"
                name="accountNumber"
                value={user.accountType}
                readonly
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="account-number"
              className="col-sm-2 col-form-label"
              style={{ marginRight: "20px" }}
            >
              State
            </label>
            <div className="col-sm-10">
              <input
                style={{
                  width: "50%",
                }}
                type="text"
                className="form-control"
                id="account-number"
                name="accountNumber"
                value={user.state}
                readonly
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="account-number"
              className="col-sm-2 col-form-label"
              style={{ marginRight: "20px" }}
            >
              City
            </label>
            <div className="col-sm-10">
              <input
                style={{
                  width: "50%",
                }}
                type="text"
                className="form-control"
                id="account-number"
                name="accountNumber"
                value={user.city}
                readonly
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <p> Loading data...</p>
  );
}
