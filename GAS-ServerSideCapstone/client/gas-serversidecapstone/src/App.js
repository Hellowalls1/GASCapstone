import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";

// import "./App.css";

function App() {
  return (
    <Router>
      <UserProvider>
        <Header />
        <ApplicationViews />
      </UserProvider>
    </Router>
  );
}

export default App;
