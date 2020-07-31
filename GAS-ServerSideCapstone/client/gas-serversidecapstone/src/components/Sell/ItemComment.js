import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "../providers/CommentProvider";

import { ItemContext } from "../providers/ItemProvider";
import { useParams, Link } from "react-router-dom";

const ItemCommentList = () => {
  const [item, setItem] = useState({});
  const { comments, getCommentsByPostId, comment } = useContext(CommentContext);
  const { getItemById } = useContext(ItemContext);

  const { id } = useParams();

  useEffect(() => {
    getCommentsByPostId(id);
    getItemById(id).then(setItem);
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          <p className="post-details-title">
            <b>Post Title: </b> {item.title} {item.price}
          </p>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} itemId={id} />
          ))}
          <br></br>
          <br></br>
          <br></br>
          <Link
            to={`/posts/${id}`}
            type="button"
            class="btn btn-info"
            value="Back to Posts"
            size="sm"
          >
            Back to Item
          </Link>
        </div>
      </div>
    </div>
  );
};
