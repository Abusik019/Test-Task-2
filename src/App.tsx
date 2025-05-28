import "./index.scss";
import RadialSelector from "./components/layouts/RadialSelector";
import Slider from "./components/layouts/Slider";
import { useState } from "react";
import { YearCounter } from "./components/layouts/YearCounter";

const App = () => {
    const [activeIndexTheme, setActiveIndexTheme] = useState<number>(0);

    return (
        <div className="app">
            <RadialSelector setActiveIndexTheme={setActiveIndexTheme} />
            <div className="verticalLine"></div>
            <div className="gorizontalLine"></div>
            <h1 className="title">Исторические<br />даты</h1>
            <YearCounter activeIndexTheme={activeIndexTheme} />
            <Slider activeIndexTheme={activeIndexTheme} />
        </div>
    );
};

export default App;