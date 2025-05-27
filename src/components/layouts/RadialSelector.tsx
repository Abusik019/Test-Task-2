import "../style.scss";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { circleItems } from "../../mocks";
import { ArrowIcon } from "../../assets/ArrowIcon";

const RADIUS = 265;
const DOT_COUNT = 6;
const ROTATION_PER_DOT = 360 / DOT_COUNT;
const ANGLE_OFFSET = -60

type Props = {
    setActiveIndexTheme: (index: number) => void
}

const RadialSelector: React.FC<Props> = ({ setActiveIndexTheme }) => {
    const circleRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [rotation, setRotation] = useState(0);

    const handleDotClick = (index: number) => {
        if (!circleRef.current || index === activeIndex) return;

        const targetRotation = -index * ROTATION_PER_DOT;
        let diff = targetRotation - rotation;

        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;

        const newRotation = rotation + diff;

        gsap.to(circleRef.current, {
            rotation: newRotation,
            duration: 0.7,
            ease: "linear"
        });

        setRotation(newRotation);
        setActiveIndex(index);
        setActiveIndexTheme(index);
    };

    const dots = circleItems.map((item, i) => {
        const angle = (i * ROTATION_PER_DOT + ANGLE_OFFSET) * Math.PI / 180;
        const x = Math.cos(angle) * RADIUS;
        const y = Math.sin(angle) * RADIUS;

        return (
            <div
                key={item.id}
                className={`dot ${i === activeIndex ? "active" : ""}`}
                style={{
                    transform: `translate(${x}px, ${y}px) rotate(${-rotation}deg)`
                }}
                onClick={() => handleDotClick(i)}
            >
                <h2 className="dot__index">{item.id}</h2>
                <span className="dot__text">{item.label}</span>
            </div>
        );
    });

    return (
        <div className="radialContainer">
            <div className="radialChanger">
                <span>0{activeIndex + 1}/06</span>
                <div>
                    <button 
                        className="radialBtn" 
                        onClick={() => activeIndex > 0 && handleDotClick(activeIndex - 1)}
                        disabled={activeIndex === 0}
                        style={{ opacity: activeIndex === 0 ? 0.5 : 1 }}
                    >
                        <ArrowIcon 
                            color="#42567A"
                            strokeWidth="1.5"
                            rotate={180}
                        />
                    </button>
                    <button 
                        className="radialBtn" 
                        onClick={() => activeIndex < 6 && handleDotClick(activeIndex + 1)}
                        disabled={activeIndex === 5}
                        style={{ opacity: activeIndex === 5 ? 0.5 : 1 }}
                    >
                        <ArrowIcon 
                            color="#42567A"
                            strokeWidth="1.5"
                            rotate={0}
                        />
                    </button>
                </div>
            </div>
            <div className="circle" ref={circleRef}>
                {dots}
            </div>
        </div>
    );
};

export default RadialSelector;
