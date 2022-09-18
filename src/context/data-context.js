import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import importedData from "./../data/data.json";
// storing in localdata first time
localStorage.setItem("storeComment", JSON.stringify(importedData));

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
  replyHandler() {},
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
    // storing data in localstorage
    localStorage.setItem("storeComment", JSON.stringify(importedData));
  }, []);

  useEffect(() => {
    const locallyStoredDate = JSON.parse(localStorage.getItem("storeComment"));
    setAllComments(locallyStoredDate.comments);
    setCurrentUserInfo(locallyStoredDate.currentUser);
    setAccountHolderImage({
      image: {
        png: locallyStoredDate.currentUser.image.png,
        webp: locallyStoredDate.currentUser.image.webp,
      },
    });
  }, []);

  const pushReplyHandler = (replyObject, parentUsername) => {
    // obtaining stored local data
    const storedLocalData = JSON.parse(localStorage.getItem("storeComment"));

    // finding parent comment holder section where reply to be stored and storing replyin "replies" property
    // storing new resultant "comments" array
    const newDataToStore = storedLocalData.comments.map((cmtObj) => {
      if (cmtObj.user.username.trim() === parentUsername.trim())
        cmtObj.replies.push(replyObject);
      return cmtObj;
    });

    // reassigning "comments" property with new array where replies are updated
    storedLocalData.comments = newDataToStore;
    // removing old local storage
    localStorage.removeItem("storeComment");
    // Storing new updated data
    localStorage.setItem("storeComment", JSON.stringify(storedLocalData));
  };

  // function to add comment
  const replyHandler = (receivedReply, replyingTo, parentCommentHolder) => {
    const replyObject = {
      id: Date.now(),
      content: receivedReply,
      createdAt: "just now",
      score: 0,
      replyingTo: replyingTo,
      user: {
        image: {
          png: `./assets/images/avatars/image-${replyingTo}.png`,
          webp: `./assets/images/avatars/image-${replyingTo}.webp`,
        },
        username: comCtx.currentLoggedUserInfo.username,
      },
    };

    // firstClass name is username itself
    const parentUsername = parentCommentHolder.classList[0].trim();
    pushReplyHandler(replyObject, parentUsername);
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
        replyHandler,
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
