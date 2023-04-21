import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getImageURL_1, getImageURL_2 } from "../../redux/reduxSlice";

import { handlerAPIPost, handlerAPIPost1 } from "../../services/HandlerService";
// import { useDispatch } from "react-redux";
// import { getImageURL } from "../redux/reduxSlice";
// import styled from "styled-components";
interface propsURL {
  image1?: string | undefined;
  image2?: string | undefined;
  check123?: boolean;
}
const UploadImage = ({ image1, image2, check123 = false }: propsURL) => {
  const dispatch = useDispatch();
  const [URL_1, setURL_1] = useState("");
  const [URL_2, setURL_2] = useState("");
  const [loading_1, setLoading_1] = useState(false);
  const [loading_2, setLoading_2] = useState(false);
  const uploadProfileImg = async (formData: any) => {
    try {
      const result = await handlerAPIPost1(
        "https://api.cloudinary.com/v1_1/dsrvia1wu/image/upload",
        formData
      );
      const file: any = await result;
      return file.data.url;
    } catch (err) {
      console.log(err);
    }
  };
  const upLoadImage: any = async (e: any, check: string) => {
    const formData = new FormData();
    if (check === "1") {
      formData.append("file", e.target.files[0]);
    } else {
      formData.append("file", e.target.files[0]);
    }
    formData.append("upload_preset", "StoreApp_TN");
    const path = await uploadProfileImg(formData);

    return path;
  };
  const handlerSubmitImage: any = async (e: any, check: string) => {
    if (check === "1") {
      setURL_1("");
      setLoading_1(true);
      const result = await upLoadImage(e, check);
      setURL_1(result);
      dispatch(getImageURL_1(result));
      setLoading_1(false);
    } else {
      setURL_2("");
      setLoading_2(true);
      const result = await upLoadImage(e, check);
      setURL_2(result);
      dispatch(getImageURL_2(result));
      setLoading_2(false);
    }
  };
  return (
    <div className="flex gap-x-[50px]">
      <div className="">
        <div className="relative mb-[20px] p-[2px] border-[1px] w-[220px] h-[330px] shadow-2xl">
          <img
            src={URL_1 ? URL_1 : image1}
            alt=""
            className="text-center m-auto h-full object-cover"
          />
          {loading_1 && (
            <div className="absolute top-[40%] right-[30%]">
              <div className="lds-dual-ring"></div>
            </div>
          )}
        </div>

        {/* {!URL && ( */}
        {!URL_1 && !image1 && (
          <div className="cursor-pointer font-medium p-[10px] border-[2px] border-transparent bg-[#e22d28]  text-white hover:bg-white hover:text-[#e22d28] hover:border-[#e22d28] duration-300 text-[15px] text-center rounded-[10px] h-[35px] w-[150px] relative">
            <input
              onChange={(e) => handlerSubmitImage(e, "1")}
              type="file"
              className="w-full h-full absolute z-[-1] overflow-hidden opacity-0"
              id="file"
            />
            <label
              htmlFor="file"
              className="z-10 w-full h-full absolute left-[0px] top-[5px]"
            >
              Tải hình ảnh 1 lên
            </label>
          </div>
        )}
        {/* {URL && ( */}
        {(URL_1 || image1) && (
          <div className="flex gap-x-[20px]">
            <div
              className={`cursor-pointer font-medium p-[10px] border-[2px] border-transparent bg-[#e22d28]  text-white hover:bg-white hover:text-[#e22d28] hover:border-[#e22d28] duration-300 text-[15px] text-center rounded-[10px]  w-[100px] relative  ${
                check123 ? "py-[15px]" : ""
              }`}
            >
              <input
                onChange={(e) => handlerSubmitImage(e, "1")}
                type="file"
                className="w-full h-full absolute z-[-1] overflow-hidden opacity-0"
                id="file"
              />
              <label
                htmlFor="file"
                className={`z-10 w-full h-full absolute left-[0px] ${
                  check123 ? "top-[5px]" : ""
                }`}
              >
                Cập nhập
              </label>
            </div>
            {!check123 && (
              <div
                className="cursor-pointer font-medium p-[10px] border-[2px] border-transparent bg-[#e22d28]  text-white hover:bg-white hover:text-[#e22d28] hover:border-[#e22d28] duration-300 text-[15px] text-center rounded-[10px] w-[100px]"
                onClick={() => {
                  setURL_1("");
                  dispatch(getImageURL_1(""));
                }}
              >
                Xóa
              </div>
            )}
          </div>
        )}
      </div>
      <div className="">
        <div className="relative mb-[20px] p-[2px] border-[1px] w-[220px] h-[330px] shadow-2xl">
          <img
            src={URL_2 ? URL_2 : image2}
            alt=""
            className="text-center m-auto h-full object-cover"
          />
          {loading_2 && (
            <div className="absolute top-[40%] right-[30%]">
              <div className="lds-dual-ring"></div>
            </div>
          )}
        </div>

        {/* {!URL && ( */}
        {!URL_2 && !image2 && (
          <div
            className={`cursor-pointer font-medium p-[5px] border-[2px] border-transparent bg-[#e22d28]  text-white hover:bg-white hover:text-[#e22d28] hover:border-[#e22d28] duration-300 text-[15px] text-center rounded-[10px] h-[35px] w-[150px] relative `}
          >
            <input
              onChange={(e) => handlerSubmitImage(e, "2")}
              type="file"
              className="w-full h-full absolute z-[-1] overflow-hidden opacity-0"
              id="file_2"
            />
            <label
              htmlFor="file_2"
              className={`z-10 w-full h-full absolute left-[0px]`}
            >
              Tải hình ảnh 2 lên
            </label>
          </div>
        )}
        {/* {URL && ( */}
        {(URL_2 || image2) && (
          <div className="flex gap-x-[20px]">
            <div
              className={`cursor-pointer font-medium p-[10px] border-[2px] border-transparent bg-[#e22d28]  text-white hover:bg-white hover:text-[#e22d28] hover:border-[#e22d28] duration-300 text-[15px] text-center rounded-[10px]  w-[100px] relative  ${
                check123 ? "py-[15px]" : ""
              }`}
            >
              <input
                onChange={(e) => handlerSubmitImage(e, "2")}
                type="file"
                className="w-full h-full absolute z-[-1] overflow-hidden opacity-0"
                id="file_2"
              />
              <label
                htmlFor="file_2"
                className={`z-10 w-full h-full absolute left-[0px]  ${
                  check123 ? "top-[5px]" : ""
                } `}
              >
                Cập nhập
              </label>
            </div>
            {!check123 && (
              <div
                className={`cursor-pointer font-medium p-[10px] border-[2px] border-transparent bg-[#e22d28]  text-white hover:bg-white hover:text-[#e22d28] hover:border-[#e22d28] duration-300 text-[15px] text-center rounded-[10px] w-[100px] `}
                onClick={() => {
                  setURL_2("");
                  dispatch(getImageURL_2(""));
                }}
              >
                Xóa
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
