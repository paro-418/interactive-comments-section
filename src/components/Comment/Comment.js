import { useState } from "react";
import Button from "../Button/Button";
import Reply from "../Reply/Reply";
import UpdateComment from "../UpdateComment/UpdateComment";
import UserInfos from "../UserInfos/UserInfos";
import plus from "./../../images/icon-plus.svg";
import minus from "./../../images/icon-minus.svg";

const Comment = (props) => {
  const [updateOrNot, setUpdateOrNot] = useState(true);
  const [replyOrNot, setReplyNot] = useState(true);
  return (
    <article>
      <section>
        <div>
          <Button>
            <img src={plus} alt="add button" />
          </Button>
          <span id="upvote">5</span>
          <Button>
            <img src={minus} alt="subtract button" />
          </Button>
        </div>
        <div>
          <UserInfos />
          {updateOrNot ? (
            <p>
              fkjhfjd fjof ef erof eroifjof fsdffjer ref erfee rifj re erje
              egerker er grge pger g r fger ererjg re eerer riog girgj reiogj re
              ro
            </p>
          ) : (
            <UpdateComment />
          )}
        </div>
      </section>
      {replyOrNot && <Reply />}
    </article>
  );
};

export default Comment;
