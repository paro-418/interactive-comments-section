import classes from "./UserInfos.module.css";
import Button from "./../Button/Button";
import DataContext from "../../context/data-context";
import { useContext } from "react";

const UserInfos = (props) => {
  const conCtx = useContext(DataContext);
  const userImg = `./assets/${props.images.png.slice(2)}`;

  const delEditRplyBtn =
    props.username.trim() === conCtx.currentLoggedUserInfo.username.trim();
  return (
    <div>
      <img src={userImg} alt="user icon" />
      <span>{props.username}</span>
      {delEditRplyBtn && <span className={classes.youOrNot}>you</span>}
      <span>{props.createdAt}</span>
      {delEditRplyBtn && (
        <Button callFunction={props.updateToggleHandler}>
          <img src={"./assets/images/icon-edit.svg"} alt="edit icon" /> edit
        </Button>
      )}
      {delEditRplyBtn && (
        <Button>
          <img alt="delete icon" src={"./assets/images/icon-delete.svg"} />
          delete
        </Button>
      )}
      {!delEditRplyBtn && (
        <Button callFunction={props.replyToggleHandler}>
          <img alt="reply icon" src={"./assets/images/icon-reply.svg"} />
          reply
        </Button>
      )}
    </div>
  );
};

export default UserInfos;
