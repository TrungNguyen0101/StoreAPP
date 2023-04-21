import axios from "axios";
import React from "react";
import Input from "../components/input/Input";
import Radio from "../components/radio/Radio";
import { handlerAPIPost } from "../services/HandlerService";
import Swal from "sweetalert2";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InputPassword from "../components/input/InputPassword";
type valueType = {
  username: string;
  email: string;
  password: string;
  role: string;
};
const SignUpPage = () => {
  const navigate = useNavigate();
  const schema = yup
    .object({
      username: yup.string().required("Vui lòng nhập vào tên"),
      email: yup
        .string()
        .email("Vui lòng nhập đúng định dạng")
        .required("Vui lòng nhập vào địa chỉ email"),
      password: yup.string().required("Vui lòng nhập vào mật khẩu"),
      confirmPassword: yup
        .string()
        .required("Vui lòng nhập lại mật khẩu")
        .oneOf([yup.ref("password"), null], "Nhập mật khẩu chưa khớp"),
    })
    .required();
  const resolver = yupResolver(schema);
  const {
    control,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role_name: 1,
    },
    resolver: resolver,
  });

  const handlerSubmitFrom = async (values: any) => {
    try {
      console.log("🚀 ~ file: SignUpPage.tsx:35 ~ SignUpPage ~ errors", errors);
      const data = {
        username: values.username,
        email: values.email,
        password: values.password,
        role: values.role,
      };
      const result = await handlerAPIPost(
        "https://stroreapp-be.herokuapp.com/api/auth/createAccount",
        data
      );
      if (result) {
        navigate("/signin");
        toast.success("Đăng ký thành công", {
          pauseOnHover: false,
          delay: 0,
          autoClose: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1300);
      }
    } catch (error) {
      navigate("/signup");
      toast.error("Đăng ký thất bại", {
        pauseOnHover: false,
        delay: 0,
        autoClose: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1300);
    }
  };
  return (
    <div className="pb-[30px]">
      <div className="text-[14px] px-[30px] py-[4px] bg-[#f6f6f6]">
        <span className="text-[#999999]">
          <a href="/" className="mr-[5px] text-[#2f80ed]">
            Trang chủ
          </a>
          /
        </span>
        <span className="ml-[5px] text-[#999999]">Đăng ký</span>
      </div>
      <div className="mt-[20px] text-center">
        <div className="mb-[10px]">
          <h1 className="uppercase text-[25px] ">đăng ký tài khoản</h1>
          <div>
            <span>Bạn đã có tài khoản? Đăng nhập </span>
            <a href="/signin" className="text-[#2f80ed] underline">
              tại đây
            </a>
          </div>
        </div>
        <div className="text-center  inline-block ">
          <form autoComplete="off" onSubmit={handleSubmit(handlerSubmitFrom)}>
            <div>
              <Input
                control={control}
                name="username"
                type="text"
                placeholder="Vui lòng nhập tên"
              >
                Tên
              </Input>
              {errors?.username?.message &&
                typeof errors.username.message === "string" && (
                  <div className="mt-[-10px] font-semibold text-[14px] text-left text-red-700 ">
                    {errors.username.message}
                  </div>
                )}
            </div>
            <div>
              <Input
                control={control}
                name="email"
                type="email"
                placeholder="Vui lòng nhập địa chỉ Email"
              >
                Email
              </Input>
              {errors?.email?.message &&
                typeof errors.email.message === "string" && (
                  <div className="mt-[-10px] font-semibold text-[14px] text-left text-red-700 ">
                    {errors.email.message}
                  </div>
                )}
            </div>
            <div>
              <InputPassword
                control={control}
                name="password"
                placeholder="Vui lòng nhập mật khẩu"
              >
                Mật khẩu
              </InputPassword>
              {errors?.password?.message &&
                typeof errors.password.message === "string" && (
                  <div className="mt-[-10px] font-semibold text-[14px] text-left text-red-700 ">
                    {errors.password.message}
                  </div>
                )}
            </div>
            <div>
              <InputPassword
                control={control}
                name="confirmPassword"
                placeholder="Vui lòng nhập lại mật khẩu"
              >
                Nhập lại mật khẩu
              </InputPassword>
              {errors?.confirmPassword?.message &&
                typeof errors.confirmPassword.message === "string" && (
                  <div className="mt-[-10px] font-semibold text-[14px] text-left text-red-700 ">
                    {errors.confirmPassword.message}
                  </div>
                )}
            </div>
            <div className="flex items-center gap-x-[30px]">
              <Radio control={control} name="role" value="manage">
                Quản lý
              </Radio>
              <Radio control={control} name="role" value="user">
                Người dùng
              </Radio>
            </div>
            <button
              type="submit"
              className="w-full bg-[#080808] rounded-lg text-[18px] font-semibold text-white py-[10px] mt-[10px]"
            >
              Đăng Ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
