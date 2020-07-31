import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";
import SellItem from "./SellItem";
import { ItemContext } from "../../providers/ItemProvider";

const SellItemList = ({ showItem }) => {
  const { getIfForSale } = useContext(ItemContext);
  const { categories, getAllCategories } = useContext(CategoryContext);
  const [saleItems, setSaleItems] = useState([]);

  useEffect(() => {
    getIfForSale().then(setSaleItems);
  }, []);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="cards-column">
            {saleItems.map((item) => (
              <SellItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SellItemList;
