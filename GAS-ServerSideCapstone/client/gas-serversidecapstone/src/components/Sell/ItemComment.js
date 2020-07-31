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

  return (
    <>
      <Card className="m-4">
        <p className="text-left px-2">{comment.user.firstName}</p>

        <CardBody>
          <p className="comment-subject">
            <b>Subject: </b>
            {comment.Title}
          </p>
          <p className="comment-content">
            <b>Content: </b>
            {comment.description}
          </p>
        </CardBody>
      </Card>
    </>
  );
};
export default Comment;
