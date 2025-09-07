import clsx from "clsx";

export const GeometricButton = ({
                                    children = "Click me",
                                    onClick = () => {
                                    },
                                    fillColor,
                                    textColor,
                                    className = "",
                                    disabled = false,
                                    cut = "right",
                                    width = "100%",
                                    variant = "primary", // "primary" or "secondary"
                                    ...props
                                }) => {

    const variants = {
        primary: {
            fillColor: "#8532D8",
            textColor: "white",
            borderColor: null
        },
        secondary: {
            fillColor: "#E5E7EB",
            textColor: "black",
            borderColor: null
        },
        darkPrimary: {
            fillColor: "#4E217C",
            textColor: "white",
            borderColor: null
        },
        dark: {
            fillColor: "#000",
            textColor: "white",
            borderColor: null
        },
        outlined: {
            fillColor: "#00000000",
            textColor: "#000000",
            borderColor: "#fff"
        },
    };

    const finalFillColor = fillColor || variants[variant].fillColor;
    const finalTextColor = textColor || variants[variant].textColor;
    const finalBorderColor = variants[variant].borderColor;

    return (
        <div
            className={`relative rounded-md px-2 ${className} h-10`}
        >

            <div
                className={clsx("absolute  top-0 w-6 h-10  rounded-md ", cut === "right" ? "left-0" : "right-0")}
                style={{
                    backgroundColor: finalFillColor,
                    border: finalBorderColor ? `2px solid ${finalBorderColor}` : 'none'
                }}
            />


            <button
                onClick={onClick}
                disabled={disabled}
                className={`w-full rounded-md outline-1   h-10 disabled:cursor-not-allowed focus:outline-none inline-flex items-center justify-center -skew-x-[20deg] `}
                style={{
                    backgroundColor: finalFillColor,
                    color: finalTextColor,
                    border: finalBorderColor ? `2px solid ${finalBorderColor}` : 'none'
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