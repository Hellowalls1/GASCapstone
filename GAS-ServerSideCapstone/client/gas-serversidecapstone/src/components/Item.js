import React, { useState, useContext, useEffect, useRef } from "react";
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
import "../App.css";

import { CategoryContext } from "../providers/CategoryProvider";
import { ItemContext } from "../providers/ItemProvider";

const Item = ({ item }) => {
  const { deleteItem, updateItem } = useContext(ItemContext);
  const { categories } = useContext(CategoryContext);

  //setting state of the modals
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  // using ref for is for sale
  const isForSaleId = useRef();
  const [salePrice, setSalePrice] = useState(item.salePrice);
  const [imageUrl, setImageUrl] = useState(item.imageUrl);
  const [chosenSale, setChosenSale] = useState();
  const [categoryId, setCategoryId] = useState(item.category.id);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  //setting what the value of the bit dropdown is on initial render
  useEffect(() => {
    setChosenSale(item.isForSale);
  }, []);

  //setting the current value when someone changes the bit (changing the value of the inner ref which is the)

  const toggleDelete = () => {
    setDeleteModal(!deleteModal);
  };

  const toggleEdit = () => {
    setEditModal(!editModal);
  };

  //taking the value for keys from state and ref
  const submitForm = () => {
    updateItem({
      id: item.id,
      categoryId: parseInt(categoryId),
      title: title,
      description: description,
      imageUrl: imageUrl,
      isForSale: chosenSale,
      salePrice: salePrice,
    });
  };

  //setting the value of is for sale whenever it is changed
  const handleChange = () => {
    setChosenSale(isForSaleId.current.value);
  };

  return (
    <>
      <div className="sell-item-container">
        <Card className=" m-4">
          <CardImg top width="100%" src={item.imageUrl} alt="Card image cap" />
          <CardBody>
            <CardTitle className="gear-title">{item.title}</CardTitle>
            <CardSubtitle className="gear-owner">
              <p className="gear-userName">
                {" "}
                Owner: {item.user?.firstName} {item.user.lastName}{" "}
              </p>
            </CardSubtitle>
            <p className="gear-category">Type: {item.category.title}</p>
            <p className="gear-description">{item.description}</p>
            <p className="gear-price">
              {item.isForSale === true
                ? `Price: $${item.salePrice}`
                : "Item not for sale"}
            </p>
          </CardBody>
          <div className="gear-page-buttons">
            <Button className="gear-edit-button" onClick={toggleEdit} size="lg">
              Edit
            </Button>
            <Button
              className="gear-delete-button"
              onClick={toggleDelete}
              size="lg"
            >
              Delete
            </Button>
          </div>
        </Card>
        <Modal isOpen={deleteModal} toggle={toggleDelete}>
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
                    deleteItem(item.id); //when button is clicked deleteItem from the database by it's id
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
        <Modal isOpen={editModal} toggle={toggleEdit}>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="category">Category: </label>
              <select
                id="category"
                onChange={(e) => setCategoryId(e.target.value)}
                required
                autoFocus
                className="form-control mt-4"
                defaultValue={item.categoryId}
              >
                <option key="0" value="0">
                  Select A Category
                </option>
                {categories.map((c) => (
                  <option value={c.id} key={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>

              <label htmlFor="title">Title: </label>
              <input
                type="text"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                required
                autoFocus
                className="form-control mt-4"
                defaultValue={item.title}
              />

              <label htmlFor="description">Description: </label>
              <input
                type="text-area"
                id="content"
                onChange={(e) => setDescription(e.target.value)}
                required
                autoFocus
                className="form-control mt-4"
                defaultValue={item.description}
              />

              <label htmlFor="isForSale">Is Item For Sale? </label>
              <select
                type="select"
                name="select"
                id="isForSale"
                value={chosenSale} //state variable
                onChange={handleChange} //on the change you handle the change update what chosenSale is
                ref={isForSaleId} //current value
                required
                autoFocus
                className="form-control mt-4"
              >
                <option key="0" value="false">
                  No
                </option>
                <option key="1" value="true">
                  Yes
                </option>
                )
              </select>

              <label htmlFor="salePrice">Sale Price: </label>
              <input
                type="text-area"
                id="salePrice"
                onChange={(e) => setSalePrice(e.target.value)}
                required
                autoFocus
                className="form-control mt-4"
                defaultValue={item.salePrice}
              />

              <label htmlFor="imageUrl">Image URL: </label>
              <input
                type="text"
                id="imageUrl"
                onChange={(e) => setImageUrl(e.target.value)}
                autoFocus
                className="form-control mt-4"
                defaultValue={item.imageUrl}
              />

              <div className="">
                <Button
                  type="submit"
                  size="sm"
                  color="info"
                  onClick={(evt) => {
                    evt.preventDefault();
                    if (categoryId === "0") {
                      window.alert("You forgot a category!");
                    } else if (!title) {
                      window.alert("You forgot a title!");
                    } else if (!description) {
                      window.alert("You forgot a description!");
                    } else if (!salePrice) {
                      window.alert("You forgot a sale price!");
                    } else if (!imageUrl) {
                      window.alert("You forgot a image url!");
                    } else {
                      submitForm(item);

                      toggleEdit();
                    }
                  }}
                  className="btn mt-4"
                >
                  Save
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default Item;
