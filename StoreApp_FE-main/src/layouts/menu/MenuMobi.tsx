import React, { useEffect, useRef, useState } from "react";

const MenuMobi = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <div className="cursor-pointer ">
      <div className="w-7 h-7" onClick={() => setShowMenu(!showMenu)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      <div
        className={`${showMenu ? "active " : ""} menu-1023`}
        onClick={() => setShowMenu(true)}
      >
        <div className="flex w-full items-center py-[10px] px-[15px] gap-x-4 bg-[#080808]">
          <div>
            <img
              src="https://images.unsplash.com/photo-1676321228272-0cccce03e290?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
              alt=""
              className="w-[30px] h-[30px] rounded-full object-cover"
            />
          </div>
          <div className="text-white text-[16px]">
            <div>Tài khoản</div>
            <div className="text-[12.8px] ">Đăng nhập</div>
          </div>
        </div>
        <div className="text-[16px] py-[20px] px-[15px]">
          <li>Trang chủ</li>
          <li className="relative">
            <span>Sản phẩm</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 absolute right-0 top-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </li>
          <li className="relative">
            <span>Chương trình khuyến mãi</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 absolute right-0 top-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </li>
          <li>Đơn hàng</li>
          <li>Hệ thống cửa hàng</li>
          <li>Giới thiệu</li>
          <li>Tin tức</li>
          <li>Liên hệ</li>
        </div>
      </div>
      <div
        className={`${showMenu ? "active" : ""} menu-overlay`}
        onClick={() => setShowMenu(false)}
      ></div>
    </div>
  );
};

export default MenuMobi;
