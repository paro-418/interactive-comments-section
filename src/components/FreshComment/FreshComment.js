import Button from "../Button/Button";
import Textarea from "react-textarea-autosize";
import { useRef } from "react";

const FreshComment = (props) => {
  const comRef = useRef("");

  const FreshCommentHandler = (event) => {
    event.preventDefault();
    const comment = comRef.current.value;
    comRef.current.value = "";
  };

  return (
    <form onSubmit={FreshCommentHandler}>
      <img src={"./assets/images/avatars/image-juliusomo.png"} />
      <Textarea
        ref={comRef}
        type="textarea"
        col="10"
        row="5"
        defaultValue={comRef.current.value}
      />
      <Button type="submit">Reply</Button>
    </form>
  );
};

export default FreshComment;
