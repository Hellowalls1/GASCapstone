import React, { useContext, useEffect, useState, useRef } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { ItemContext } from "../providers/ItemProvider";
import { CategoryContext } from "../providers/CategoryProvider";
import Item from "./Item";

const UserItemList = ({ item }) => {
  const { items, addItem, getItemsByUser } = useContext(ItemContext);
  const { categories, getAllCategories } = useContext(CategoryContext);
  const [addGearModal, setAddGearModal] = useState(false);

  const toggleAddGear = () => {
    setAddGearModal(!addGearModal);
  };

  //getting all items by current
  useEffect(() => {
    getItemsByUser();
  }, []);

  //getting all the categories
  useEffect(() => {
    getAllCategories();
  }, []);

  //state to handle edit form
  const [categoryId, setCategoryId] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [isForSale, setIsForSale] = useState();
  const [salePrice, setSalePrice] = useState();
  const [imageUrl, setImageUrl] = useState();

  //setting values to keys for edit form
  const submitForm = () => {
    addItem({
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
      <div className="main">
        <div className="container">
          <div className="addGearButton">
            <Button size="lg" block onClick={toggleAddGear}>
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
              {categories.map((
                c //mapping over all the categories so there are options in dropdown (0 value is "Select a Category")
              ) => (
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
                  evt.preventDefault(); //alerts for fields left null
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
