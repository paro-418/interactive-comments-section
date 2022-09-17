import { useState } from "react";
import Button from "../Button/Button";
import Reply from "../Reply/Reply";
import UpdateComment from "../UpdateComment/UpdateComment";
import UserInfos from "../UserInfos/UserInfos";

const Comment = (props) => {
  const [updateOrNot, setUpdateOrNot] = useState(false);
  const [replyOrNot, setReplyNot] = useState(false);

  const updateToggleHandler = () => setUpdateOrNot((prevState) => !prevState);
  const replyToggleHandler = () => setReplyNot((prevState) => !prevState);
  const {
    score,
    createdAt,
    user: { image, username },
    content,
    replyingTo,
  } = props.comment;

  return (
    <section>
      <article>
        <div>
          <Button>
            <img src={"/assets/images/icon-plus.svg"} alt="add button" />
          </Button>
          <span id="upvote">{score}</span>
          <Button>
            <img src={"/assets/images/icon-minus.svg"} alt="subtract button" />
          </Button>
        </div>
        <div>
          <UserInfos
            updateToggleHandler={updateToggleHandler}
            replyToggleHandler={replyToggleHandler}
            createdAt={createdAt}
            images={image}
            username={username}
          />
          {updateOrNot ? (
            <UpdateComment contentToUpdate={content} />
          ) : (
            // if replied comment then adding "replyingTo" otherwise not"
            <p>{replyingTo ? `@${replyingTo} ${content}` : content}</p>
          )}
        </div>
      </article>
      {replyOrNot && <Reply replyToggleHandler={replyToggleHandler} />}
    </section>
  );
};

export default Comment;
