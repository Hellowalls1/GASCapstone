import React, { useContext, useEffect } from "react";
import { ItemContext } from "../providers/ItemProvider";
import Item from "./Item";

const UserItemList = () => {
  const { items, getItemsByUser } = useContext(ItemContext);

  useEffect(() => {
    getItemsByUser();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {items.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserItemList;
