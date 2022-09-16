import classes from "./UI.module.css";
import CommentHolder from "../components/CommentHolder/CommentHolder";
const UI = () => {
  return (
    <main className={classes.main}>
      <CommentHolder />
    </main>
  );
};

export default UI;
