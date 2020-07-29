import React, { useContext, useEffect, useState, useRef } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";
import SellItem from "./SellItem";
import { ItemContext } from "../../providers/ItemProvider";

const SellItemList = ({ showItem }) => {
  const { items, getIfForSale } = useContext(ItemContext);
  const { categories, getAllCategories } = useContext(CategoryContext);

  useEffect(() => {
    getIfForSale();
  }, []);

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="cards-column">
            {items.map((item) => (
              <SellItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SellItemList;