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

//using the Card component that comes with reactstrap to organize some of the post details
const SellItem = ({ refreshSellPage, item }) => {
  const { deleteItem } = useContext(ItemContext);
  const [soldModal, setSoldModal] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user")).id;

  const toggleSold = () => {
    setSoldModal(!soldModal);
  };

  //this module only loads the sold button to the active users items
  return (
    <>
      <Card className="m-4">
        <CardImg top width="100%" src={item.imageUrl} alt="Card image cap" />
        <CardBody>
          <CardTitle>{item.title}</CardTitle>
          <p className="sell-name">
            Posted by: {item.user?.firstName} {item.user.lastName}
          </p>

          <p className="sell-title">Category: {item.category.title}</p>
          <p className="sell-description">{item.description}</p>
          <p className="sell-price">${item.salePrice}</p>
        </CardBody>
        {item.userId === user && <Button onClick={toggleSold}>Sold</Button>}

        <Link
          to={`/comments/${item.id}`}
          type="button"
          class="btn btn-info"
          value="Barter"
          size="sm"
        >
          Barter
        </Link>
      </Card>
      <Modal isOpen={soldModal} toggle={toggleSold}>
        <ModalBody>
          <div className="form-group">
            <h3>Are you sure you want to sell "{item.title}"?</h3>
            <div className="">
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={(e) => {
                  e.preventDefault();

                  deleteItem(item.id) //deleting item by id
                    .then(refreshSellPage); //function passed down in props that refreshes the state of the sellPage before the toggle so that page re renders
                  {
                    toggleSold();
                  }
                }}
                className="btn mt-4"
              >
                Yes
              </Button>
              <Button type="submit" size="sm" color="info" onClick={toggleSold}>
                No
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default SellItem;
