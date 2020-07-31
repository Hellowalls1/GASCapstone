import React, { useContext, useEffect, useState } from "react";
import { Button } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import Comment from "./ItemComment";
import { CommentContext } from "../../providers/CommentProvider";
import { ItemContext } from "../../providers/ItemProvider";

const ItemCommentList = () => {
  const { comments, getCommentsByItemId, comment } = useContext(CommentContext);
  const { getItemById } = useContext(ItemContext);
  const [theItem, setTheItem] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getCommentsByItemId(parseInt(id));
  }, []);

  useEffect(() => {
    getItemById(parseInt(id)).then(setTheItem);
  }, []);
  debugger;
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          <p className="post-details-title">
            <b>Item Title: </b> {theItem.title} {theItem.salePrice}
          </p>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} itemId={id} />
          ))}
          <br></br>
          <br></br>
          <br></br>
          <Link
            to={`/getifforsale`}
            type="button"
            class="btn btn-info"
            value="Back to Posts"
            size="sm"
          >
            Back to Sell
          </Link>
          <Button>Barter</Button>
        </div>
      </div>
    </div>
  );
};

export default ItemCommentList;
