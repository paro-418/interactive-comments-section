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
  deleteCommentHandler(commentID, isRepliedComment) {},
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
        png:
          process.env.PUBLIC_URL +
          locallyStoredDate.currentUser.image.png.slice(1),
        webp:
          process.env.PUBLIC_URL +
          locallyStoredDate.currentUser.image.webp.slice(1),
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
  const deleteCommentHandler = (commentID, isRepliedComment) => {
    const storedLocalData = JSON.parse(localStorage.getItem(DATABASE_NAME));
    if (isRepliedComment) {
      // iterating objects in COMMENT property
      const updatedCommentsAfterDELETE = storedLocalData.comments.map(
        (comObj) => {
          // filtering comment object in REPLIES property
          const updatedCommentsAfterDELETE = comObj.replies.filter(
            (rplyCmt) => {
              if (rplyCmt.id !== commentID) return rplyCmt;
            }
          );
          comObj.replies = updatedCommentsAfterDELETE;
          return comObj;
        }
      );
      storedLocalData.comments = updatedCommentsAfterDELETE;
    } else {
      const updatedCommentsAfterDELETE = storedLocalData.comments.filter(
        (comObj) => {
          if (comObj.id !== commentID) return comObj;
        }
      );
      storedLocalData.comments = updatedCommentsAfterDELETE;
    }
    // removing old DATABASE
    localStorage.removeItem(DATABASE_NAME);
    // storing NEW DATABASE
    localStorage.setItem(DATABASE_NAME, JSON.stringify(storedLocalData));
    setShouldReload((prevVal) => !prevVal);
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
      const updatedCommentsAfterUPDATE = storedLocalData.comments.map(
        (cmtObj) => {
          // iterating each object inside REPLIES property inside COMMENTS property
          const updatedRepliesComment = cmtObj.replies.map((rplyCmt) => {
            if (rplyCmt.id === commentId) {
              rplyCmt.content = receivedUpdatedComment.trim();
            }
            return rplyCmt;
          });
          cmtObj.replies = updatedRepliesComment;
          return cmtObj;
        }
      );

      storedLocalData.comments = updatedCommentsAfterUPDATE;
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
