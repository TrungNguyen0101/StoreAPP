import React from "react";
import CouponItem from "../../components/coupon/CouponItem";
import coupon_10 from "../../images/coupon_10.jpg";
import Slider from "react-slick";
const settings: {} = {
  dots: true,
  infinite: false,
  speed: 700,
  slidesToShow: 4,
  slidesToScroll: 2,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const Coupon = () => {
  return (
    <div className="pl-[20px] pr-[40px] max-lg:pr-[20px] max-lg:pl-[10px]">
      <Slider
        {...settings}
        className="cursor-pointer flex flex-row justify-between pb-[40px] max-md:pb-[0px] "
      >
        <CouponItem icon={coupon_10} coupon="GiamGia1"></CouponItem>
        <CouponItem icon={coupon_10} coupon="GiamGia2"></CouponItem>
        <CouponItem icon={coupon_10} coupon="GiamGia3"></CouponItem>
        <CouponItem icon={coupon_10} coupon="GiamGia4"></CouponItem>
      </Slider>
    </div>
  );
};
function SampleNextArrow(props: any) {
  const { className, onClick } = props;
  return <div className={`${className} next_coupon`} onClick={onClick} />;
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return <div className={`${className} prev_coupon`} onClick={onClick} />;
}
export default Coupon;
