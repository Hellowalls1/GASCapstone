import React, { useState, useContext, useEffect } from "react";
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
import { Link } from "react-router-dom";
import { CategoryContext } from "../providers/CategoryProvider";
import { UserContext } from "../providers/UserProvider";
import { ItemContext } from "../providers/ItemProvider";
import { useHistory } from "react-router-dom";

//using the Card component that comes with reactstrap to organize some of the post details
const Item = ({ item }) => {
  const { deleteItem, updateItem } = useContext(ItemContext);

  return (
    <>
      <Card className="m-4">
        <CardImg top width="100%" src={item.imageUrl} alt="Card image cap" />
        <CardBody>
          <CardTitle>{item.title}</CardTitle>
          <CardSubtitle>
            Posted by: {item.user?.firstName} {item.user.lastName}
          </CardSubtitle>
          <p>Category: {item.category.title}</p>
          <p>{item.description}</p>
          <p>
            {item.IsForSale
              ? `Yes. It costs ${item.SalePrice}`
              : "Item is not for sale"}
          </p>
        </CardBody>
      </Card>
    </>
  );
};

export default Item;
