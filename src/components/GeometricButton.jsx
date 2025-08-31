import clsx from "clsx";

export const GeometricButton = ({
    children = "Click me", 
    onClick = () => {}, 
    fillColor, 
    textColor, 
    className = "", 
    disabled = false, 
    cut = "right",
    width = "100%",
    variant = "primary", // "primary" or "secondary"
    ...props
}) => {
    
    // Define variants
    const variants = {
        primary: {
            fillColor: "#8532D8",
            textColor: "white"
        },
        secondary: {
            fillColor: "#E5E7EB", 
            textColor: "black"
        }
    };
    
    // Use variant colors if not explicitly provided
    const finalFillColor = fillColor || variants[variant].fillColor;
    const finalTextColor = textColor || variants[variant].textColor;
    
    return (
        <div 
            className={`relative rounded-md px-2 ${className} h-10`}
        >

            <div 
                className={clsx("absolute  top-0 w-6 h-10  rounded-md " , cut === "right" ? "left-0" : "right-0")}
                style={{ backgroundColor: finalFillColor }}
            />
            

            <button
                onClick={onClick}
                disabled={disabled}
                className={`w-full rounded-md  disabled:opacity-50 h-10 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 inline-flex items-center justify-center -skew-x-[20deg]`}
                style={{ 
                    backgroundColor: finalFillColor,
                    color: finalTextColor 
                }}
                {...props}
            >

                <span
                    className={`text-sm font-medium px-4 truncate skew-x-[20deg] `}
                >
                    {children}
                </span>
            </button>
        </div>
    );
};