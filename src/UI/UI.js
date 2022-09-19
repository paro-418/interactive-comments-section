import classes from "./UI.module.css";
import CommentHolder from "../components/CommentHolder/CommentHolder";
import { useContext } from "react";
import DataContext from "../context/data-context";
import FreshComment from "../components/FreshComment/FreshComment";

const UI = () => {
  const comCtx = useContext(DataContext);
  return (
    <main className={classes.main}>
      {/* rendering COMMENTHOLDER for each NEW COMMENT .
      if i have N comments in the array then i'll have N seperate comment container*/}
      {comCtx.commentArray.map((comObj) => (
        <CommentHolder
          key={comObj.id}
          id={comObj.id}
          className="commentHolder"
          comObj={comObj}
        />
      ))}
      <FreshComment />
    </main>
  );
};

export default UI;
