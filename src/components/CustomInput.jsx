function CustomInput({ ref, type = "text", placeholder = null }) {
    return (
        <input
            ref={ref}
            placeholder={placeholder}
            className="py-1 px-2 rounded-sm border-1 border-black/50 text-center"
            type={type}
        />
    );
}

export default CustomInput;
