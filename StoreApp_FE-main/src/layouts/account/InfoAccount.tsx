import React, { useEffect, useState } from "react";
import { handlerAPIGet, parseJwt } from "../../services/HandlerService";

type userType = {
  username: string;
  userID: string;
};
const InfoAccount = () => {
  const token: string | null = sessionStorage.getItem("token");
  const [accountAddress, setAccountAddress] = useState<any>("");
  const [shipment, setShipment] = useState<any>("");
  console.log(
    "🚀 ~ file: InfoAccount.tsx:12 ~ InfoAccount ~ shipment:",
    shipment
  );
  const [user, setUser] = useState<userType>({
    username: "",
    userID: "",
  });

  useEffect(() => {
    if (token !== null) {
      try {
        setUser(parseJwt(token));
      } catch (error) {
        console.error(error);
      }
    }
  }, [token]);
  useEffect(() => {
    const handlerGetAccountAddressByStatus = async () => {
      const result = await handlerAPIGet(
        "https://stroreapp-be.herokuapp.com/api/auth/getAccountAddressByStatus"
      );
      if (result.data.result.length > 0) {
        setAccountAddress(result.data.result);
      }
    };
    handlerGetAccountAddressByStatus();
  }, []);
  useEffect(() => {
    const handlerGetAllShipment = async () => {
      const result = await handlerAPIGet(
        `https://stroreapp-be.herokuapp.com/api/shipment/findAllShipment?accountID=${user.userID}`
      );
      if (result.data.result.length > 0) {
        setShipment(result.data.result);
      }
    };
    handlerGetAllShipment();
  }, [user.userID]);
  useEffect(() => {}, [user.userID]);

  return (
    <div className="flex-grow  flex-basis-0">
      <h5 className="uppercase">tài khoản</h5>
      <span className="text-[14px]">
        Tên tài khoản <b>{user.username} !</b>
      </span>
      <div className="flex items-center gap-2 mt-[20px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <span>{`Địa chỉ: ${
          accountAddress.length > 0 ? accountAddress[0].address : "Chưa đặt"
        }`}</span>
      </div>
      <div className="flex items-center gap-2 mt-[20px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
          />
        </svg>
        <span>{`Điện thoại: 0${
          accountAddress.length > 0 ? accountAddress[0].phone : "Chưa đặt"
        }`}</span>
      </div>
      <h5 className="uppercase mt-[20px]">Đơn hàng của bạn</h5>
      <table>
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Ngày giao hàng</th>
            <th>Thành tiền</th>
            <th>Thời gian nhận</th>
          </tr>
        </thead>
        <tbody>
          {shipment?.length > 0 &&
            shipment.map((item: any, index: number) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td>{item.money}</td>
                {item.time === "1" && <td>08h00-12h00</td>}
                {item.time === "2" && <td>14h00-18h00</td>}
                {item.time === "3" && <td>19h00-21h00</td>}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoAccount;
