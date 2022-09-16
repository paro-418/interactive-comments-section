const Button = (props) => {
  return (
    <button
      style={{ textTransform: "uppercase" }}
      type={props.type}
      onClick={props.callFunction}
      className={props.className}
    >
      {props.children}
    </button>
  );
};

export default Button;
