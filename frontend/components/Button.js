function Button(props) {
  const { text, onClick, variant, className, color, disabled } = props;
  const isDisabled = disabled === "true";
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant || "lg"} btn-${
        color || "primary"
      } ${className} `}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}

module.exports = {
  Button,
};
