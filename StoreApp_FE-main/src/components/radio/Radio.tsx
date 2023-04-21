import React from "react";
import { useController } from "react-hook-form";

const Radio = (props: any) => {
  const { field } = useController(props);
  return (
    <div className="flex items-center gap-x-2 cursor-pointer">
      <input
        {...field}
        checked={props.checked}
        type="radio"
        value={props.value}
        id={props.value}
      />
      <label className="text-[16px]" htmlFor={props.value}>
        {props.children}
      </label>
    </div>
  );
};

export default Radio;
