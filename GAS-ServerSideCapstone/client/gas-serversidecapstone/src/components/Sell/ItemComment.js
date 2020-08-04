import React from "react";
import { Card, CardBody } from "reactstrap";

const Comment = ({ comment }) => {
  return (
    <>
      <Card className="m-4">
        <CardBody>
          <div className="comment-card">
            <p className="comment-subject">
              <b>{comment.title}</b>
            </p>

            <p className="comment-content">
              <b>Message: </b>
              {comment.description}

              <p className="user-comment">
                <b>By:</b>
                {comment.user.firstName} {comment.user.lastName}
              </p>
            </p>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
export default Comment;
