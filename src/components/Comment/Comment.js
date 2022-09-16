import { useState } from "react";
import Button from "../Button/Button";
import Reply from "../Reply/Reply";
import UpdateComment from "../UpdateComment/UpdateComment";
import UserInfos from "../UserInfos/UserInfos";
import plus from "./../../images/icon-plus.svg";
import minus from "./../../images/icon-minus.svg";

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
    replies,
  } = props.comment;

  return (
    <article>
      <section>
        <div>
          <Button>
            <img src={plus} alt="add button" />
          </Button>
          <span id="upvote">{score}</span>
          <Button>
            <img src={minus} alt="subtract button" />
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
          {updateOrNot ? <p>{content}</p> : <UpdateComment />}
        </div>
      </section>
      {replyOrNot && <Reply />}
      <section>
        {replies
          ? replies.map((repObj) => (
              <Comment key={repObj.id} comment={repObj} />
            ))
          : ""}
      </section>
    </article>
  );
};

export default Comment;
