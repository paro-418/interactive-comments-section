import classes from "./UserInfos.module.css";
import Button from "./../Button/Button";
import DataContext from "../../context/data-context";
import { useContext } from "react";

const UserInfos = (props) => {
  const comCtx = useContext(DataContext);
  const commentorImage = props.images.png;

  // this delEditRplyBtn variable helping to prevent showing REPLY button on its own comment
  // and allowing DELETE and EDIT button only on account holder's commemnt
  const delEditRplyBtn =
    props.username.trim() === comCtx.currentLoggedUserInfo.username.trim();

  const commentDeleteHandler = (event) => {
    const parentContainerClassList =
      event.currentTarget.parentElement.parentElement.parentElement
        .parentElement.parentElement.classList[1];

    const isRepliedComment =
      parentContainerClassList.trim() === "repliedCommentIdentifier".trim();
    comCtx.deleteCommentHandler(props.commentID, isRepliedComment);
  };
  return (
    <div className={classes.userInfos}>
      <img src={commentorImage} alt="user icon" className={classes.userImg} />
      <span className={classes.username}>{props.username}</span>
      {delEditRplyBtn && <span className={classes.youOrNot}>you</span>}
      <span>{props.createdAt}</span>
      <span className={classes.btnContainer}>
        {delEditRplyBtn && (
          // EDIT BUTTON
          <Button
            className={classes.btn}
            callFunction={props.updateToggleHandler}
          >
            <img src={"./assets/images/icon-edit.svg"} alt="edit icon" /> edit
          </Button>
        )}
        {delEditRplyBtn && (
          // DELETE BUTTON
          <Button
            className={`${classes.btn} ${classes.delete}`}
            callFunction={commentDeleteHandler}
          >
            <img alt="delete icon" src={"./assets/images/icon-delete.svg"} />
            delete
          </Button>
        )}
        {!delEditRplyBtn && (
          // REPLY BUTTON
          <Button
            callFunction={() => props.replyToggleHandler(props.username)}
            className={classes.btn}
          >
            <img alt="reply icon" src={"./assets/images/icon-reply.svg"} />
            reply
          </Button>
        )}
      </span>
    </div>
  );
};

export default UserInfos;
