function Button({
    children,
    type = "button",
    bgColor = "br-blue-600",
    textColot = "text-white",
    className = '', // if user pass clasName = 'border border-sm etc'
    ...props

}) {
    return ( 
        <button className={`px-4, py-2 rounded-lg ${bgColor} ${textColot} ${className}`} {...props}>
            {children}
        </button>
     );
}

export default Button;