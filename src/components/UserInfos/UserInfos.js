import Button from "./../Button/Button";
import editIcon from "./../../images/icon-edit.svg";
import deleteIcon from "./../../images/icon-delete.svg";
import userImg from "./../../images/avatars/image-juliusomo.png";

const UserInfos = (props) => {
  return (
    <div>
      <img src={userImg} alt="user icon" />
      <span>username</span>
      <span>you or not</span>
      <span>time</span>
      <Button>
        <img src={editIcon} alt="edit icon" /> edit
      </Button>
      <Button>
        <img alt="delete icon" src={deleteIcon} />
        delete
      </Button>
    </div>
  );
};

export default UserInfos;
