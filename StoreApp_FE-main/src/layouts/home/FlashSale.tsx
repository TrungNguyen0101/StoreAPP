import React, { useEffect, useRef, useState } from "react";
import ProductItem from "../../components/falshSale/ProductItem";
import Star from "../../components/star/Star";
import flashSale from "../../images/flashsale.jpg";

import { handlerAPIGet } from "../../services/HandlerService";
type itemType = {
  _id: string;
  brand: string;
  image1: string;
  image2: string;
  name: string;
  price: string;
  quantity: string;
  size: string;
  index: string;
};
const FlashSale = () => {
  const [dataTab, setDataTab] = useState("1");
  const [count, setCount] = useState<any>({});
  const [listProduct, setListProduct] = useState<itemType[] | []>([]);
  const handlerDataTab = (dataTab: string) => {
    setDataTab(dataTab);
  };

  useEffect(() => {
    const handlerGetListProduct = async () => {
      const result = await handlerAPIGet(
        "https://stroreapp-be.herokuapp.com/api/product/findAllProduct"
      );
      console.log(
        "🚀 ~ file: FlashSale.tsx:33 ~ handlerGetListProduct ~ result:",
        result
      );
      setListProduct(result.data.result);
      setCount(result.data.counts);
    };
    handlerGetListProduct();
  }, []);
  return (
    <div className="mb-[30px] px-[40px] max-md:px-[10px] pt-[30px]">
      <div className=" pb-[20px] flex items-center gap-x-[10px] ">
        <h2 className="text-[32px] font-bold uppercase">Giảm sốc 50%</h2>
        <img src={flashSale} alt="" className="w-[50px] h-[50px]" />
      </div>
      <ul className="flex p-[15px] border-b-[1px] border-t-[1px] gap-x-[20px] text-[18px] font-medium text-[#9c9c9c] ">
        <li>
          <span
            className="flashSale-title "
            onClick={(e) => handlerDataTab("1")}
          >
            Hàng hiệu -50%
          </span>
          <div
            className={`relative dataTab ${dataTab === "1" ? "active" : ""}`}
          ></div>
        </li>
        {/* <li>
          <span
            className="flashSale-title"
            onClick={(e) => handlerDataTab("2")}
          >
            Năng động mùa hè
          </span>
          <div
            className={`relative dataTab ${dataTab === "2" ? "active" : ""}`}
          ></div>
        </li> */}
      </ul>
      <div className="py-[40px] xl:grid-cols-5   grid grid-cols-4 gap-[30px] max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-[10px] ]">
        {listProduct.length > 0 &&
          listProduct.map((item) => (
            <div key={item._id}>
              <ProductItem item={item} counts={count}></ProductItem>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FlashSale;
