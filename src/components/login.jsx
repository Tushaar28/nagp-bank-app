import axios from "axios";
import React, { useState } from "react";
import BASE_URL from "../services/api";
import { Avatar, Button, TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import LockedOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import NotificationComponent from "./shared/notification.jsx";

export default function LoginComponent({ history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openNotify, setOpenNotify] = useState(false);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("info");
  const [visibility, setVisibility] = useState(false);

  const avatarStyle = {
    backgroundColor: "#1bbd7e",
  };

  const btnStyle = {
    margin: "30px 0",
  };

  const validate = () => {
    return validateUsername() && validatePassword();
  };

  const validateUsername = () => {
    return username.length > 0;
  };

  const validatePassword = () => {
    return password.length >= 6 && password.length <= 15;
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submit = async (event) => {
    event.preventDefault();
    var url = BASE_URL + "/users/" + username;
    var response;
    try {
      response = await axios.get(url);
    } catch (error) {
      setMessage("Something went wrong");
      setNotificationType("error");
      setOpenNotify(true);
    }
    if (response === undefined) {
      setMessage("No user found");
      setNotificationType("error");
      setOpenNotify(true);
    } else if (response.status !== 200 && response.status !== 304) {
      setMessage("No user found");
      setNotificationType("error");
      setOpenNotify(true);
    } else if (password !== response.data["password"]) {
      setMessage("Incorrect password");
      setNotificationType("error");
      setOpenNotify(true);
    } else {
      url = BASE_URL + "/currentUser";
      const body = {
        id: response.data["id"],
      };
      try {
        response = await axios.post(url, body);
      } catch (error) {
        setMessage("Something went wrong");
        setNotificationType("error");
        setOpenNotify(true);
      }
      if (response === undefined) {
        setMessage("Something went wrong");
        setNotificationType("error");
        setOpenNotify(true);
      } else {
        history.replace("/home");
      }
    }
  };

  return (
    <div className="row">
      <form
        style={{
          position: "absolute",
          top: "30%",
          left: "40%",
        }}
        onSubmit={(e) => submit(e)}
      >
        <Grid>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockedOutlinedIcon />
            </Avatar>
            <h2>Login</h2>
          </Grid>
          <span>
            <TextField
              label="Username"
              placeholder="Enter username"
              fullWidth
              required
              errorText={
                !validateUsername() ? "Please enter valid username" : ""
              }
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                validateUsername();
              }}
            />
          </span>
          <br />
          <InputLabel
            style={{
              marginTop: "20px",
            }}
            htmlFor="standard-adornment-password"
          >
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={visibility ? "text" : "password"}
            placeholder="Enter password"
            fullWidth
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword();
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={(e) => {
                    setVisibility(!visibility);
                  }}
                >
                  {visibility ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button
            variant="contained"
            style={btnStyle}
            type="submit"
            color="primary"
            fullWidth
            disabled={!validate()}
          >
            Login
          </Button>
        </Grid>
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
