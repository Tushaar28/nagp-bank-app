import React from "react";

export default function BalanceCard({ balance }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div class="card-body">
        <h3 class="card-title">Current Balance</h3>
        <h3 class="card-subtitle mb-2 text-muted">
          <b>Rs {balance}</b>
        </h3>
      </div>
    </div>
  );
}
