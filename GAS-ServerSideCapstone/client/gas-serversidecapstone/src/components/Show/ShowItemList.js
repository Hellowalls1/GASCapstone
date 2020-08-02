import React, { useContext, useEffect, useState, useRef } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";
import ShowItem from "./ShowItem";
import { ItemContext } from "../../providers/ItemProvider";

const ShowItemList = ({ showItem }) => {
  const { items, getAllNotForSale } = useContext(ItemContext);
  const { categories, getAllCategories } = useContext(CategoryContext);

  useEffect(() => {
    getAllNotForSale();
  }, []);

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div className="main">
        <div className="row justify-content-center">
          <div className="cards-column">
            {items.map((item) => (
              <ShowItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowItemList;
