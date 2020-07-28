import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { ItemContext } from "../providers/ItemProvider";
import { CategoryContext } from "../providers/CategoryProvider";
import { UserContext } from "../providers/UserProvider";
import Item from "./Item";

const UserItemList = ({ item }) => {
  const { items, addItem, getItemsByUser } = useContext(ItemContext);
  const { categories, getAllCategories } = useContext(CategoryContext);
  const { user, getUser } = useContext(UserContext);
  const [addGearModal, setAddGearModal] = useState(false);

  const toggleAddGear = () => {
    setAddGearModal(!addGearModal);
  };

  // useEffect(() => {
  //   getUser();
  // }, []);

  useEffect(() => {
    getItemsByUser();
  }, []);

  useEffect(() => {
    getAllCategories();
  }, []);

  const [categoryId, setCategoryId] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [isForSale, setIsForSale] = useState();
  const [salePrice, setSalePrice] = useState();
  const [imageUrl, setImageUrl] = useState();

  const submitForm = () => {
    addItem({
      // userId: user.id,
      categoryId: parseInt(categoryId),
      title: title,
      description: description,
      imageUrl: imageUrl,
      isForSale: isForSale,
      salePrice: salePrice,
    });
  };

  return (
    <>
      <div className="container">
        <div className="addGearButton">
          <Button size="lg" onClick={toggleAddGear}>
            Add Gear
          </Button>
        </div>
        <div className="row justify-content-center">
          <div className="cards-column">
            {items.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={addGearModal} toggle={toggleAddGear}>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="category">Category: </label>
            <select
              id="category"
              onChange={(e) => setCategoryId(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
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
            />

            <label htmlFor="description">Description: </label>
            <input
              type="text-area"
              id="content"
              onChange={(e) => setDescription(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
            />

            <label htmlFor="isForSale">Is Item For Sale? </label>
            <select
              id="isForSale"
              onChange={(e) => setIsForSale(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
            >
              <option key="0" value="0">
                No
              </option>
              <option key="1" value="1">
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
            />

            <label htmlFor="imageUrl">Image URL: </label>
            <input
              type="text"
              id="imageUrl"
              onChange={(e) => setImageUrl(e.target.value)}
              autoFocus
              className="form-control mt-4"
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

                    toggleAddGear();
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

export default UserItemList;
