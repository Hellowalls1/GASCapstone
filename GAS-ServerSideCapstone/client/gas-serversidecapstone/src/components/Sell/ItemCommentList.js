import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalBody, Card, CardImg } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import Comment from "./ItemComment";
import { CommentContext } from "../../providers/CommentProvider";
import { ItemContext } from "../../providers/ItemProvider";

const ItemCommentList = () => {
  const { comments, getCommentsByItemId, comment, addComment } = useContext(
    CommentContext
  );
  const { getItemById } = useContext(ItemContext);

  const [theItem, setTheItem] = useState({});
  const [addCommentModal, setAddCommentModal] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user")).id;
  const [commentTitle, setCommentTitle] = useState();
  const [commentDescription, setCommentDescription] = useState();

  const { id } = useParams();

  const toggleAddCommentModal = () => {
    setAddCommentModal(!addCommentModal);
  };

  //initially getting all of the comments by the item id (passed by params)
  useEffect(() => {
    getCommentsByItemId(parseInt(id));
  }, []);

  //function that allows page to be refreshed
  const refreshCommentPage = () => {
    getCommentsByItemId(parseInt(id));
  };

  //use effect that gets the item by id and then sets the state of item on render to be used below
  useEffect(() => {
    getItemById(parseInt(id)).then(setTheItem);
  }, []);

  const submitComment = () => {
    addComment({
      itemId: theItem.id,
      userId: user,
      title: commentTitle,
      description: commentDescription,
    });
  };

  return (
    <>
      <div className="main">
        <div className="comment-buttons">
          <p className="add-comment-button">
            <Button size="md" onClick={toggleAddCommentModal}>
              Add Comment
            </Button>
          </p>

          <p className="back-to-sell">
            <Link
              to={`/getifforsale`}
              type="button"
              class="btn btn-info"
              value="Back to Posts"
              size="sm"
            >
              Back to Sell Page
            </Link>
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="cards-column">
            <Card height="50%" className="comment-top">
              <CardImg src={theItem.imageUrl} alt="comment-iamge" rounded />
              <div className="comment-top">
                <p className="comment-item-title">{theItem.title}</p>
                <p className="comment-item-price">
                  Price: ${theItem.salePrice}
                </p>
              </div>
            </Card>

            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} itemId={id} /> //passing item id and comment down in props
            ))}
            <br></br>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>

      <Modal isOpen={addCommentModal} toggle={toggleAddCommentModal}>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              id="title"
              onChange={(e) => setCommentTitle(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
            />

            <label htmlFor="description">Description: </label>
            <input
              type="text-area"
              id="content"
              onChange={(e) => setCommentDescription(e.target.value)}
              required
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
                  if (!commentTitle) {
                    window.alert("You forgot a title!");
                  } else if (!commentDescription) {
                    window.alert("You forgot a description!");
                  } else {
                    submitComment(comment);
                    refreshCommentPage();
                    getCommentsByItemId(parseInt(id));
                    toggleAddCommentModal();
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

export default ItemCommentList;
