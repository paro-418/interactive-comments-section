import classes from "./UpdateComment.module.css";
import { useRef } from "react";
import Button from "../Button/Button";

const UpdateComment = ({ replyingTo, contentToUpdate }) => {
  // preventing adding username if updating FRESHCOMMENT i.e not replied comment
  const initialComment = replyingTo
    ? `@${replyingTo} ${contentToUpdate}`
    : contentToUpdate;
  const inputRef = useRef(initialComment);

  const updateHandler = (event) => {
    event.preventDefault();
    const updatedComment = inputRef.current.value;
    console.log(updatedComment);
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
