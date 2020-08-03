import React from "react";
import { Card, CardBody } from "reactstrap";

const Comment = ({ comment }) => {
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
