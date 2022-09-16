import classes from "./UserInfos.module.css";
import Button from "./../Button/Button";
import editIcon from "./../../images/icon-edit.svg";
import deleteIcon from "./../../images/icon-delete.svg";
import userImg from "./../../images/avatars/image-juliusomo.png";
import replyIcon from "./../../images/icon-reply.svg";
import DataContext from "../../context/data-context";
import { useContext } from "react";

const UserInfos = (props) => {
  const conCtx = useContext(DataContext);
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
          <img src={editIcon} alt="edit icon" /> edit
        </Button>
      )}
      {delEditRplyBtn && (
        <Button>
          <img alt="delete icon" src={deleteIcon} />
          delete
        </Button>
      )}

      {!delEditRplyBtn && (
        <Button callFunction={props.replyToggleHandler}>
          <img alt="reply icon" src={replyIcon} />
          reply
        </Button>
      )}
    </div>
  );
};

export default UserInfos;
