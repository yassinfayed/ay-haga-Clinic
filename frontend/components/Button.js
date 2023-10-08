function Button(props) {
    const {text} = props;
    return (
        <button {...props} onClick={props.onClick} className={`btn btn-${props.variant || 'lg'} btn-primary mx-2 my-2 ${props.className}`}>
            {text}
        </button>
    )
};

module.exports = {
    Button
}