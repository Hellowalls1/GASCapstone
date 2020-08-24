import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

import { ItemContext } from "../../providers/ItemProvider";

const itemDetails = () => {
  const { getItemById } = useContext(ItemContext);
  const [theItem, setTheItem] = useState({});

  //use effect that gets the item by id and then sets the state of item on render to be used below
  useEffect(() => {
    getItemById(parseInt(id)).then(setTheItem);
  }, []);

  return (
    <>
      <Card className="comment-top">
        <CardImg src={theItem.imageUrl} alt="comment-iamge" />
        <div className="comment-top">
          <p className="comment-item-title">{theItem.title}</p>
          <p className="comment-item-price">Price: ${theItem.salePrice}</p>
        </div>
      </Card>
    </>
  );
};
export default itemDetails;
