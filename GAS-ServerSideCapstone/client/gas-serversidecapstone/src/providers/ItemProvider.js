import React, { useState, useContext } from "react";
import { UserContext } from "../providers/UserProvider";

export const ItemContext = React.createContext();

export const ItemProvider = (props) => {
  const apiUrl = "/api/item";
  const [items, setItems] = useState([]);

  const { getToken } = useContext(UserContext);

  const getAllItems = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setItems)
    );

  const getAllNotForSale = () =>
    getToken().then((token) =>
      fetch(`${apiUrl}/getallnotforsale`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setItems)
    );

  const getItemById = (id) =>
    getToken().then((token) =>
      fetch(`/api/item/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    );

  const addItem = (item) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((resp) => {
          return resp.json();
        })
        .then(getItemsByUser)
    );

  const getItemsByUser = () => {
    getToken().then((token) =>
      fetch(`${apiUrl}/getbyuser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setItems)
    );
  };

  const updateItem = (item) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/${item.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then(getItemById(item.id))
        .then(getItemsByUser)
    );

  const deleteItem = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(getItemsByUser)
    );
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        getAllItems,
        getItemsByUser,
        getItemById,
        addItem,
        updateItem,
        deleteItem,
        getAllNotForSale,
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};
