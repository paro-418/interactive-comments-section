import classes from "./UpdateComment.module.css";
import { useContext, useRef } from "react";
import Button from "../Button/Button";
import DataContext from "../../context/data-context";

const UpdateComment = ({
  replyingTo,
  contentToUpdate,
  commentID,
  updateToggleHandler,
}) => {
  // console.log(updateToggleHandler);
  const comCtx = useContext(DataContext);
  // preventing adding username if updating FRESHCOMMENT i.e not replied comment
  const initialComment = replyingTo
    ? `@${replyingTo} ${contentToUpdate}`
    : contentToUpdate;
  const inputRef = useRef(initialComment);

  const updateHandler = (event) => {
    event.preventDefault();
    const updatedComment = inputRef.current.value.replace(`@${replyingTo}`, "");

    const prntCmtCntrClassList =
      event.currentTarget.parentElement.parentElement.parentElement
        .classList[1];

    const isRepliedComment =
      prntCmtCntrClassList.trim() === "repliedCommentIdentifier";
    comCtx.updateCommentHandler(updatedComment, commentID, isRepliedComment);
    updateToggleHandler();
  };
  return (
    <form className={classes.form} onSubmit={updateHandler}>
      <textarea
        className={classes.textarea}
        ref={inputRef}
        defaultValue={inputRef.current}
      />
      <Button className={classes.btn} type="submit">
        update
      </Button>
    </form>
  );
};

export default UpdateComment;
