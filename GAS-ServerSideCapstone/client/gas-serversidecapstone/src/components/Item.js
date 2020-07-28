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
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDelete = () => {
    setDeleteModal(!deleteModal);
  };
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
            {item.isForSale === true
              ? `Yes. It costs $${item.salePrice}`
              : "Item is not for sale"}
            {/* 
            {(() => {
              switch (item.isForSale) {
                case "false":
                  return "Item is not for sale";
                case "true":
                  return "Item is  for sale";
                default:
                  return "Item is not for sale";
              }
            })()} */}
          </p>
        </CardBody>
        <Button onClick={toggleDelete}>Delete</Button>
      </Card>

      <Modal isOpen={deleteModal} toggle={toggleDelete}>
        <ModalBody>
          <div className="form-group">
            <h3>Are you sure you want to delete this "{item.title}"?</h3>
            <div className="">
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={(e) => {
                  e.preventDefault();
                  deleteItem(item.id);
                  {
                    toggleDelete();
                  }
                }}
                className="btn mt-4"
              >
                Yes
              </Button>
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={toggleDelete}
              >
                No
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Item;
