import React, { useEffect, useState } from "react";
import { handlerAPIGet } from "../../services/HandlerService";
import ItemProduct from "./ItemProduct";
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
const StorageProduct = () => {
  const [listProduct, setListProduct] = useState<itemType[] | []>([]);
  useEffect(() => {
    const handlerGetListProduct = async () => {
      const result = await handlerAPIGet(
        "https://stroreapp-be.herokuapp.com/api/product/findAllStorageProduct"
      );
      setListProduct(result.data.result);
    };
    handlerGetListProduct();
  }, []);
  return (
    <div className="flex-grow  flex-basis-0">
      <div className="list-product">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Nhãn hàng</th>
              <th>Số lượng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          {listProduct.length > 0 &&
            listProduct.map((item: itemType) => (
              <tbody key={item._id}>
                <ItemProduct item={item}></ItemProduct>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
};

export default StorageProduct;
