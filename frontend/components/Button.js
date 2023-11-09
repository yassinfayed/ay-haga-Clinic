function Button (props) {
    const { text, onClick, variant, className, color } = props;
    return (
        <button
            onClick={onClick}
            className={`btn btn-${variant || 'lg'} btn-${color || "primary"} ${className}`}
        >
            {text}
        </button>
    );
};

module.exports = {
    Button
}