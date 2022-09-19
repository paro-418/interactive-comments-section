import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import importedData from "./../data/data.json";
// storing in localdata first time
const DATABASE_NAME = "storedLocalData";

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
  replyHandler(receivedReply, replyingTo, parentCommentHolder) {},
  addFreshCommentHandler(receivedComment) {},
  deleteCommentHandler() {},
  updateCommentHandler(receivedUpdatedComment, commentId, isRepliedComment) {},
});

export const DataContextProvider = (props) => {
  const comCtx = useContext(DataContext);

  // to store all comments only of logged user
  const [allComments, setAllComments] = useState(comCtx.commentArray);

  // state to store current logged user informations
  const [currentUserInfo, setCurrentUserInfo] = useState(
    comCtx.currentLoggedUserInfo
  );

  // state to hold userimage address
  const [accountHolderImage, setAccountHolderImage] = useState(
    comCtx.accountHolderImage
  );

  // state to trigger loading data each time there is a change in DB
  const [shouldReload, setShouldReload] = useState(true);

  // saving imported data from .json file to locallyStoredData
  useEffect(() => {
    localStorage.setItem(DATABASE_NAME, JSON.stringify(importedData));
  }, []);

  useEffect(() => {
    const locallyStoredDate = JSON.parse(localStorage.getItem(DATABASE_NAME));

    // setting all states
    setAllComments(locallyStoredDate.comments);
    setCurrentUserInfo(locallyStoredDate.currentUser);
    setAccountHolderImage({
      image: {
        png: locallyStoredDate.currentUser.image.png,
        webp: locallyStoredDate.currentUser.image.webp,
      },
    });
  }, [shouldReload]);

  // puhing reply to the database
  const pushReplyHandler = (replyObject, parentUsername) => {
    // obtaining stored local data
    const storedLocalData = JSON.parse(localStorage.getItem(DATABASE_NAME));

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
    localStorage.removeItem(DATABASE_NAME);
    // Storing new updated data
    localStorage.setItem(DATABASE_NAME, JSON.stringify(storedLocalData));
    setShouldReload((prevVal) => !prevVal);
  };

  // function to create reply object
  const replyHandler = (receivedReply, replyingTo, parentCommentHolder) => {
    const replyObject = {
      id: Date.now(),
      content: receivedReply,
      createdAt: "just now",
      score: 0,
      replyingTo: replyingTo,
      user: {
        image: {
          png: importedData.currentUser.image.png,
          webp: importedData.currentUser.image.webp,
        },
        username: importedData.currentUser.username,
      },
    };

    // firstClass name is username itself
    const parentUsername = parentCommentHolder.classList[0].trim();
    pushReplyHandler(replyObject, parentUsername);
  };

  const pushFreshCommentHandler = (newAllComments) => {
    const storedLocalData = JSON.parse(localStorage.getItem(DATABASE_NAME));
    storedLocalData.comments = newAllComments;
    localStorage.removeItem(DATABASE_NAME);
    localStorage.setItem(DATABASE_NAME, JSON.stringify(storedLocalData));
    setShouldReload((prevVal) => !prevVal);
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

    setAllComments((prevComments) => {
      const newAllComments = [...prevComments, cmtObjToPush];
      pushFreshCommentHandler(newAllComments);
      return newAllComments;
    });
  };
  // function to delete comment
  const deleteCommentHandler = () => {
    console.log("im called");
  };

  const updateCommentHandler = (
    receivedUpdatedComment,
    commentId,
    isRepliedComment
  ) => {
    const storedLocalData = JSON.parse(localStorage.getItem(DATABASE_NAME));

    // if updated comment belongs to replied comment
    if (isRepliedComment) {
      // iterating each object in COMMENTS property
      storedLocalData.comments.map((cmtObj) => {
        // iterating each object inside REPLIES property inside COMMENTS property
        const updatedRepliesComment = cmtObj.replies.map((rplyCmt) => {
          if (rplyCmt.id === commentId) {
            rplyCmt.content = receivedUpdatedComment.trim();
          }
          return rplyCmt;
        });
        cmtObj.replies = updatedRepliesComment;
        return cmtObj;
      });
    } else {
      // if updated comment belons to fresh comment (not-replied comment)
      const updatedComments = storedLocalData.comments.map((comObj) => {
        if (comObj.id === commentId)
          comObj.content = receivedUpdatedComment.trim();
        return comObj;
      });
      storedLocalData.comments = updatedComments;
    }

    // removing old DATABASE
    localStorage.removeItem(DATABASE_NAME);
    // storing NEW DATABASE
    localStorage.setItem(DATABASE_NAME, JSON.stringify(storedLocalData));
    setShouldReload((prevVal) => !prevVal);
  };
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
