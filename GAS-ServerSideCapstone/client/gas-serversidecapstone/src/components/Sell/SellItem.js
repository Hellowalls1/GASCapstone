import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
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
import { UserContext } from "../../providers/UserProvider";

//using the Card component that comes with reactstrap to organize some of the post details
const SellItem = ({ item, comments }) => {
  const { id } = useParams();
  const { deleteItem } = useContext(ItemContext);
  const [soldModal, setSoldModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user")).id;

  const toggleSold = () => {
    setSoldModal(!soldModal);
  };
  debugger;
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
          <p>${item.salePrice}</p>
        </CardBody>
        {item.userId === user && <Button onClick={toggleSold}>Sold</Button>}

        <Link
          to={`/comments/${id}`}
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
                  deleteItem(item.id);

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
