import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardImg,
  CardBody,
  Button,
  Modal,
  CardTitle,
  CardSubtitle,
  ModalBody,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";

import { ItemContext } from "../../providers/ItemProvider";

const ItemDetails = () => {
  const { getItemById } = useContext(ItemContext);
  const [theItem, setTheItem] = useState({});
  const { id } = useParams();

  //use effect that gets the item by id and then sets the state of item on render to be used below
  useEffect(() => {
    getItemById(parseInt(id)).then(setTheItem);
  }, []);

  return (
    <>
      <div className="item-details">
        <Card className="comment-top">
          <CardImg src={theItem.imageUrl} alt="comment-iamge" />
          <div className="comment-top">
            <p className="comment-item-title">{theItem.title}</p>
            <p className="comment-item-price">Price: ${theItem.salePrice}</p>
          </div>
        </Card>
      </div>
    </>
  );
};
export default ItemDetails;
