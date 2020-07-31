import React, { useState, useContext } from "react";
import { UserContext } from "../providers/UserProfileProvider";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
  const apiUrl = "/api/comment";
  const [comments, setComments] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getComment = (id) => {
    return getToken().then((token) =>
      fetch(apiUrl + `/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.json())
    );
  };

  const getCommentsByItemId = (id) =>
    getToken().then((token) =>
      fetch(apiUrl + `/getbyitem/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => setComments(res))
    );

  const addComment = (comment) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      })
    );

  const updateComment = (comment) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/${comment.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }).then(getComment(comment.id))
    );

  return (
    <CommentContext.Provider
      value={{
        comments,
        getCommentById,
        addComment,
        getAllComments,
        getCommentsByItemId,
        updateComment,
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};
