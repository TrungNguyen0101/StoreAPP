import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../components/input/Input";
import Select from "../components/select/Select";
import SelectSize from "../components/select/SelectSize";
import UploadImage from "../components/uploadImage/UploadImage";
import { handlerAPIPost } from "../services/HandlerService";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AddProduct from "../layouts/manage/AddProduct";

const Manage = () => {
  const [address, setAddress] = useState("");
  useEffect(() => {
    setAddress(window.location.href);
  }, []);
  return (
    <div className="pb-[40px]">
      <div className="text-[14px] px-[30px] py-[4px] bg-[#f6f6f6]">
        <div>
          <span className="text-[#999999]">
            <a href="/" className="mr-[5px] text-[#2f80ed]">
              Trang chủ
            </a>
            / {` `}
          </span>
          {address === "http://localhost:3000/manage" && (
            <span className="ml-[5px] text-[#999999]">Thêm sản phẩm</span>
          )}
          {address === "http://localhost:3000/manage/list" && (
            <span className="ml-[5px] text-[#999999]">Danh sách sản phẩm</span>
          )}
          {address === "http://localhost:3000/manage/store" && (
            <span className="ml-[5px] text-[#999999]">Danh sách sản phẩm</span>
          )}
          {address === "http://localhost:3000/manage/list-storage" && (
            <span className="ml-[5px] text-[#999999]">Danh sách lưu trữ</span>
          )}
        </div>
      </div>
      <div className="pt-[20px] px-[30px] flex gap-x-[40px] max-lg:flex-col">
        <div className="pr-[100px] border-r-[2px]  max-lg:pr-0 ">
          <div className="max-lg:border-b-[1px] mb-[15px] ">
            <div className="max-lg:w-[170px]">
              <div
                className={` mb-[15px] pb-[15px] max-md:pb-[5px]  max-md:mb-[5px] max-lg:border-0 border-b-[1px]`}
              >
                <a href="/manage" className="account-text">
                  Thêm sản phẩm
                </a>
              </div>

              <div
                className={` mb-[15px] pb-[15px] max-md:pb-[5px]  max-md:mb-[5px] max-lg:border-0 border-b-[1px] `}
              >
                <a href="/manage/list" className="account-text ">
                  Danh sách sản phẩm
                </a>
              </div>
              <div
                className={` mb-[15px] pb-[15px] max-md:pb-[5px]  max-md:mb-[5px] max-lg:border-0 border-b-[1px]`}
              >
                <a href="/manage/list-storage" className="account-text">
                  Danh sách lưu trữ
                </a>
              </div>
              <div className="mb-[15px] max-md:pb-[5px]  max-md:mb-[5px]  max-lg:border-0  border-b-[1px]">
                <span className="account-text cursor-pointer">Đăng xuất</span>
              </div>
            </div>
          </div>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Manage;
