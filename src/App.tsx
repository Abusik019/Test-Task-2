import "./index.scss";
import RadialSelector from "./components/layouts/RadialSelector";
import Slider from "./components/layouts/Slider";
import { useState, useEffect } from "react";
import { circleItems } from "./mocks";

const App = () => {
    const [activeIndexTheme, setActiveIndexTheme] = useState<number>(0);

    const getMinMax = (index: number) => {
        const years = circleItems[index].items.map(i => i.year);
        return { min: Math.min(...years), max: Math.max(...years) };
    };

    const [minYear, setMinYear] = useState(getMinMax(0).min);
    const [maxYear, setMaxYear] = useState(getMinMax(0).max);

    useEffect(() => {
        const { min } = getMinMax(activeIndexTheme);
        if (minYear === min) return;
        const step = minYear < min ? 1 : -1;
        const interval = setInterval(() => {
            setMinYear(prev => {
                if (prev === min) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + step;
            });
        }, 50);
        return () => clearInterval(interval);
    }, [activeIndexTheme, minYear]);

    useEffect(() => {
        const { max } = getMinMax(activeIndexTheme);
        if (maxYear === max) return;
        const step = maxYear < max ? 1 : -1;
        const interval = setInterval(() => {
            setMaxYear(prev => {
                if (prev === max) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + step;
            });
        }, 50);
        return () => clearInterval(interval);
    }, [activeIndexTheme, maxYear]);

    return (
        <div className="app">
            <RadialSelector setActiveIndexTheme={setActiveIndexTheme}/>
            <div className="verticalLine"></div>
            <div className="gorizontalLine"></div>
            <h1 className="title">Исторические<br />даты</h1>
            <h2 className="date">
                <span>{minYear}</span> <span>{maxYear}</span>
            </h2>
            <Slider activeIndexTheme={activeIndexTheme}/>
        </div>
    );
};

export default App;




