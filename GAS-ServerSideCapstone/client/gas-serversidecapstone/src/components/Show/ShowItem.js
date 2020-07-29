import React, { useContext, useEffect } from "react";
import {
  Card,
  CardImg,
  CardBody,
  Button,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

const showItem = ({ item }) => {
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
          <p>{showItem.description}</p>
        </CardBody>
      </Card>
    </>
  );
};

export default showItem;
