import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import Input from "../../components/input/Input";
import Select from "../../components/select/Select";
import SelectSize from "../../components/select/SelectSize";
import UploadImage from "../../components/uploadImage/UploadImage";
import { handlerAPIGet, handlerAPIUpdate } from "../../services/HandlerService";

type valueType = {
  brand: string;
  name: string;
  price: string;
  quantity: string;
  size: string;
  image1: string;
  image2: string;
};
const UpdateProduct = () => {
  const params = useParams();
  const productId: string | undefined = params.id;
  const [product, setProduct] = useState<valueType>();
  const dataURL_1 = useSelector((count: any) => count.redux.image_url1);
  const dataURL_2 = useSelector((count: any) => count.redux.image_url2);

  const navigate = useNavigate();
  const schema = yup
    .object({
      name: yup.string().required("Vui lòng nhập vào tên"),
      quantity: yup
        .number()
        .typeError("Vui lòng nhập đúng định dạng")
        .min(1, "Số lượng phải lớn hơn 0")
        .required("Vui lòng nhập vào số lượng"),
      price: yup
        .number()
        .typeError("Vui lòng nhập đúng định dạng")
        .min(1, "Giá phải lớn hơn 0")
        .required("Vui lòng nhập vào giá"),
    })
    .required();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      name: "",
      brand: "EGANY",
      size: "S",
      price: "",
    },
    resolver: yupResolver(schema),

    mode: "onChange",
  });
  const handlerSubmitFrom = async (values: valueType) => {
    try {
      const newValues: valueType = {
        ...values,
        price: values.price,
        image1: dataURL_1 ? dataURL_1 : product?.image1,
        image2: dataURL_2 ? dataURL_2 : product?.image2,
      };
      const result = await handlerAPIUpdate(
        `https://stroreapp-be.herokuapp.com/api/product/updateProductById?id=${productId}`,
        newValues
      );
      if (result) {
        toast.success("Cập nhập sản phẩm thành công", {
          pauseOnHover: false,
          delay: 0,
          autoClose: 1500,
        });
        navigate("/manage/list");
        setTimeout(() => {
          window.location.reload();
        }, 1300);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: UpdateProduct.tsx:87 ~ handlerSubmitFrom ~ error:",
        error
      );
      toast.error("Thêm thất bại", {
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
    setValue("brand", product?.brand);
    setValue("image1", product?.image1);
    setValue("image2", product?.image2);
    setValue("name", product?.name);
    setValue("price", product?.price);
    setValue("quantity", product?.quantity);
    setValue("size", product?.size);
  }, [
    product?.brand,
    product?.image1,
    product?.image2,
    product?.name,
    product?.price,
    product?.quantity,
    product?.size,
    setValue,
  ]);
  useEffect(() => {
    const handlerGetItemByID = async (productId: string | undefined) => {
      if (productId) {
        const result = await handlerAPIGet(
          `https://stroreapp-be.herokuapp.com/api/product/findProductById?id=${productId}`
        );

        setProduct(result.data.result);
      }
    };
    handlerGetItemByID(productId);
  }, [getValues, productId]);

  return (
    <div>
      <div className="font-semibold mb-[20px] text-[20px]">
        Chỉnh sửa sản phẩm
      </div>
      <form
        className=""
        autoComplete="off"
        onSubmit={handleSubmit(handlerSubmitFrom)}
      >
        <div className="flex gap-x-[50px] ">
          <div>
            <Input
              control={control}
              name="name"
              type="text"
              placeholder="Vui lòng nhập tên sản phẩm"
            >
              Tên sản phẩm
            </Input>
            {errors?.name?.message &&
              typeof errors.name.message === "string" && (
                <div className="mt-[-10px] font-semibold text-[14px] text-left text-red-700 ">
                  {errors.name.message}
                </div>
              )}
          </div>
          <Select control={control} name="brand">
            Nhãn hàng
          </Select>
          {/* <SelectSize control={control} name="size">
            Kích cỡ
          </SelectSize> */}
        </div>
        <div className="flex flex-row gap-x-[50px]">
          <div>
            <Input
              control={control}
              name="quantity"
              type="number"
              placeholder="Vui lòng nhập số lượn sản phẩm"
            >
              Số lượng
            </Input>
            {errors?.quantity?.message &&
              typeof errors.quantity.message === "string" && (
                <div className="mt-[-10px] font-semibold text-[14px] text-left text-red-700 ">
                  {errors.quantity.message}
                </div>
              )}
          </div>
          <div>
            <Input
              control={control}
              name="price"
              type="number"
              placeholder="Vui lòng nhập tên sản phẩm"
            >
              Giá
            </Input>
            {errors?.price?.message &&
              typeof errors.price.message === "string" && (
                <div className="mt-[-10px] font-semibold text-[14px] text-left text-red-700 ">
                  {errors.price.message}
                </div>
              )}
          </div>
        </div>
        <div>
          <UploadImage
            image1={product?.image1}
            image2={product?.image2}
            check123={true}
          ></UploadImage>
        </div>
        <button
          type="submit"
          className="w-[200px] bg-[#080808] rounded-lg text-[18px] font-semibold text-white py-[10px] mt-[10px]"
        >
          Cập nhập
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
