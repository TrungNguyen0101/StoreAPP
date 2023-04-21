import React, { useEffect, useState } from "react";
import CardItem from "../../components/card/CardItem";
import Slider from "react-slick";
import card_1 from "../../images/card_1.jpg";
import card_2 from "../../images/card_2.jpg";
import card_3 from "../../images/card_3.jpg";
import card_4 from "../../images/card_4.jpg";
import card_5 from "../../images/card_5.jpg";
import card_6 from "../../images/card_6.jpg";
const Card = () => {
  const [screen, setScreen] = useState(false);
  const settings: {} = {
    dots: true,
    infinite: false,
    speed: 700,
    slidesToShow: 8,
    slidesToScroll: 8,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  useEffect(() => {
    function handleResize() {
      setScreen(window.innerWidth < 1024);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="pb-[70px] max-md:pb-[40px] ">
      <h2 className="text-[36px] text-center">Thời trang Rone</h2>
      {screen ? (
        <div className="">
          <Slider
            {...settings}
            className="pt-[25px] pr-[20px] max-md:pr-[10px]"
          >
            <CardItem icon={card_1} name="Đầm" number="15"></CardItem>
            <CardItem icon={card_2} name="Vest - Blazer" number="5"></CardItem>
            <CardItem icon={card_3} name="Đồ thể thao" number="10"></CardItem>
            <CardItem icon={card_4} name="Đồ bơi" number="15"></CardItem>
            <CardItem icon={card_5} name="Đồ ngủ" number="10"></CardItem>
            <CardItem icon={card_6} name="Áo sơ mi" number="15"></CardItem>
          </Slider>
        </div>
      ) : (
        <div className="pt-[25px] flex flex-row justify-between gap-x-[20px] px-[20px] items-center ">
          <CardItem icon={card_1} name="Đầm" number="15"></CardItem>
          <CardItem icon={card_2} name="Vest - Blazer" number="5"></CardItem>
          <CardItem icon={card_3} name="Đồ thể thao" number="10"></CardItem>
          <CardItem icon={card_4} name="Đồ bơi" number="15"></CardItem>
          <CardItem icon={card_5} name="Đồ ngủ" number="10"></CardItem>
          <CardItem icon={card_6} name="Áo sơ mi" number="15"></CardItem>
        </div>
      )}
    </div>
  );
};
function SampleNextArrow(props: any) {
  const { className, onClick } = props;
  return <div className={`${className} next_banner`} onClick={onClick} />;
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return <div className={`${className} prev_banner`} onClick={onClick} />;
}
export default Card;
