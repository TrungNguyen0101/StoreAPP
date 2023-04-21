import React from "react";
import { toast } from "react-toastify";

const CouponItem = (props: any) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(props.coupon);
    toast.success("Sao chép mã giảm giá thành công", {
      pauseOnHover: false,
      delay: 0,
      autoClose: 1500,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  return (
    <div>
      <div className="coupon-item py-[15px] px-[12px] flex flex-row items-center gap-x-[15px] ">
        <div>
          <img
            src={props.icon}
            alt=""
            className="w-[70px] h-[120px] object-cover"
          />
        </div>
        <div className="flex flex-col items-center ">
          <h3 className="text-[#f58a20]">{`NHẬP MÃ:${props.coupon}`}</h3>
          <span className="max-w-[145px] max-xl:max-w-full whitespace-normal text-center text-[#727272] text-[14px]">
            Mã giảm 10% cho đơn hàng tối thiểu 2tr
          </span>
          <div className="mt-[20px] flex flex-row items-center gap-x-[30px]">
            <button
              className="px-[5px] py-[3px] text-[white] text-[14px] bg-[#f58a20] hover:bg-[#8d4d0e] duration-300"
              onClick={handleCopy}
            >
              Sao chép
            </button>
            <a href="#1" className="text-[14px]  text-[#727272]">
              <span className="border-b-[1px] border-black">Điều kiện</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponItem;
