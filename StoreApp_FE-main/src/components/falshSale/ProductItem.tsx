import React, { useState } from "react";
import CustomizedDialogs from "../dialog/DialogViewProduct";
import Star from "../star/Star";
import NumberFormat from "react-number-format";

//dialog way in reactjs css
const ProductItem = (props: any) => {
  // console.log("🚀 ~ file: ProductItem.tsx:8 ~ ProductItem ~ props:", props);
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const discount: number = Math.round((props?.item?.price * 50) / 100);
  const nf = new Intl.NumberFormat();
  const discountValue = discount.toString().replace(/\$|,|\./g, "");
  const formattedDiscountValue = nf.format(parseFloat(discountValue));
  const formattedNoDiscountValue = nf.format(parseFloat(props?.item?.price));
  const count = Object.keys(props.counts).map((key) => {
    return {
      productID: key,
      count: props.counts[key],
    };
  });
  let filteredProducts: any = count.filter(
    (product: any) => product.productID === props.item._id
  );

  // const filteredArr = props?.counts.filter(
  //   (el: any) => !props?.item._id.includes(el)
  // );
  // console.log(
  //   "🚀 ~ file: ProductItem.tsx:19 ~ ProductItem ~ filteredArr:",
  //   filteredArr
  // );

  return (
    <div className="w-[216px] max-md:w-[163px]">
      <div className="product-image cursor-pointer duration-300 h-[324px] relative">
        <img
          src={props?.item?.image1}
          alt=""
          className=" object-cover w-full h-full "
        />
        <img
          src={props?.item?.image2}
          alt=""
          className="image-hover object-cover w-full h-full"
        />
        <div className="product-view">
          <div className="flex items-center justify-center rounded-lg  bg-white">
            <div
              className="product-view_hover p-[10px] relative"
              onClick={() => setOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 hover:text-red-500 duration-300 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div className="tooltip">Xem nhanh</div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[10px] py-[15px] ">
        <div className="flex justify-between">
          <span className="uppercase text-[#969696]">{props?.item?.brand}</span>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg> */}
        </div>
        <h3 className="product-name font-normal">{props?.item?.name}</h3>
        <div className="flex items-center mt-[5px]">
          <Star></Star>
          <Star></Star>
          <Star></Star>
          <Star></Star>
          <Star></Star>
          <span className="text-[12px] ml-[10px]">(1 đánh giá)</span>
        </div>
        <div className="mt-[5px] text-[#df0000] font-semibold">
          {formattedDiscountValue}đ
        </div>
        <div className="flex gap-x-[10px]">
          <span className="line-through text-[14px] text-[#666666]">
            {formattedNoDiscountValue}đ
          </span>
          <div className="px-[5px] py-[2px] bg-[#d84144] text-[12px] rounded-lg text-[white]">
            -50%
          </div>
        </div>
        <div className="relative mt-[10px]">
          {/* <progress value="50" max="100"></progress> */}
          <span className="absolute w-full text-left top-[2%] left-[50%] translate-x-[-50%] text-[14px] font-medium text-[#27190c] ">
            {`Đã bán được: ${filteredProducts[0]?.count || 0} sản phẩm`}
          </span>
        </div>
      </div>
      <CustomizedDialogs
        check={open}
        getOpen={(item: any) => {
          setOpen(item);
        }}
        props={props}
        price={formattedDiscountValue}
        priceNo={formattedNoDiscountValue}
      ></CustomizedDialogs>
    </div>
  );
};

export default ProductItem;
