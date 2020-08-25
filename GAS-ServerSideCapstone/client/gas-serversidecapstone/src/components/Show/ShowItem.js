import React, { useContext, useEffect } from "react";
import {
  Card,
  CardImg,
  CardBody,
  Button,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";

const showItem = ({ item }) => {
  return (
    <>
      <Card className="m-4">
        <CardImg top width="100%" src={item.imageUrl} alt="Card image cap" />
        <CardBody>
          <CardTitle>{item.title}</CardTitle>
          <CardSubtitle>
            Owner: {item.user?.firstName} {item.user.lastName}
          </CardSubtitle>
          {/* <p>Category: {item.category.title}</p>
          <p>{showItem.description}</p> */}
        </CardBody>
        <Link
          to={`/getAllNotForSale/${item.id}`}
          type="button"
          class="btn btn-primary"
          value="Item Details"
          size="sm"
        >
          Item details
        </Link>
      </Card>
    </>
  );
};

export default showItem;
