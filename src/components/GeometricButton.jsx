export const GeometricButton = ({
    children = "Click me", 
    onClick = () => {}, 
    fillColor = "#8532D8", 
    textColor = "white", 
    className = "", 
    disabled = false, 
    cut = "right", // "right" or "left"
    width = 164,
    height = 40,
    ...props
}) => {
    
    // SVG configurations based on cut direction
    const svgConfigs = {
        right: {
            path: "M0 5C0 2.23858 2.23858 0 5 0H155.684C159.446 0 161.861 3.99805 160.11 7.32755L150.642 25.3275C149.778 26.971 148.074 28 146.217 28H5C2.23858 28 0 25.7614 0 23V5Z"
        },
        left: {
            path: "M12.0459 2.8607C12.8728 1.11385 14.6324 0 16.5651 0H159C161.761 0 164 2.23858 164 5V23C164 25.7614 161.761 28 159 28H8.04431C4.37429 28 1.95483 24.1778 3.52508 20.8607L12.0459 2.8607Z"
        }
    };

    const currentSvg = svgConfigs[cut] || svgConfigs.right;
    const dynamicViewBox = `0 0 164 28`; // Keep original proportions

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`relative inline-flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 ${className}`}
            style={{width: `${width}px`, height: `${height}px`}}
            {...props}
        >
            {/* SVG Background */}
            <svg
                width="100%"
                height="100%"
                viewBox={dynamicViewBox}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0"
                preserveAspectRatio="none"
            >
                <path
                    d={currentSvg.path}
                    fill={fillColor}
                    className="transition-colors duration-200 hover:brightness-110"
                />
            </svg>

            {/* Text Content */}
            <span
                className="relative z-10 text-sm font-medium px-4 truncate"
                style={{color: textColor}}
            >
                {children}
            </span>
        </button>
    );
};