import { IconProps } from "../types";

export const ArrowIcon = ({
    width = "20",
    height = "20",
    strokeWidth = "1",
    color = "#3877EE",
    rotate = 0,
}: IconProps) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `rotate(${rotate}deg)` }}
    >
        <path
            d="M7 5L13 10L7 15"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
