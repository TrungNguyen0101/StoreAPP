import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ActionDelete from "../../components/actions/ActionDelete";
import ActionEdit from "../../components/actions/ActionEdit";
import { handlerAPIUpdate } from "../../services/HandlerService";
type itemType = {
  item: any;
  _id: string;
  brand: string;
  image1: string;
  image2: string;
  name: string;
  price: string;
  quantity: string;
  size: string;
};
type props = {
  item: object[] | {};
};

const ItemProduct = ({ item }: props | itemType) => {
  const navigate = useNavigate();
  const handlerDelete = (idProduct: string) => {
    Swal.fire({
      title: "Bạn có chắc chắn xóa?",
      text: "Sau khi xóa sẽ đc chuyển vào kho lưu trữ của Admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đông ý ",
      cancelButtonText: "Hủy ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await handlerAPIUpdate(
            `https://stroreapp-be.herokuapp.com/api/product/updateDeleteById?id=${idProduct}`
          );
          if (result) {
            Swal.fire(
              "Xóa thành công!",
              "Sản phẩm đã được xóa.",
              "success"
            ).then(function () {
              window.location.reload();
            });
          }
        } catch (error: any) {
          Swal.fire("Xóa thất bại!", `${error.response.data}`, "warning").then(
            function () {
              window.location.reload();
            }
          );
        }
      }
    });
  };
  const handlerStorageDelete = (idProduct: string) => {
    Swal.fire({
      title: "Bạn có chắc chắn khôi phục sản phẩm?",
      text: "Sau khi khôi phục sản phẩm sẽ hiển thị trở lại!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đông ý ",
      cancelButtonText: "Hủy ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await handlerAPIUpdate(
            `https://stroreapp-be.herokuapp.com/api/product/updateDeleteByIdAdmin?id=${idProduct}`
          );
          if (result) {
            Swal.fire(
              "Khôi phục thành công!",
              "Sản phẩm đã được khôi phục.",
              "success"
            ).then(function () {
              window.location.reload();
            });
          }
        } catch (error: any) {
          Swal.fire(
            "Khôi phục thất bại!",
            `${error.response.data}`,
            "warning"
          ).then(function () {
            window.location.reload();
          });
        }
      }
    });
  };
  return (
    <tr>
      <td>
        <span className="product_id" title={item._id}>
          {item._id}
        </span>
      </td>
      <td>{item.name}</td>
      <td>{item.brand}</td>
      <td>{item.quantity}</td>
      <td>
        {item.delete === false ? (
          <div className="flex gap-x-[10px] text-center items-center justify-center">
            <ActionEdit
              onClick={() => navigate(`/manage/update/${item._id}`)}
            ></ActionEdit>
            <ActionDelete
              onClick={() => handlerDelete(item._id)}
            ></ActionDelete>
          </div>
        ) : (
          <div
            className="flex gap-x-[10px] text-center items-center justify-center cursor-pointer"
            onClick={() => handlerStorageDelete(item._id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
        )}
      </td>
    </tr>
  );
};

export default ItemProduct;
