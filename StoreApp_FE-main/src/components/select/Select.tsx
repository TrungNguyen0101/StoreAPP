import React from "react";
import { useController } from "react-hook-form";
const Select = (props: any) => {
  const { field } = useController(props);
  return (
    <div className="flex flex-col items-start mb-[10px]">
      <label htmlFor={props.name} className="text-[14px] mb-[5px]">
        {props.children} <span className="text-red-500">*</span>
      </label>
      <select
        {...field}
        id={props.name}
        name={props.name}
        className="px-[15px] py-[10px] duration-300 rounded-md w-[200px] border-[1px] focus:border-[#2EBAC1] focus:bg-white  outline-none uppercase font-semibold "
      >
        <option value="EGANY">EGANY</option>
        <option value="MANGO">MANGO</option>
        <option value="LEVI">LEVI</option>
      </select>
    </div>
  );
};

export default Select;
