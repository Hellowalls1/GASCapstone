import React, { useState, useContext, useEffect } from "react";
import { Card, CardImg, CardBody, Button, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import { CategoryContext } from "../providers/CategoryProvider";
import { UserContext } from "../providers/UserProvider";
import { useHistory } from "react-router-dom";

//using the Card component that comes with reactstrap to organize some of the post details
const Item = ({ item }) => {
  const history = useHistory();

  const { categories, getAllCategories } = useContext(CategoryContext);
  const { user } = useContext(UserContext);
  const { deleteItem } = useContext(ItemContext);
  const theUser = JSON.parse(user);

  useEffect(() => {
    getAllCategories();
  }, []);

  const { updateItem } = useContext(ItemContext);

  const [userId, setUserId] = useState(item.user.id);
  const [categoryId, setCategoryId] = useState(item.category.id);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [isForSale, setIsForSale] = useState(item.isForSale);
  const [salePrice, setSalePrice] = useState(item.salePrice);
  const [imageUrl, setImageUrl] = useState(item.imageUrl);

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const toggleEdit = () => {
    setEditModal(!editModal);
  };

  const toggleDelete = () => {
    setDeleteModal(!deleteModal);
  };

  const submitForm = () => {
    updateItem({
      id: post.id,
      userId: parseInt(userId),
      categoryId: parseInt(categoryId),
      title: title,
      description: diescription,
      imageUrl: imageUrl,
      isForSale: isForSale,
      salePrice: salePrice,
    }).then(() => history.push(`/item/${item.id}`));
  };

  return (
    <>
      <Card className="m-4">
        <CardImage top width="100%" src={item.imageUrl} alt="Card image cap" />
        <CardBody>
          <CardTitle>{item.title}</CardTitle>
          <CardSubtitle>
            Posted by: {item.user.firstname} {item.user.lastName}
          </CardSubtitle>
          <p>Category: {item.category}</p>
          <p>{item.description}</p>
          <p>This item is {item.isForSale} sale.</p>
        </CardBody>
        {post.userProfileId === theUserProfile.id && (
          <Button onClick={toggleEdit}>Edit</Button>
        )}
        {post.userProfileId === theUserProfile.id && (
          <Button onClick={toggleDelete}>Delete</Button>
        )}
      </Card>

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
              defaultValue={item.category.id}
            >
              <option key="0" value="0">
                Select A Category
              </option>
              {categories.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.name}
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

            <label htmlFor="content">Description: </label>
            <input
              type="text-area"
              id="content"
              onChange={(e) => setDescription(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={item.content}
            />

            <select
              id="isForSale"
              onChange={(e) => setIsForSale(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={item.isForSale.id}
            >
              <option key="0" value="0">
                No
              </option>
              <option value="1" key="1">
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
                    submitForm(post);
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

      <Modal isOpen={deleteModal} toggle={toggleDelete}>
        <ModalBody>
          <div className="form-group">
            <h3>Do you want to delete the item "{item.title}"?</h3>
            <div className="">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  deleteItem(item.id).then(() => {
                    toggleDelete();
                  });
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

export default Post;
