import React, { useState } from "react";

const CardItem = (props: any) => {
  return (
    <div className="card flex flex-col items-center ">
      <div>
        <img src={props.icon} alt="" />
      </div>
      <div className="mt-[10px] font-semibold">{props.name}</div>
      <span className="text-[14px] text-[#888888]">
        {`${props.number} sản phẩm`}{" "}
      </span>
    </div>
  );
};

export default CardItem;
