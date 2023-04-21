import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/input/Input";
import GoogleLogin from "react-google-login";
import InputPassword from "../components/input/InputPassword";
import { handlerAPIPost } from "../services/HandlerService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SignInPage = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const handlerSubmitFrom = async (values: any) => {
    try {
      // console.log("🚀 ~ file: SignUpPage.tsx:35 ~ SignUpPage ~ errors", errors);
      const data = {
        email: values.email,
        password: values.password,
      };
      const result: any = await handlerAPIPost(
        "https://stroreapp-be.herokuapp.com/api/auth/loginAccount",
        data
      );

      if (result) {
        sessionStorage.setItem("token", result.data?.token);
        navigate("/");
        toast.success("Đăng nhập thành công", {
          pauseOnHover: false,
          delay: 0,
          autoClose: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1300);
      }
    } catch (error: any) {
      console.log(
        "🚀 ~ file: SignInPage.tsx:54 ~ handlerSubmitFrom ~ error:",
        error
      );

      toast.error(error.response.data.message, {
        pauseOnHover: false,
        delay: 0,
        autoClose: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1300);
    }
  };
  const responseGoogle = async (response: any) => {
    try {
      const data: any = {
        email: response.profileObj.email,
        username: `${response.profileObj.familyName} ${response.profileObj.givenName} `,
        role: "user",
      };
      const result: any = await handlerAPIPost(
        "https://stroreapp-be.herokuapp.com/api/auth/loginAccountGoogle",
        data
      );
      if (result) {
        sessionStorage.setItem("token", result.data?.token);
        navigate("/");
        toast.success("Đăng nhập thành công", {
          pauseOnHover: false,
          delay: 0,
          autoClose: 1500,
        });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1300);
      }
    } catch (error: any) {
      toast.error("Đăng nhập thất bại", {
        pauseOnHover: false,
        delay: 0,
        autoClose: 1500,
      });
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1300);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);
  return (
    <div className="">
      <div className="text-[14px] px-[30px] py-[4px] bg-[#f6f6f6]">
        <span className="text-[#999999]">
          <a href="/" className="mr-[5px] text-[#2f80ed]">
            Trang chủ
          </a>
          /
        </span>
        <span className="ml-[5px] text-[#999999]">Đăng nhập</span>
      </div>
      <div className="mt-[40px] text-center">
        <div className="mb-[30px]">
          <h1 className="uppercase text-[25px] ">đăng nhập tài khoản</h1>
          <div>
            <span>Bạn chưa có tài khoản? Đăng kí </span>
            <a href="/signup" className="text-[#2f80ed] underline">
              tại đây
            </a>
          </div>
        </div>
        <div className="text-center  inline-block ">
          <form autoComplete="off" onSubmit={handleSubmit(handlerSubmitFrom)}>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Vui lòng nhập địa chỉ Email"
            >
              Email
            </Input>
            <InputPassword
              control={control}
              name="password"
              placeholder="Vui lòng nhập mật khẩu"
            >
              Mật khẩu
            </InputPassword>
            <div className="text-start text-[14px]">
              <span>Quên mật khẩu? Nhấn vào </span>
              <a href="/signup" className="text-[#2f80ed]">
                đây
              </a>
            </div>
            <div className="my-[10px]">
              <GoogleLogin
                clientId="879686866490-04qvibe2ujc9t2ejt8qc8pkb7coi6cq0.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#080808] rounded-lg text-[18px] font-semibold text-white py-[10px] mt-[10px]"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
