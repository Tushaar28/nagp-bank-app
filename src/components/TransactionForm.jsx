import axios from "axios";
import BASE_URL from "../services/api";
import NotificationComponent from "./shared/notification.jsx";
import React, { useState, useEffect } from "react";

export default function TransactionForm({ user, history }) {
  const [transactionType, setTransactionType] = useState("");
  const [availableTransactionTypes, setAvailableTransactionTypes] = useState(
    []
  );
  const [amount, setAmount] = useState(null);
  const [balance, setBalance] = useState(user.balance);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("info");
  const [openNotify, setOpenNotify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      const url = BASE_URL + "/transactionTypes";
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
      setAvailableTransactionTypes(temp);
    })();
  }, []);

  const submit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      transactionType.toLowerCase() === "withdrawl" &&
      Number(amount) > Number(balance)
    ) {
      setMessage("Insufficient balance");
      setNotificationType("error");
      setOpenNotify(true);
      setLoading(false);
    } else if (
      transactionType.toLowerCase() === "withdrawl" &&
      Number(amount) < 10000
    ) {
      setMessage("Withdrawl amount cannot be less than Rs 10,000");
      setNotificationType("error");
      setOpenNotify(true);
      setLoading(false);
    } else {
      var url = BASE_URL + "/transactions";
      const body = {
        id: Date.now(),
        userId: user.id,
        type: transactionType,
        amount: Number(amount),
      };
      var response;
      try {
        response = await axios.post(url, body);
      } catch (error) {
        setMessage("Something went wrong");
        setNotificationType("error");
        setOpenNotify(true);
        setLoading(false);
      }
      if (response === undefined) {
        setMessage("Something went wrong");
        setNotificationType("error");
        setOpenNotify(true);
        setLoading(false);
      } else {
        url = BASE_URL + "/users/" + user.id;
        let newBalance =
          transactionType.toLowerCase() === "withdrawl"
            ? Number(user.balance - Number(amount))
            : Number(user.balance + Number(amount));
        const body = {
          ...user,
          balance: newBalance,
        };
        try {
          response = await axios.put(url, body);
        } catch (error) {
          setMessage("Something went wrong");
          setNotificationType("error");
          setOpenNotify(true);
          setLoading(false);
        }
        if (response === undefined) {
          setMessage("Something went wrong");
          setNotificationType("error");
          setOpenNotify(true);
          setLoading(false);
        } else {
          setLoading(false);
          setSuccess(true);
          setMessage("Transaction complete");
          setNotificationType("success");
          setOpenNotify(true);
          setTimeout(function () {
            history.replace("/home");
          }, 2000);
        }
      }
    }
  };

  return (
    <div style={{ marginTop: "60px", marginLeft: "100px" }}>
      <h1>New Transaction</h1>
      <form
        style={{
          marginTop: "50px",
        }}
        className="g-3 needs-validation"
      >
        <div className="form-group row">
          <label
            htmlFor="account-type"
            className="col-sm-2 col-form-label"
            style={{ marginRight: "20px" }}
          >
            Transaction Type
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
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              required
            >
              <option selected disabled value="">
                Choose account type
              </option>
              {availableTransactionTypes.map((type) => {
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
            htmlFor="account-number"
            className="col-sm-2 col-form-label"
            style={{ marginRight: "20px" }}
          >
            Current Balance
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
              value={balance}
              readonly
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
            Transaction Amount
          </label>
          <div className="col-sm-10">
            <input
              style={{
                width: "50%",
              }}
              type="number"
              className="form-control"
              id="account-number"
              name="accountNumber"
              placeholder="Enter transaction amount in Rupees"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div class="col-12" style={{ marginTop: "50px" }}>
          {!success && (
            <button
              disabled={loading}
              class="btn btn-primary btn-lg"
              type="submit"
              onClick={(e) => submit(e)}
            >
              {loading ? "Transaction in progress" : "Submit"}
            </button>
          )}
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
