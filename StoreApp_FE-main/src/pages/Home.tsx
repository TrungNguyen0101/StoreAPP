import React, { useState } from "react";
import Banner from "../layouts/home/Banner";
import Card from "../layouts/home/Card";
import Coupon from "../layouts/home/Coupon";
import FlashSale from "../layouts/home/FlashSale";
import Menu from "../layouts/menu/Menu";
import { parseJwt } from "../services/HandlerService";
type typeUser = {
  username: string;
  userID: string;
  role: string;
};
const Home = () => {
  const [active, setActive] = useState<Boolean>(false);
  const token: string | null = sessionStorage.getItem("token");
  const [user, setUser] = React.useState<typeUser>({
    username: "",
    userID: "",
    role: "",
  });
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
    <div className="relative">
      <div className="fixed z-50 top-[20%] ">
        <div
          className={`${
            active ? "translate-x-[-180px]" : ""
          } manage-icon flex items-center duration-300`}
        >
          {(user.role === "admin" || user.role === "manage") && (
            <span className="px-[20px] py-[10px] rounded-r-lg bg-[#5596ee] text-white cursor-pointer">
              <a href="/manage"> Quản lý sản phẩm</a>
            </span>
          )}
          {!active && (
            <span
              className="manage-icon_hover p-[5px] cursor-pointer text-white bg-gray-800 ml-[10px] rounded-lg "
              onClick={() => setActive(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </span>
          )}
          {active && (
            <span
              className="relative z-50 p-[5px] text-white bg-gray-800 ml-[10px] rounded-lg cursor-pointer"
              onClick={() => setActive(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          )}
        </div>
      </div>
      <Menu></Menu>
      <Banner></Banner>
      {/* <Card></Card> */}
      <Coupon></Coupon>
      <FlashSale></FlashSale>
    </div>
  );
};

export default Home;
