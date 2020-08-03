import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";
import SellItem from "./SellItem";
import { ItemContext } from "../../providers/ItemProvider";

const SellItemList = () => {
  const { getIfForSale } = useContext(ItemContext);
  const [saleItems, setSaleItems] = useState([]);

  //refreshSellPage function that refreshes state. Passed down to the SellItem.js component  on line 31
  const refreshSellPage = () => {
    getIfForSale().then(setSaleItems);
  };

  //getting all the items that are "forSale" and setting them as state to be mapped over and displayed
  useEffect(() => {
    getIfForSale().then(setSaleItems);
  }, []);

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="cards-column">
              {saleItems.map((item) => (
                <SellItem
                  key={item.id}
                  item={item}
                  refreshSellPage={refreshSellPage} //sending via props to child
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellItemList;
