import axios from "axios";
import React, { useState, useEffect } from "react";
import NavbarComponent from "./shared/navbar.jsx";
import TransactionForm from "./TransactionForm.jsx";
import BASE_URL from "../services/api";

export default function NewTransactionComponent(props) {
  const [user, setUser] = useState(null);

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
    <div>
      <NavbarComponent {...props} />
      <TransactionForm user={user} {...props} />
    </div>
  ) : null;
}
