import Comment from "../Comment/Comment";
import { useContext } from "react";
import DataContext from "../../context/data-context";

const CommentHolder = () => {
  const conCtx = useContext(DataContext);
  return (
    <section>
      {conCtx.commentArray.map((cmtObj) => (
        <Comment key={cmtObj.id} comment={cmtObj} />
      ))}
    </section>
  );
};

export default CommentHolder;
