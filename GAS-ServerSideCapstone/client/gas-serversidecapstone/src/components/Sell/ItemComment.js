import React, { useContext, useState, useRef } from "react";
import { Card, CardBody, Button, Modal, ModalBody } from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider";
import { UserContext } from "../../providers/UserProvider";

const Comment = ({ comment, itemId, refreshCommentPage }) => {
  return (
    <>
      <Card className="m-4">
        <CardBody>
          <div className="comment-card">
            <p className="comment-subject">
              <b> </b>
              {comment.title}
            </p>

            <p className="comment-content">
              <b>Message: </b>
              {comment.description}

              <p className="user-comment">
                By: {comment.user.firstName} {comment.user.lastName}
              </p>
            </p>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
export default Comment;
