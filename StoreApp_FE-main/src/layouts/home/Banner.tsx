import React from "react";
import Slider from "react-slick";
import Policy from "../../components/policy/Policy";
import banner_1 from "../../images/banner_1.jpg";
import banner_2 from "../../images/banner_2.jpg";
import icon_1 from "../../images/icon_1.jpg";
import icon_2 from "../../images/icon_2.jpg";
import icon_3 from "../../images/icon_3.jpg";
import icon_4 from "../../images/icon_4.jpg";
const settings: {} = {
  dots: true,
  infinite: false,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
const Banner = () => {
  return (
    <div>
      <Slider {...settings}>
        <div>
          <img src={banner_2} alt="" className="object-cover" />
        </div>
        <div>
          <img src={banner_2} alt="" />
        </div>
      </Slider>
      <div className="pt-[40px] pb-[55px] px-[40px] max-lg:px-[10px]  max-lg:pb-[30px] flex justify-between  max-lg:flex-wrap max-md:pb-[0px]  max-md:pt-[20px]">
        <Policy
          icon={icon_1}
          title="Miễn phí vận chuyển"
          text="Nhận hàng trong vòng 3 ngày"
        ></Policy>
        <Policy
          icon={icon_2}
          title="Quà tặng hấp dẫn"
          text="Nhiều ưu đãi khuyến mãi hot"
        ></Policy>
        <Policy
          icon={icon_3}
          title="Bảo đảm chất lượng"
          text="Sản phẩm đã dược kiểm định"
        ></Policy>
        <Policy
          icon={icon_4}
          title="Hotline: 0385566904"
          text="Dịch vụ hỗ trợ bạn 24/7"
        ></Policy>
      </div>
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
export default Banner;
