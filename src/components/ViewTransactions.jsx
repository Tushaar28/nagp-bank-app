import Paper from "@material-ui/core/Paper";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import BASE_URL from "../services/api";

export default function ViewTransactionsComponent(props) {
  const [transactions, setTransactions] = useState([]);

  const columns = ["Transaction Type", "Amount", "Date"];

  const options = {
    filterType: "checkbox",
    elevation: 10,
    downloadOptions: {
      filename: "transactions.csv",
      separator: ",",
    },
  };

  useEffect(() => {
    (async () => {
      var url = BASE_URL + "/currentUser";
      var response;
      response = await axios.get(url);
      const userId = response.data.id;
      url = BASE_URL + "/transactions";
      response = await axios.get(url);
      // console.log(response.data);
      var temp = [];
      for (let i = 0; i < response.data.length; i++) {
        let data = response.data[i];
        temp.push([
          data.type,
          data.amount,
          Intl.DateTimeFormat("en-IN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(data.id),
        ]);
      }
      console.log(temp);
      setTransactions(temp);
    })();
  }, []);

  return transactions.length === 0 ? (
    <h3>No transactions yet</h3>
  ) : (
    <div>
      <Paper>
        <MUIDataTable
          title={"Transactions"}
          data={transactions}
          columns={columns}
          options={options}
        />
      </Paper>
    </div>
  );
}
