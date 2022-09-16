import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import comments from "./../data/data.json";
// console.log(comments);

const DataContext = createContext({
  commentArray: [],
  currentLoggedUserInfo: {},
});

export const DataContextProvider = (props) => {
  const comCtx = useContext(DataContext);
  const [allComments, setAllComments] = useState(comCtx.commentArray);
  const [currentUserInfo, setCurrentUserInfo] = useState(
    comCtx.currentLoggedUserInfo
  );

  useEffect(() => {
    setAllComments(comments.comments);
    setCurrentUserInfo(comments.currentUser);
  }, []);

  // function to add comment
  const addComment = (receivedComment) => {
    comCtx.commentArray.push(receivedComment);
  };
  return (
    <DataContext.Provider
      value={{
        commentArray: allComments,
        addComment,
        currentLoggedUserInfo: currentUserInfo,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
