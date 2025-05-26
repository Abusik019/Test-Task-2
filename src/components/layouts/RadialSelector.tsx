import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import "../style.scss";

const RADIUS = 265;
const DOT_COUNT = 6;
const ROTATION_PER_DOT = 360 / DOT_COUNT;

const circleItems = [
    {
        id: 1,
        label: "Наука",
    },
    {
        id: 2,
        label: "Технологии",
    },
    {
        id: 3,
        label: "Кино",
    },
    {
        id: 4,
        label: "Спорт",
    },
    {
        id: 5,
        label: "Музыка",
    },
    {
        id: 6,
        label: "Искусство",
    },
]

const RadialSelector: React.FC = () => {
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
    };

    const dots = circleItems.map((item, i) => {
        const angle = (i * ROTATION_PER_DOT * Math.PI) / 180;
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
                <span className={`dot__text ${i === activeIndex ? "active" : ""} `}>{item.label}</span>
            </div>
        );
    });

    return (
        <div className="radial-container">
            <div className="circle" ref={circleRef}>
                {dots}
            </div>
        </div>
    );
};

export default RadialSelector;
