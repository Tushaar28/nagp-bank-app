import axios from "axios";
import React, { useState, useEffect } from "react";
import NavbarComponent from "./shared/navbar.jsx";
import TransactionForm from "./TransactionForm.jsx";
import BASE_URL from "../services/api";

export default function NewTransactionComponent(props) {
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
      <TransactionForm user={user} {...props} />
    </div>
  ) : null;
}
