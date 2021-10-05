import axios from "axios";
import BASE_URL from "../services/api";
import React, { useEffect, useState } from "react";
import NavbarComponent from "./shared/navbar";
import ViewTransactionsComponent from "./ViewTransactions";
import BalanceCard from "./shared/BalanceCard.jsx";

export default function HomeComponent(props) {
  const [user, setUser] = useState(null);

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

  return user !== null ? (
    <div>
      <NavbarComponent {...props} />
      <div
        style={{ marginTop: "80px", marginLeft: "50px", marginRight: "50px" }}
      >
        <div className="row">
          <div className="col-lg-2" style={{ marginTop: "300px" }}>
            <BalanceCard balance={user.balance} {...props} />
          </div>
          <div className="col-lg-10">
            <ViewTransactionsComponent {...props} />
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
