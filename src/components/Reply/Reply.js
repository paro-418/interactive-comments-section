import Button from "../Button/Button";
// import UserInfos from "../UserInfos/UserInfos";
// import addIcon from "./../../images/icon-plus.svg";
// import minusIcon from "./../../images/icon-minus.svg";
import juliusomo from "./../../images/avatars/image-juliusomo.png";

const Reply = (props) => {
  return (
    <form>
      <img src={juliusomo} />
      <input type="textarea" col="10" row="5" />
      <Button>Reply</Button>
    </form>
  );
};

export default Reply;
