import classes from "./Reply.module.css";
import Button from "../Button/Button";
import { useContext, useRef } from "react";
import DataContext from "../../context/data-context";

const Reply = (props) => {
  const comCtx = useContext(DataContext);
  const replyRef = useRef(`@${props.replyingTo} `);

  const replyHandler = (event) => {
    event.preventDefault();
    const parentCommentHolder = event.currentTarget.closest(
      ".commentHolderIdentifier"
    );
    const reply = replyRef.current.value.replace(`@${props.replyingTo} `, "");
    // guard condition
    if (reply.trim().length === 0) return;
    // storing reply and then removing username from comment
    comCtx.replyHandler(reply,props.replyingTo, parentCommentHolder);
    props.replyToggleHandler();
  };

  return (
    <form onSubmit={replyHandler} className={classes.form}>
      <img
        src={comCtx.accountHolderImage.image.png}
        alt="user profile"
        className={classes.userImg}
      />
      <textarea
        ref={replyRef}
        col="10"
        row="5"
        defaultValue={replyRef.current}
        className={classes.textarea}
      />
      <Button className={classes.btn} type="submit">
        Reply
      </Button>
    </form>
  );
};

export default Reply;
