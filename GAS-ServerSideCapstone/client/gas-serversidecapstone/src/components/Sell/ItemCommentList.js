import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
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
  const { id } = useParams();
  const user = JSON.parse(sessionStorage.getItem("user")).id;
  const [commentTitle, setCommentTitle] = useState();
  const [commentDescription, setCommentDescription] = useState();

  const toggleAddCommentModal = () => {
    setAddCommentModal(!addCommentModal);
  };

  useEffect(() => {
    getCommentsByItemId(parseInt(id));
  }, []);

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
      <div className="container">
        <div className="addCommentButton">
          <Button size="md" onClick={toggleAddCommentModal}>
            Add Comment
          </Button>
          <Link
            to={`/getifforsale`}
            type="button"
            class="btn btn-info"
            value="Back to Posts"
            size="sm"
          >
            Back to Sell Page
          </Link>
        </div>

        <div className="row justify-content-center">
          <div className="cards-column">
            <p className="post-details-title">
              <b>Item: </b> {theItem.title}
            </p>
            <p>Price :${theItem.salePrice}</p>

            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} itemId={id} />
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
            <label htmlFor="comment">Category: </label>

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
                    getCommentsByItemId(parseInt(id)); //getting all the comments by itemId before the modal closes to load with comment
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
