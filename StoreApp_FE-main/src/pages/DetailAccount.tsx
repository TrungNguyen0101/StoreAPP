import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { parseJwt } from "../services/HandlerService";
import MenuAccount from "../layouts/account/MenuAccount";
const DetailAccount = () => {
  type userType = {
    username: string;
    userID: string;
    role: string;
    email: string;
    number: string;
  };
  const token: string | null = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [user, setUser] = useState<userType>({
    username: "",
    userID: "",
    role: "",
    email: "",
    number: "",
  });
  useEffect(() => {
    if (token !== null) {
      try {
        setUser(parseJwt(token));
      } catch (error) {
        console.error(error);
      }
    }
    setAddress(window.location.href);
  }, [token]);
  useEffect(() => {
    if (token === null) {
      console.log(123);
      navigate("/");
    }
  }, [navigate, token]);
  return (
    <div className="pb-[40px] ">
      <div className="text-[14px] px-[30px] py-[4px] bg-[#f6f6f6]">
        {address === "http://localhost:3000/account/address" ? (
          <div>
            <span className="text-[#999999]">
              <a href="/" className="mr-[5px] text-[#2f80ed]">
                Trang chủ
              </a>
              / {` `}
            </span>
            <span className="text-[#999999]">
              <a href="/account" className="mr-[5px] text-[#2f80ed]">
                Tài khoản
              </a>
              /
            </span>
            <span className="ml-[5px] text-[#999999]">Địa chỉ</span>
          </div>
        ) : (
          <div>
            <span className="text-[#999999]">
              <a href="/" className="mr-[5px] text-[#2f80ed]">
                Trang chủ
              </a>
              /
            </span>
            <span className="ml-[5px] text-[#999999]">Tài khoản</span>
          </div>
        )}
      </div>
      <div className="pt-[20px] px-[30px] flex gap-x-[40px] max-lg:flex-col">
        <MenuAccount {...user}></MenuAccount>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DetailAccount;
