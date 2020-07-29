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
import { Link } from "react-router-dom";
import { CategoryContext } from "../providers/CategoryProvider";
import { UserContext } from "../providers/UserProvider";
import { ItemContext } from "../providers/ItemProvider";
import { useHistory } from "react-router-dom";

//using the Card component that comes with reactstrap to organize some of the post details
const Item = ({ item }) => {
  const { deleteItem, updateItem } = useContext(ItemContext);
  const { categories } = useContext(CategoryContext);

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [userId, setUserId] = useState(item.user.id);
  const [categoryId, setCategoryId] = useState(item.category.id);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  // const [isForSale, setIsForSale] = useState(item.isForSale);
  const [salePrice, setSalePrice] = useState(item.salePrice);
  const [imageUrl, setImageUrl] = useState(item.imageUrl);
  const [chosenSale, setChosenSale] = useState();
  const isForSaleId = useRef();

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

  const submitForm = () => {
    updateItem({
      id: item.id,
      // userId: user.id,
      categoryId: parseInt(categoryId),
      title: title,
      description: description,
      imageUrl: imageUrl,
      isForSale: chosenSale,
      salePrice: salePrice,
    });
  };

  const handleChange = () => {
    setChosenSale(isForSaleId.current.value);
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
          </p>
        </CardBody>
        <Button onClick={toggleDelete}>Delete</Button>
        <Button onClick={toggleEdit}>Edit</Button>
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
    </>
  );
};

export default Item;
