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
        <div className="row justify-content-center">
          <div className="cards-column">
            <Card className="comment-top">
              <CardImg src={theItem.imageUrl} alt="comment-iamge" />
              <CardBody>
                <div className="item-details-top">
                  <p className="item-details-title">{theItem.title}</p>
                  <p className="item-details-price">
                    Price: ${theItem.salePrice}
                  </p>
                  <p className="item-details-description">
                    {theItem.description}
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemDetails;
