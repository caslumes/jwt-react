function CustomButton(props) {
    return (
        <button
            className="py-1 px-2 rounded-md font-bold bg-gray-400 hover:cursor-pointer"
            {...props}
        >
            {props.children}
        </button>
    );
}

export default CustomButton;