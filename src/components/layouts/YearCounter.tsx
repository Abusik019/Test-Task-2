import { useEffect, useState } from "react";
import { circleItems } from "../../mocks";
import "../style.scss";

type Props = {
    activeIndexTheme: number;
};

export const YearCounter: React.FC<Props> = ({ activeIndexTheme }) => {
    const getMinMax = (index: number) => {
        const years = circleItems[index].items.map((i) => i.year);
        return { min: Math.min(...years), max: Math.max(...years) };
    };

    const [minYear, setMinYear] = useState(getMinMax(activeIndexTheme).min);
    const [maxYear, setMaxYear] = useState(getMinMax(activeIndexTheme).max);

    useEffect(() => {
        const { min } = getMinMax(activeIndexTheme);
        if (minYear === min) return;
        const step = minYear < min ? 1 : -1;
        const interval = setInterval(() => {
            setMinYear((prev) => {
                if (prev === min) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + step;
            });
        }, 30);
        return () => clearInterval(interval);
    }, [activeIndexTheme, minYear]);

    useEffect(() => {
        const { max } = getMinMax(activeIndexTheme);
        if (maxYear === max) return;
        const step = maxYear < max ? 1 : -1;
        const interval = setInterval(() => {
            setMaxYear((prev) => {
                if (prev === max) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + step;
            });
        }, 30);
        return () => clearInterval(interval);
    }, [activeIndexTheme, maxYear]);

    return (
        <h2 className="date">
            <span>{minYear}</span> <span>{maxYear}</span>
        </h2>
    );
};
