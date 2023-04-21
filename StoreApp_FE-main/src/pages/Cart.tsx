import React, { useEffect, useState } from "react";
import {
  handlerAPIGet,
  handlerAPIPost,
  parseJwt,
} from "../services/HandlerService";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type typeUser = {
  username: string;
  userID: string;
};
const Cart = () => {
  const [listCart, setListCart] = useState<any>();
  const [listProduct, setListProduct] = useState<any>();
  const [maxDate, setMaxDate] = useState<any>("");
  const [selectedValue, setSelectedValue] = useState("1");
  const [totalMoney, setTotalMoney] = useState("");
  const [discount, setDiscount] = useState("");
  const token: string | null = sessionStorage.getItem("token");
  const [user, setUser] = React.useState<typeUser>({
    username: "",
    userID: "",
  });
  const navigate = useNavigate();
  console.log("🚀 ~ file: Cart.tsx:25 ~ Cart ~ user:", user);
  const handleChange = (event: any) => {
    const selectedDate = event.target.value;
    if (selectedDate) {
      setMaxDate(selectedDate);
    }
  };
  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value);
  };
  const handlerSubmit = async () => {
    if (maxDate || selectedValue) {
      const result = {
        accountID: user.userID,
        date: maxDate,
        time: selectedValue,
        money: discount === "" ? totalMoney : discount,
      };
      const callAPI = await handlerAPIPost(
        "https://stroreapp-be.herokuapp.com/api/shipment/createShipment",
        result
      );
      if (callAPI) {
        toast.success("Đặt hàng thành công", {
          pauseOnHover: false,
          delay: 0,
          autoClose: 1500,
        });
        navigate("/account");
        setTimeout(() => {
          window.location.reload();
        }, 1300);
      }
    }
  };
  const handlerCoupon = (e: any) => {
    if (
      e.target.value === "GiamGia1" ||
      e.target.value === "GiamGia2" ||
      e.target.value === "GiamGia3" ||
      e.target.value === "GiamGia4"
    ) {
      const nf = new Intl.NumberFormat();
      const result = Math.round(
        (parseInt(totalMoney.toString().replace(/\$|,|\./g, "")) * 80) / 100
      );
      const discountValue = result.toString().replace(/\$|,|\./g, "");
      const formattedDiscountValue = nf.format(parseFloat(discountValue));
      setDiscount(formattedDiscountValue);
    } else {
      setDiscount("");
    }
  };
  useEffect(() => {
    const handlerGetProductById = async () => {
      if (listCart && listCart.length > 0) {
        const kq: any = await Promise.all(
          listCart.map(async (item: any) => {
            return await handlerAPIGet(
              `https://stroreapp-be.herokuapp.com/api/product/findProductById?id=${item.productID}`
            );
          })
        );

        const groupData = kq.reduce((acc: any, curr: any) => {
          if (!acc[curr?.data?.result?._id]) {
            acc[curr?.data?.result?._id] = {
              product: curr?.data,
              count: 1,
            };
          } else {
            acc[curr?.data?.result?._id].count++;
          }
          return acc;
        }, {});
        const arr = Object.values(groupData);
        setListProduct(arr);

        const totalPrice = kq.reduce(
          (acc: any, item: any) =>
            parseInt(acc) + parseInt(item.data.result.price),
          0
        );
        const nf = new Intl.NumberFormat();
        const discountMoney = Math.round((totalPrice * 50) / 100)
          .toString()
          .replace(/\$|,|\./g, "");
        const formattedDiscountMoney = nf.format(parseFloat(discountMoney));
        setTotalMoney(formattedDiscountMoney);

        const maxDate = kq.reduce((prev: any, current: any) => {
          const prevDate = new Date(prev.data.result.createdAt);
          const currentDate = new Date(current.data.result.createdAt);
          return prevDate.getTime() > currentDate.getTime() ? prev : current;
        });
        const newDate = moment(maxDate?.data?.result?.createdAt).add(7, "days");
        const formattedDate = newDate.format("yyyy-MM-DD");
        setMaxDate(formattedDate);
      }
    };
    handlerGetProductById();
  }, [listCart]);
  useEffect(() => {
    const handlerGetCart = async () => {
      const result = await handlerAPIGet(
        `https://stroreapp-be.herokuapp.com/api/product/findAllProductByUserId?accountID=${user.userID}`
      );
      if (result.data.result.length > 0) {
        setListCart(result.data.result);
      }
    };
    handlerGetCart();
  }, [user.userID]);
  useEffect(() => {
    if (token !== null) {
      try {
        setUser(parseJwt(token));
      } catch (error) {
        console.error(error);
      }
    }
  }, [token]);
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

          <span className="ml-[5px] text-[#999999]">Giỏ hàng</span>
        </div>
      </div>
      <div className=" px-[30px] mt-[20px] ">
        <h2 className="text-[35px] font-bold">Giỏ hàng</h2>
        <div className="flex gap-x-[10px]">
          <div className="overflow-auto h-[340px] w-[70%]">
            {listProduct?.length > 0 &&
              listProduct.map((item: any, index: string) => {
                const nf = new Intl.NumberFormat();
                const data = item?.product?.result;
                const discount: number = Math.round((data?.price * 50) / 100);
                const discountValue = discount
                  .toString()
                  .replace(/\$|,|\./g, "");
                const formattedDiscountValue = nf.format(
                  parseFloat(discountValue)
                );
                return (
                  <div key={index} className="mb-[15px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 cursor-pointer hover:text-red-500 duration-300"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <img
                          src={data?.image1}
                          alt=""
                          className="w-[70px] h-[100px] ml-[30px] object-cover"
                        />
                        <div className="flex flex-col ml-[30px]">
                          <span className="font-semibold">{data?.name}</span>
                          <span className="text-[#898989 ] text-[14px]">
                            {data?.brand}
                          </span>
                        </div>
                      </div>
                      <span className="pr-[0px] text-red-500 font-bold">
                        {formattedDiscountValue}{" "}
                        <span className="underline ">đ</span>
                        <span className="text-black mr-[10px] ml-[10px]">
                          x
                        </span>
                        <input
                          type="number"
                          value={item.count}
                          className="focus:none rounded-lg border-[1px] border-black w-[30px] text-center"
                        />
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="p-[20px] bg-[#f7f7f7] flex-basis-0 h-[300px] rounded-sm ">
            <h3 className="text-[24px] text-red-500 font-medium">
              Hẹn giờ nhận hàng
            </h3>
            <div className="flex gap-x-[10px] mt-[10px]">
              <div className="flex flex-col">
                <label htmlFor="date" className="text-[14px]">
                  Ngày nhận hàng
                </label>
                <input
                  type="date"
                  id="date"
                  value={maxDate}
                  onChange={handleChange}
                  className="p-[3px] rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="select" className="text-[14px]">
                  Giờ nhận hàng
                </label>
                <select
                  id="select"
                  className="p-[3px] rounded-lg"
                  onChange={handleSelectChange}
                  value={selectedValue}
                >
                  <option value="1">08h00-12h00</option>
                  <option value="2">14h00-18h00</option>
                  <option value="3">19h00-21h00</option>
                </select>
              </div>
            </div>
            <div className="mt-[20px] mb-[20px] flex justify-between">
              <span>Tổng cộng</span>
              <span className="text-red-500 font-bold">
                {totalMoney}
                <span className="underline">đ</span>
              </span>
            </div>
            {discount !== "" && (
              <div className="mt-[20px] mb-[20px] flex justify-between">
                <span>Tiền sau khi giảm giá:</span>
                <span className="text-red-500 font-bold">
                  {discount}
                  <span className="underline">đ</span>
                </span>
              </div>
            )}
            <div className="flex gap-x-[10px] items-center mb-[30px]">
              <span className="whitespace-nowrap">Nhập mã giảm giá</span>
              <input
                type="text"
                className="border-[1px] outline-0 focus:border-red-500 rounded-lg  p-[2px]"
                onChange={handlerCoupon}
              />
            </div>
            <button
              className="px-[10px] py-[5px] bg-black text-white text-[20px] rounded-lg m-auto block align-center"
              onClick={handlerSubmit}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
