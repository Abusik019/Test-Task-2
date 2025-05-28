import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ArrowIcon } from "../../assets/ArrowIcon";
import { circleItems } from "../../mocks";
import "../style.scss";

type Props = {
    activeIndexTheme?: number;
};

const Slider: React.FC<Props> = ({ activeIndexTheme }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef<any>(null);

    const [opacity, setOpacity] = useState(1);
    const prevTheme = useRef(activeIndexTheme);

    const [displayedTheme, setDisplayedTheme] = useState(activeIndexTheme);

    useEffect(() => {
        if (prevTheme.current !== activeIndexTheme) {
            setOpacity(0);
            setTimeout(() => {
                setActiveIndex(0);
                setDisplayedTheme(activeIndexTheme);
                if (swiperRef.current) {
                    swiperRef.current.slideTo(0, 0);
                }
                setOpacity(1);
            }, 300); 
            prevTheme.current = activeIndexTheme;
        }
    }, [activeIndexTheme]);

    return (
        <div className="sliderContainer">
            <button
                className="sliderBtn prev"
                id="custom-prev"
                style={{ display: activeIndex === 0 ? "none" : "flex" }}
            >
                <ArrowIcon
                    color="#3877EE"
                    strokeWidth="1.5"
                    width="20"
                    height="20"
                    rotate={180}
                />
            </button>
            <button
                className="sliderBtn next"
                id="custom-next"
                style={{ display: isEnd ? "none" : "flex" }}
            >
                <ArrowIcon
                    color="#3877EE"
                    strokeWidth="1.5"
                    width="20"
                    height="20"
                    rotate={0}
                />
            </button>
            <div
                style={{
                    transition: "opacity 0.3s ease-in-out",
                    opacity,
                }}
            >
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        prevEl: "#custom-prev",
                        nextEl: "#custom-next",
                    }}
                    spaceBetween={50}
                    slidesPerView={3}
                    onSwiper={swiper => {
                        swiperRef.current = swiper;
                        setIsEnd(swiper.isEnd);
                    }}
                    onSlideChange={swiper => {
                        setActiveIndex(swiper.activeIndex);
                        setIsEnd(swiper.isEnd);
                    }}
                >
                    {displayedTheme !== undefined &&
                        circleItems[displayedTheme].items.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="slide">
                                    <h3 className="slideYear">{item.year}</h3>
                                    <p className="sliderDescription">
                                        {item.description}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Slider;