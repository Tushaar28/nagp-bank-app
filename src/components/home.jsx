import axios from "axios";
import BASE_URL from "../services/api";
import React, { useEffect, useState } from "react";
import NavbarComponent from "./shared/navbar";

export default function HomeComponent(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      var url = BASE_URL + "/currentUser";
      var response;
      response = await axios.get(url);
      const userId = response.data.id;
      url = BASE_URL + "/users/" + userId;
      response = await axios.get(url);
      console.log(response.data);
      setUser(response.data);
    })();
  }, []);

  return user !== null ? (
    <div>
      <NavbarComponent {...props} />
    </div>
  ) : null;
}
