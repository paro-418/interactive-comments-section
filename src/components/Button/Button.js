import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      style={{ textTransform: "uppercase" }}
      type={props.type}
      onClick={props.callFunction}
      className={`${props.className} ${classes.btn}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
