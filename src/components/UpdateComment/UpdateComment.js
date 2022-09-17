import { useRef } from "react";
import Button from "../Button/Button";
import Textarea from "react-textarea-autosize";

const UpdateComment = (props) => {
  const inputRef = useRef();

  const updateHandler = (event) => {
    event.preventDefault();
    const updatedComment = inputRef.current.value;
  };
  return (
    <form onSubmit={updateHandler}>
      <Textarea
        ref={inputRef}
        type="textarea"
        defaultValue={props.contentToUpdate}
      />
      <Button type="submit">update</Button>
    </form>
  );
};

export default UpdateComment;
