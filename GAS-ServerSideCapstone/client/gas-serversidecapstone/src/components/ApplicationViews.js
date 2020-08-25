import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import ItemList from "./ItemList";
import Login from "./Login";
import Register from "./Register";
import ShowItemList from "./Show/ShowItemList";
import SellItemList from "./Sell/SellItemList";
import ItemCommentList from "./Sell/ItemCommentList";
import gashome from "./images/gashome.jpg";
import ItemDetails from "./Show/ItemDetails";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? (
            <p>
              <img top width="100%" src={gashome} />
            </p>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/item" exact>
          {isLoggedIn ? <ItemList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/getAllNotForSale" exact>
          {isLoggedIn ? <ShowItemList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/getIfForSale" exact>
          {isLoggedIn ? <SellItemList /> : <Redirect to="/login" />}
        </Route>

        <Route path={`/comments/:id`}>
          {isLoggedIn ? <ItemCommentList /> : <Redirect to="/login" />}
        </Route>

        <Route path={`/getAllNotForSale/:id`}>
          {isLoggedIn ? <ItemDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
}
