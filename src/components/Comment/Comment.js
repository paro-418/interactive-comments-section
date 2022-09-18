import classes from "./Comment.module.css";
import { useContext, useState } from "react";
import Button from "../Button/Button";
import Reply from "../Reply/Reply";
import UpdateComment from "../UpdateComment/UpdateComment";
import UserInfos from "../UserInfos/UserInfos";
import DataContext from "../../context/data-context";

const Comment = (props) => {
  const [updateOrNot, setUpdateOrNot] = useState(false);
  const [replyOrNot, setReplyNot] = useState(false);
  const [whomReplying, setWhomReplying] = useState("");
  const comCtx = useContext(DataContext);

  const updateToggleHandler = () => {
    console.log("updateHandlercalled");
    return setUpdateOrNot((prevState) => !prevState);
  };

  const replyToggleHandler = (whomReplying) => {
    console.log("replyHandlerCalled");
    setWhomReplying(whomReplying);
    return setReplyNot((prevState) => !prevState);
  };

  // console.log(props.comment);

  const {
    id: commentID,
    score,
    createdAt,
    user: { image, username },
    content,
    replyingTo,
  } = props.comment;
  return (
    <section
      // if replied rendered then props.className otherwise modular className
      className={` ${props.replied && props.className} ${
        !props.replied && classes.section
      }`}
    >
      {/* <h1>{commentID}</h1> */}
      <article className={classes.article}>
        <div className={classes.sideBtnHolder}>
          <Button>
            <img src={"/assets/images/icon-plus.svg"} alt="add button" />
          </Button>
          <span id="upvote">{score}</span>
          <Button>
            <img src={"/assets/images/icon-minus.svg"} alt="subtract button" />
          </Button>
        </div>
        <div className={classes.cmpHolder}>
          <UserInfos
            updateToggleHandler={updateToggleHandler}
            replyToggleHandler={replyToggleHandler}
            createdAt={createdAt}
            images={image}
            username={username}
            className={props.className}
            commentID={commentID}
          />
          {updateOrNot ? (
            <UpdateComment replyingTo={replyingTo} contentToUpdate={content} />
          ) : // <UpdateComment contentToUpdate={`@${replyingTo} ${content}`} />
          // if replied comment then adding "replyingTo" otherwise not"
          replyingTo ? (
            // replyingTo is UNDEFINED if comment is NOT a REPLIED comment
            <p className={classes.content}>
              <span className={classes.replyingTo}>@{replyingTo}</span>{" "}
              {content}
            </p>
          ) : (
            <p className={classes.content}>{content}</p>
          )}
        </div>
      </article>
      {replyOrNot && (
        <Reply
          replyingTo={whomReplying}
          replyToggleHandler={replyToggleHandler}
        />
      )}
    </section>
  );
};

export default Comment;
