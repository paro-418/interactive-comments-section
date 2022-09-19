import classes from "./FreshComment.module.css";
import Button from "../Button/Button";
import DataContext from "../../context/data-context";
import { useContext, useRef } from "react";

const FreshComment = () => {
  const comRef = useRef("");
  const comCtx = useContext(DataContext);

  const FreshCommentHandler = (event) => {
    event.preventDefault();
    const comment = comRef.current.value.trim();
    if (comment.length === 0) return;
    comCtx.addFreshCommentHandler(comment);
    comRef.current.value = "";
  };

  return (
    <form onSubmit={FreshCommentHandler} className={classes.form}>
      <img
        src={comCtx.accountHolderImage.image.png}
        alt="user's profile"
        className={classes.userImg}
      />
      <textarea
        ref={comRef}
        col="10"
        row="5"
        defaultValue={comRef.current.value}
        className={classes.textarea}
      />
      <Button className={classes.btn} type="submit">
        send
      </Button>
    </form>
  );
};

export default FreshComment;
