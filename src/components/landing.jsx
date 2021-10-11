import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../services/api";

export default function LandingComponent({ history }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      var url = BASE_URL + "/currentUser/1";
      var response;
      try {
        response = await axios.get(url);
        const userId = response.data.user;
        if (userId !== undefined && userId !== null && userId !== "")
          history.replace("/home");
      } catch (error) {
        console.log("error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return loading ? (
    <div style={{ marginLeft: "800px", marginTop: "400px" }}>Loading...</div>
  ) : (
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
