import axios from "axios";
import React, { useState, useEffect } from "react";
import BASE_URL from "../services/api";
import NotificationComponent from "./shared/notification.jsx";

export default function RegisterComponent({ history }) {
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [availableAccountTypes, setAvailableAccountTypes] = useState([]);
  const [state, setState] = useState("");
  const [availableStates, setAvailableStates] = useState([]);
  const [city, setCity] = useState("");
  const [availableCities, setAvailableCities] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("info");
  const [openNotify, setOpenNotify] = useState(false);

  useEffect(() => {
    (async () => {
      const url = BASE_URL + "/states";
      var response;
      try {
        response = await axios.get(url);
      } catch (error) {
        setMessage("Something went wrong");
        setNotificationType("error");
        setOpenNotify(true);
      }
      var temp = [];
      for (let i = 0; i < response.data.length; i++) {
        temp.push(response.data[i]["name"]);
      }
      setAvailableStates(temp);
    })();

    (async () => {
      const url = BASE_URL + "/accountTypes";
      var response;
      try {
        response = await axios.get(url);
      } catch (error) {
        setMessage("Something went wrong");
        setNotificationType("error");
        setOpenNotify(true);
      }
      var temp = [];
      for (let i = 0; i < response.data.length; i++) {
        temp.push(response.data[i]["type"]);
      }
      setAvailableAccountTypes(temp);
    })();
  }, []);

  const fetchCities = async (state) => {
    const url = BASE_URL + "/cities/" + state;
    var response;
    try {
      response = await axios.get(url);
    } catch (error) {
      setMessage("Something went wrong");
      setNotificationType("error");
      setOpenNotify(true);
    }
    const cities = response.data["name"];
    var temp = [];
    for (let i = 0; i < cities.length; i++) {
      temp.push(cities[i]);
    }
    if (temp.length === 1) setCity(temp[0]);
    setAvailableCities(temp);
  };

  const register = async (e) => {
    e.preventDefault();
    if (password.trim() !== confirmPassword.trim()) {
      setMessage("Passwords do not match");
      setNotificationType("error");
      setOpenNotify(true);
    } else {
      const url = BASE_URL + "/users";
      const body = {
        id: username,
        date: date,
        accountNumber: accountNumber,
        accountType: accountType,
        state: state,
        city: city,
        password: password,
        balance: 0,
      };
      var response;
      try {
        response = await axios.post(url, body);
      } catch (e) {
        setMessage("Something went wrong");
        setNotificationType("error");
        setOpenNotify(true);
      }

      setMessage("Registration complete");
      setNotificationType("success");
      setOpenNotify(true);
      setTimeout(function () {
        history.replace("/login");
      }, 2000);
    }
  };

  return (
    <div style={{ marginLeft: "100px", marginTop: "30px" }}>
      <h1>Registration Form</h1>
      <form
        style={{
          marginTop: "50px",
        }}
        className="g-3 needs-validation"
      >
        <div className="form-group row">
          <label
            htmlFor="username"
            className="col-sm-2 form-label"
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
              id="username"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="date"
            className="col-sm-2 col-form-label"
            style={{ marginRight: "20px" }}
          >
            Date of birth
          </label>
          <div className="col-sm-10">
            <input
              style={{
                width: "50%",
              }}
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="valid-feedback">Looks good!</div>
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
              placeholder="Enter account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
              minLength="10"
              maxLength="15"
            />
          </div>
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="account-type"
            className="col-sm-2 col-form-label"
            style={{ marginRight: "20px" }}
          >
            Account Type
          </label>
          <div className="col-sm-10">
            <select
              style={{
                width: "50%",
              }}
              className="form-control"
              id="account-type"
              name="accountType"
              placeholder="Choose State"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              required
            >
              <option selected disabled value="">
                Choose account type
              </option>
              {availableAccountTypes.map((type) => {
                return (
                  <option key={type} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>
          <div class="invalid-feedback">
            Please select a valid account type.
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="state"
            className="col-sm-2 col-form-label"
            style={{ marginRight: "20px" }}
          >
            State
          </label>
          <div className="col-sm-10">
            <select
              style={{
                width: "50%",
              }}
              className="form-control"
              id="state"
              placeholder="Choose State"
              name="state"
              value={state}
              onChange={(e) => {
                fetchCities(e.target.value);
                setState(e.target.value);
              }}
              required
            >
              <option selected disabled value="">
                Choose state
              </option>
              {availableStates.map((state) => {
                return (
                  <option key={state} value={state}>
                    {state}
                  </option>
                );
              })}
            </select>
          </div>
          <div class="invalid-feedback">Please select a valid state.</div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="city"
            className="col-sm-2 col-form-label"
            style={{ marginRight: "20px" }}
          >
            City
          </label>
          <div className="col-sm-10">
            <select
              style={{
                width: "50%",
              }}
              className="form-control"
              id="city"
              placeholder="Choose City"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            >
              <option selected disabled value="">
                Choose city
              </option>
              {availableCities.map((city) => {
                return (
                  <option key={city} value={city}>
                    {city}
                  </option>
                );
              })}
            </select>
          </div>
          <div class="invalid-feedback">Please select a valid city.</div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="password"
            className="col-sm-2 col-form-label"
            style={{ marginRight: "20px" }}
          >
            Password (between 6-15 characters)
          </label>
          <div className="col-sm-10">
            <input
              style={{
                width: "50%",
              }}
              className="form-control"
              id="password"
              type={passwordVisibility ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              maxLength="15"
            />
          </div>
          <div class="invalid-feedback">Please enter valid password.</div>
        </div>
        <input
          type="checkbox"
          onClick={(e) => setPasswordVisibility(!passwordVisibility)}
        />
        Show Password
        <div className="form-group row" style={{ marginTop: "10px" }}>
          <label
            htmlFor="confirm-password"
            className="col-sm-2 col-form-label"
            style={{ marginRight: "20px" }}
          >
            Confirm Password
          </label>
          <div className="col-sm-10">
            <input
              style={{
                width: "50%",
              }}
              className="form-control"
              id="confirm-password"
              type={confirmPasswordVisibility ? "text" : "password"}
              placeholder="Enter password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength="6"
              maxLength="15"
            />
          </div>
          <div class="invalid-feedback">Please enter valid password.</div>
        </div>
        <input
          type="checkbox"
          onClick={(e) =>
            setConfirmPasswordVisibility(!confirmPasswordVisibility)
          }
        />
        Show Password
        <div class="col-12" style={{ marginTop: "50px" }}>
          <button
            class="btn btn-primary btn-lg"
            type="submit"
            onClick={(e) => {
              register(e);
            }}
          >
            Submit form
          </button>
        </div>
      </form>
      <NotificationComponent
        openNotify={openNotify}
        setOpenNotify={setOpenNotify}
        message={message}
        notificationType={notificationType}
      />
    </div>
  );
}
