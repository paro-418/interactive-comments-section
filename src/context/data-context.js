import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import importedComments from "./../data/data.json";

const DataContext = createContext({
  commentArray: [],
  currentLoggedUserInfo: {
    image: {
      png: "",
      webp: "",
    },
    username: "",
  },
  accountHolderImage: {
    image: {
      png: "",
      webp: "",
    },
  },
  addCommentHanadler() {},
  addFreshCommentHandler() {},
  deleteCommentHandler() {},
  updateCommentHandler() {},
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
    setAllComments(importedComments.comments);
    setCurrentUserInfo(importedComments.currentUser);
    setAccountHolderImage({
      image: {
        png: importedComments.currentUser.image.png,
        webp: importedComments.currentUser.image.webp,
      },
    });
  }, []);

  // function to add comment
  const addCommentHanadler = (receivedComment) => {
    // comCtx.commentArray.push(receivedComment);
    console.log(receivedComment);
  };

  const addFreshCommentHandler = (receivedComment) => {
    const cmtObjToPush = {
      id: Date.now(),
      content: receivedComment,
      createdAt: "Just now",
      score: 0,
      user: {
        image: {
          png: accountHolderImage.image.png,
          webp: accountHolderImage.image.webp,
        },
        username: currentUserInfo.username,
      },
      replies: [],
    };

    setAllComments((prevComments) => [...prevComments, cmtObjToPush]);
  };
  // function to delete comment
  const deleteCommentHandler = () => {
    console.log("im called");
  };

  const updateCommentHandler = () => {};
  return (
    <DataContext.Provider
      value={{
        commentArray: allComments,
        addCommentHanadler,
        currentLoggedUserInfo: currentUserInfo,
        accountHolderImage,
        deleteCommentHandler,
        updateCommentHandler,
        addFreshCommentHandler,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
