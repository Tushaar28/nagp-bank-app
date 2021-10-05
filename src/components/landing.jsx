import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../services/api";

export default function LandingComponent({ history }) {
  useEffect(() => {
    (async () => {
      var url = BASE_URL + "/currentUser";
      var response;
      try {
        response = await axios.get(url);
        const userId = response.data.id;
        if (userId !== undefined && userId !== null && userId !== "")
          history.replace("/home");
      } catch (error) {}
    })();
  }, []);

  return (
    <div
      classname="row"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="text-center">
        <h1>Welcome to NAGP Bank</h1>
        <br />
        <span>
          <button
            className="btn btn-primary"
            style={{ marginRight: "50px" }}
            onClick={() => history.push("/login")}
          >
            Login
          </button>
          <button
            className="btn btn-success"
            style={{ marginLeft: "50px" }}
            onClick={() => history.push("/register")}
          >
            Register
          </button>
        </span>
      </div>
    </div>
  );
}
