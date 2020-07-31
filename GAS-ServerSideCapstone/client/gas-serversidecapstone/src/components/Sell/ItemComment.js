import React, { useContext, useState, useRef } from "react";
import { Card, CardBody, Button, Modal, ModalBody } from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider";
import { UserContext } from "../../providers/UserProvider";

const Comment = ({ comment, itemId }) => {
  const [theComment, setTheComment] = useState(comment);

  const { user } = useContext(UserContext);
  //   const user = JSON.parse(sessionStorage.getItem("user")).id;
  const { updateComment } = useContext(CommentContext);

  const subject = useRef();
  const content = useRef();

  const [editModal, setEditModal] = useState(false);

  //   const toggleAdd = () => {
  //     setAddModal(!AddModal);
  //   };

  //   const submitForm = () => {
  //     updateComment({
  //       id: comment.id,
  //       subject: subject.current.value,
  //       content: content.current.value,
  //       postId: parseInt(postId),
  //       userProfileId: theUserProfile.id,
  //       createDateTime: comment.createDateTime,
  //     });
  //   };

  return (
    <>
      <Card className="m-4">
        <p className="text-left px-2">{comment.userProfile.displayName}</p>

        <CardBody>
          <p className="comment-subject">
            <b>Subject: </b>
            {comment.Title}
          </p>
          <p className="comment-content">
            <b>Content: </b>
            {comment.description}
          </p>
          {/* <Button onClick={toggleEdit}>Edit</Button>) */}
        </CardBody>
      </Card>

      {/* <Modal isOpen={editModal} toggle={toggleEdit}>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="subject">Subject: </label>
            <input
              type="text"
              id="subject"
              ref={subject}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={theComment.subject}
            />

            <label htmlFor="content">Content: </label>
            <input
              type="text-area"
              id="content"
              ref={content}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={theComment.content}
            /> */}

      {/* <div className="">
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={(evt) => {
                  evt.preventDefault();
                  if (content.current.value === "") {
                    window.alert("You forgot to enter content!");
                  } else if (subject.current.value === "") {
                    window.alert("You forgot the subject!");
                  } else {
                    submitForm(comment);
                    setTheComment({
                      id: comment.id,
                      subject: subject.current.value,
                      content: content.current.value,
                      postId: parseInt(postId),
                      userProfileId: theUserProfile.id,
                      createDateTime: comment.createDateTime,
                    });
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
      </Modal> */}
    </>
  );
};
export default Comment;
