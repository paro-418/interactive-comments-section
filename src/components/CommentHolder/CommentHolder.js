import Comment from "../Comment/Comment";

const CommentHolder = ({ comObj }) => {
  return (
    <section id={comObj.id} className={comObj.user.username}>
      {/* rendering actual comment  */}
      <Comment comment={comObj} />

      {/* rendering REPLIES on rendered comment */}
      {comObj.replies.map((cmtObj) => (
        <Comment key={cmtObj.id} comment={cmtObj} />
      ))}
    </section>
  );
};

export default CommentHolder;
