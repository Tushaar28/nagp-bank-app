import Paper from "@material-ui/core/Paper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../services/api";

export default function ViewTransactionsComponent(props) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    (async () => {
      var url = BASE_URL + "/currentUser";
      var response;
      response = await axios.get(url);
      const userId = response.data.id;
      url = BASE_URL + "/transactions?_sort=id&_order=desc";
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
      setTransactions(temp);
    })();
  }, []);

  function RowVirtualizerDynamic({ rows }) {
    const parentRef = React.useRef();
    return (
      <>
        <th>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Amount&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp; Date
        </th>
        <div
          ref={parentRef}
          className="List"
          style={{
            height: `100%`,
            width: `100%`,
            overflow: "auto",
          }}
        >
          <div
            style={{
              height: `750px`,
              width: "100%",
              position: "relative",
            }}
          >
            <div
              key={rows}
              ref={rows.measureRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `100px`,
              }}
            >
              {rows.map((data) => {
                return (
                  <table>
                    <tr>
                      <td>
                        {data.map((value) => {
                          return (
                            <td
                              style={{
                                padding: "30px",
                                marginLeft: "50px",
                              }}
                            >
                              {value}
                            </td>
                          );
                        })}
                      </td>
                    </tr>
                  </table>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  return transactions.length === 0 ? (
    <h3>No transactions yet</h3>
  ) : (
    <div>
      <div style={{ marginBottom: "50px", marginLeft: "50px" }}>
        <h2>Your recent transactions</h2>
      </div>
      <Paper>
        <RowVirtualizerDynamic rows={transactions} />
      </Paper>
    </div>
  );
}
