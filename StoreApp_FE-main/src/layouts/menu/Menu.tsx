import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MenuMobi from "./MenuMobi";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  handlerAPIGet,
  handlerLogOut,
  parseJwt,
} from "../../services/HandlerService";
type typeUser = {
  username: string;
  userID: string;
};
const Menu = () => {
  const [isMenuHidden, setIsMenuHidden] = useState<boolean>(false);
  const [isMenuMobi, setIsMenuMobi] = useState<boolean>(false);
  const [listCart, getListCart] = useState<any>();
  const token: string | null = sessionStorage.getItem("token");
  const [user, setUser] = React.useState<typeUser>({
    username: "",
    userID: "",
  });
  const navigate = useNavigate();
  const settings: {} = {
    dots: true,
    infinite: false,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 3,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  useEffect(() => {
    const handlerGetCart = async () => {
      const result = await handlerAPIGet(
        `https://stroreapp-be.herokuapp.com/api/product/findAllProductByUserId?accountID=${user.userID}`
      );
      if (result.data.result.length > 0) {
        getListCart(result.data.result);
      }
    };
    handlerGetCart();
  }, [user.userID]);
  useEffect(() => {
    function handleResize() {
      setIsMenuHidden(window.innerWidth < 1024);
      setIsMenuMobi(window.innerWidth < 1024);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  React.useEffect(() => {
    if (token !== null) {
      try {
        setUser(parseJwt(token));
      } catch (error) {
        console.error(error);
      }
    }
  }, [token]);
  return (
    <div>
      <div className="">
        <div className="slogan h-[40px] max-md:h-[30px] relative">
          <h3 className="h-full text-center pt-[10px] bg-[#cd6420] font-normal text-white max-md:text-[12px]  max-md:pt-[7px]">
            CHÀO HÈ SÔI NỔI - MỎI TAY SĂN QUÀ - ƯU ĐÃI X3{" "}
          </h3>
          <div className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.2"
              stroke="currentColor"
              className="absolute right-2 top-[11%] w-7 h-7 rounded-[100%] bg-[#e6b18f] text-center text-[#7f4a28] max-md:w-5 max-md:h-5 max-md:top-[20%]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="flex py-[20px] max-lg:grid max-lg:grid-cols-3 items-center">
          {isMenuMobi ? <MenuMobi></MenuMobi> : ""}
          <div>
            <b className="text-[24px] px-[35px] max-md:ml-[-90px] ">
              <a href="/">Rone</a>
            </b>
          </div>
          <div
            className={
              isMenuHidden
                ? "hidden"
                : "w-[800px]  max-xl:w-[550px] items-center"
            }
          >
            <Slider {...settings} className="text-center cursor-pointer">
              <li>
                <a className="link" href="/">
                  <span data-content="Trang chủ">Trang chủ</span>
                </a>
              </li>
              {/* <li>
                <a className="link">
                  <span data-content="Sản phẩm" className=" ml-[-40px]">
                    Sản phẩm
                  </span>
                </a>
              </li>
              <li>
                <a className="link">
                  <span
                    data-content="Chương trình khuyến mãi"
                    className=" ml-[-30px] whitespace-nowrap"
                  >
                    Chương trình khuyến mãi
                  </span>
                </a>
              </li>
              <li>
                <a className="link">
                  <span data-content="Đơn hàng">Đơn hàng</span>
                </a>
              </li>
              <li>
                <a className="link">
                  <span data-content="Hệ thống cửa hàng">
                    Hệ thống cửa hàng
                  </span>
                </a>
              </li>
              <li>
                <a className="link">
                  <span data-content="Giới thiệu">Giới thiệu</span>
                </a>
              </li>
              <li>
                <a className="link">
                  <span data-content="Tin tức">Tin tức</span>
                </a>
              </li>
              <li>
                <a className="link">
                  <span data-content="Liên hệ">Liên hệ</span>
                </a>
              </li> */}
            </Slider>
          </div>
          <div className="flex ml-[200px] max-lg:ml-[40px] gap-x-5 max-md:ml-[-75px] ">
            {/* <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div> */}
            <div className="icon-user cursor-pointer relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className=" w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>

              <div className="user  absolute left-[50%] duration-300  top-[140%] invisible opacity-0 translate-x-[-50%]  z-[-10] flex flex-col  bg-[#333] text-white rounded-lg whitespace-nowrap text-[14px]  ">
                <span className="hover:bg-[#666666] duration-300  p-[7px] rounded-t-lg  ">
                  {token ? (
                    <a href="/account">Tài khoản</a>
                  ) : (
                    <a href="/signin">Đăng nhập</a>
                  )}
                </span>
                <span className="hover:bg-[#666666] duration-300 p-[7px] rounded-b-lg  ">
                  {token ? (
                    <span onClick={handlerLogOut}>
                      <a href="/">Đăng xuất</a>
                    </span>
                  ) : (
                    <a href="/signup">Đăng ký</a>
                  )}
                </span>
              </div>
            </div>
            {/* <div className="relative cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              <div className="number text-[12px] text-center text-white">0</div>
            </div> */}
            <Link to="/cart">
              <div className="relative cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <div className="number text-[12px] text-center text-white">
                  {listCart && listCart.length > 0 ? (
                    <span>{listCart.length}</span>
                  ) : (
                    <span>0</span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
function SampleNextArrow(props: any) {
  const { className, onClick } = props;
  return <div className={`${className} next`} onClick={onClick} />;
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return <div className={`${className} prev`} onClick={onClick} />;
}

export default Menu;
