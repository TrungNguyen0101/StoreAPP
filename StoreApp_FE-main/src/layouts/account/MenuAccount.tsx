import React, { useState } from "react";
import { Link } from "react-router-dom";
import { handlerLogOut } from "../../services/HandlerService";
type userType = {
  username: string;
};
const MenuAccount = (props: userType) => {
  return (
    <div className="pr-[100px] border-r-[2px]  max-lg:pr-0 ">
      <div className="mb-[30px]  max-md:mb-[20px]">
        <h5 className="uppercase">trang tài khoản</h5>
        <span className="text-[14px]">
          Xin chào, <b>{props.username} !</b>
        </span>
      </div>
      <div className="max-lg:border-b-[1px] mb-[15px] ">
        <div className="max-lg:w-[170px]">
          <div
            className={` mb-[15px] pb-[15px] max-md:pb-[5px]  max-md:mb-[5px] max-lg:border-0 border-b-[1px] `}
          >
            <a href="/account" className="account-text ">
              Thông tin tài khoản{" "}
            </a>
          </div>
          <div
            className={` mb-[15px] pb-[15px] max-md:pb-[5px]  max-md:mb-[5px] max-lg:border-0 border-b-[1px]`}
          >
            <a href="/account/address" className="account-text">
              Số địa chỉ{" "}
            </a>
          </div>
          <div
            className="mb-[15px] max-md:pb-[5px]  max-md:mb-[5px]  max-lg:border-0  border-b-[1px]"
            onClick={handlerLogOut}
          >
            <span className="account-text cursor-pointer">Đăng xuất</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuAccount;
