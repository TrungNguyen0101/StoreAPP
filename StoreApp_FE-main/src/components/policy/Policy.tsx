import React from "react";

const Policy = (props: any) => {
  return (
    <div className="policy flex items-center">
      <div>
        <img src={props.icon} alt="" />
      </div>
      <div className="flex flex-col ml-[15px]">
        <span className="font-bold">{props.title}</span>
        <span className=" text-[14px]">{props.text}</span>
      </div>
    </div>
  );
};

export default Policy;
