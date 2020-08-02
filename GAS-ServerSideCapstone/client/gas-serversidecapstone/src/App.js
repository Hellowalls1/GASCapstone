import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import { ItemProvider } from "./providers/ItemProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { CommentProvider } from "./providers/CommentProvider";
import "./App.css";
// import "./App.css";

function App() {
  return (
    <Router>
      <UserProvider>
        <ItemProvider>
          <CategoryProvider>
            <CommentProvider>
              <Header />
              <ApplicationViews />
            </CommentProvider>
          </CategoryProvider>
        </ItemProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
