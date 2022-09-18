import classes from "./UpdateComment.module.css";
import { useRef } from "react";
import Button from "../Button/Button";

const UpdateComment = (props) => {
  const inputRef = useRef();

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
        defaultValue={props.contentToUpdate}
      />
      <Button className={classes.btn} type="submit">
        update
      </Button>
    </form>
  );
};

export default UpdateComment;
