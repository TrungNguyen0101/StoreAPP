import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  handlerAPIDelete,
  handlerAPIGet,
  handlerAPIUpdate,
  parseJwt,
} from "../../services/HandlerService";
import AddAddressMUI from "./AddAddressMUI";
type userType = {
  userID: string;
};
const AddressAccount = () => {
  const token: string | null = sessionStorage.getItem("token");
  const [accountAddress, setAccountAddress] = useState<any>("");
  const [open, setOpen] = useState<Boolean>(false);
  const [user, setUser] = useState<userType>({
    userID: "",
  });

  const handleDeleteAccountAddress = async (id: any) => {
    const result = await handlerAPIDelete(
      `https://stroreapp-be.herokuapp.com/api/auth/DeleteAccountAddressByID?_id=${id}`
    );
    console.log(
      "🚀 ~ file: AddressAccount.tsx:29 ~ handleDeleteAccountAddress ~ result:",
      result
    );
    if (result.data.status === 404) {
      toast.error(`${result.data.message}`, {
        pauseOnHover: false,
        delay: 0,
        autoClose: 1500,
      });
    } else {
      toast.success(`${result.data.message}`, {
        pauseOnHover: false,
        delay: 0,
        autoClose: 1500,
      });
    }
    setTimeout(() => {
      window.location.reload();
    }, 1300);
  };
  const handleUpdateStatusAccountAddress = async (id: any) => {
    const result = await handlerAPIUpdate(
      `https://stroreapp-be.herokuapp.com/api/auth/UpdateStatusAccountAddressByID?_id=${id}`
    );
    toast.success("Đặc địa chỉ mặc định thành công", {
      pauseOnHover: false,
      delay: 0,
      autoClose: 1500,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1300);
  };

  useEffect(() => {
    async function handlerGetAllAccountAddress() {
      const result: any = await handlerAPIGet(
        `https://stroreapp-be.herokuapp.com/api/auth/getAllAccountAddressByUsername?userID=${user.userID}`
      );
      if (result.data.result.length > 0) {
        setAccountAddress(result.data.result);
      }
    }
    handlerGetAllAccountAddress();
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
    <div className="flex-grow flex-basis-0 ">
      <div className="pb-[15px] mb-[15px] border-b-[1px] ">
        <h5 className="uppercase">Địa chỉ của bạn</h5>
        <button
          type="submit"
          className="w-[150px] bg-[#080808] rounded-lg  font-semibold text-white py-[10px] mt-[10px]"
          onClick={() => setOpen(true)}
        >
          Thêm địa chỉ
        </button>
        <AddAddressMUI
          check={open}
          getOpen={(open: boolean) => setOpen(open)}
        ></AddAddressMUI>
      </div>
      <div className="max-h-[280px] pr-[10px] overflow-auto">
        {accountAddress?.length > 0 &&
          accountAddress.map((item: any, index: any) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="mb-[5px] text-red-500">
                  Địa chỉ: <span>{index + 1}</span>
                </div>
                <div className="mb-[5px]">
                  Họ tên: <span>{`${item.username}`}</span>
                </div>
                <div className="mb-[5px]">
                  Địa chỉ: <span>{`${item.address}`}</span>
                </div>
                <div className="mb-[20px]">
                  Số điện thoại: <span>{`${item.phone}`}</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center w-[200px] text-[15px]">
                {item.status === false && (
                  <span
                    className="text-[#2d9cdb] cursor-pointer hover:text-black duration-300"
                    onClick={() => handleUpdateStatusAccountAddress(item._id)}
                  >
                    Đặt làm địa chỉ mặc định
                  </span>
                )}
                {item.status === true && (
                  <span className="text-[red] cursor-pointer duration-300">
                    Địa chỉ mặc định
                  </span>
                )}
                <span
                  className="text-[#2d9cdb] cursor-pointer hover:text-black duration-300"
                  onClick={() => handleDeleteAccountAddress(item._id)}
                >
                  Xóa địa chỉ
                </span>
              </div>
            </div>
          ))}
        {accountAddress?.length <= 0 && <div>Chưa có</div>}
      </div>
    </div>
  );
};

export default AddressAccount;
