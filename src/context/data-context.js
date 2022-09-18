import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import comments from "./../data/data.json";

const DataContext = createContext({
  commentArray: [],
  currentLoggedUserInfo: {},
  accountHolderImage: "",
  addCommentHanadler() {},
  deleteCommentHandler() {},
});

export const DataContextProvider = (props) => {
  const comCtx = useContext(DataContext);
  const [allComments, setAllComments] = useState(comCtx.commentArray);
  const [currentUserInfo, setCurrentUserInfo] = useState(
    comCtx.currentLoggedUserInfo
  );
  const [accountHolderImage, setAccountHolderImage] = useState(
    comCtx.accountHolderImage
  );

  useEffect(() => {
    setAllComments(comments.comments);
    setCurrentUserInfo(comments.currentUser);
    setAccountHolderImage(
      `./assets/${comments.currentUser.image.png.slice(2)}`
    );
  }, []);

  // function to add comment
  const addCommentHanadler = (receivedComment) => {
    comCtx.commentArray.push(receivedComment);
  };

  // function to delete comment
  const deleteCommentHandler = () => {
    console.log("im called");
  };
  return (
    <DataContext.Provider
      value={{
        commentArray: allComments,
        addCommentHanadler,
        currentLoggedUserInfo: currentUserInfo,
        accountHolderImage,
        deleteCommentHandler,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
