function CustomButton(props) {
    return (
        <button
            className="py-2 px-4 rounded-md text-white font-bold bg-blue-800 hover:cursor-pointer"
            {...props}
        >
            {props.children}
        </button>
    );
}

export default CustomButton;