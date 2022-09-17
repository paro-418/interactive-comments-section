import Button from "../Button/Button";
import Textarea from "react-textarea-autosize";
import { useRef } from "react";

const Reply = (props) => {
  const replyRef = useRef("");
  const replyHandler = (event) => {
    event.preventDefault();

    const reply = replyRef.current.value;
    console.log(reply);
    replyRef.current.value = "";

    // toggling reply form 
    props.replyToggleHandler();
  };

  return (
    <form onSubmit={replyHandler}>
      <img src={"./assets/images/avatars/image-juliusomo.png"} />
      <Textarea
        ref={replyRef}
        type="textarea"
        col="10"
        row="5"
        defaultValue={replyRef.current.value}
      />
      <Button type="submit">Reply</Button>
    </form>
  );
};

export default Reply;
