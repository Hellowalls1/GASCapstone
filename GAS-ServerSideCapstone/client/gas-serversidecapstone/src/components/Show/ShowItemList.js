import React, { useContext, useEffect, useState, useRef } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";
import ShowItem from "./ShowItem";
import { ItemContext } from "../../providers/ItemProvider";

const ShowItemList = () => {
  const { items, getAllNotForSale } = useContext(ItemContext);

  //rendering all items were "isForSale" is false
  useEffect(() => {
    getAllNotForSale();
  }, []);

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="cards-column">
              {items.map((item) => (
                <ShowItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowItemList;
