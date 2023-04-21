import React, { useState } from "react";
import { useController } from "react-hook-form";
import IconEyeClose from "../icons/IconEyeClose";
import IconEyeOpen from "../icons/IconEyeOpen";
const InputPassword = (props: any) => {
  const { field } = useController(props);
  const [togglePassword, setTogglePassword] = useState(false);

  return (
    <div className="flex flex-col items-start mb-[10px]">
      <label htmlFor={props.name} className="text-[14px] mb-[5px]">
        {props.children} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          {...field}
          id={props.name}
          name={props.name}
          type={togglePassword ? "text" : "password"}
          placeholder={props.placeholder}
          className=" px-[15px] py-[10px] duration-300 rounded-md w-[300px] border-[1px] focus:border-[#2EBAC1] focus:bg-white  outline-none "
        ></input>
        {/* toggle password */}
        {togglePassword ? (
          <IconEyeOpen
            className="absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer"
            onClick={() => {
              setTogglePassword(!togglePassword);
            }}
          ></IconEyeOpen>
        ) : (
          <IconEyeClose
            className="absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer"
            onClick={() => {
              setTogglePassword(!togglePassword);
            }}
          ></IconEyeClose>
        )}
      </div>
    </div>
  );
};

export default InputPassword;
