import classes from "./CommentHolder.module.css";
import Comment from "../Comment/Comment";

const CommentHolder = ({ comObj }) => {
  return (
    <section
      id={comObj.id}
      className={`${comObj.user.username} commentHolderIdentifier ${classes.section}`}
    >
      {/* rendering actual comment  */}
      {/*replied props to determine whether rendered COMMENT component is for non-replied comment */}
      <Comment replied={false} comment={comObj} />

      {/* rendering REPLIES on rendered comment */}
      {comObj.replies.map((cmtObj) => (
        <Comment
          key={cmtObj.id}
          // replied props to determine whether rendered COMMENT component is for replied comment
          replied={true}
          comment={cmtObj}
          className={classes.repliedComment}
        />
      ))}
    </section>
  );
};

export default CommentHolder;
