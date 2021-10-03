import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomeComponent from "./components/home.jsx";
import LandingComponent from "./components/landing.jsx";
import LoginComponent from "./components/login.jsx";
import NewTransactionComponent from "./components/NewTransaction.jsx";
import RegisterComponent from "./components/register.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={LandingComponent} />
      <Route path="/login" exact component={LoginComponent} />
      <Route path="/register" exact component={RegisterComponent} />
      <Route path="/home" exact component={HomeComponent} />
      <Route
        path="/home/transaction/new"
        exact
        component={NewTransactionComponent}
      />
    </BrowserRouter>
  );
}
