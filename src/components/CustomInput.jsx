function CustomInput({ ref, type = "text", placeholder, label }) {
    return (
        <>
            {label ? <h2 className="font-bold">{label}</h2> : null}
            <input
                ref={ref}
                placeholder={placeholder}
                className="py-1 px-2 rounded-sm border-1 border-black/50 text-center"
                type={type}
            />
        </>
    );
}

export default CustomInput;
