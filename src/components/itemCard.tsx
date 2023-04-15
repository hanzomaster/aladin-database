// import { BsHeart } from 'react-icons/bs'
// import data from ".//product";
import { RadioGroup } from "@headlessui/react";
import { ProductDetail } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

import { trpc } from "@utils/trpc";
import { useToast } from "./Toast";
import ChooseSize from "./chooseSizeDialog";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export default function ItemCard({ item }: { item: any }) {
  const utils = trpc.useContext();
  const [selectedColor, setSelectedColor] = useState(item.productDetail[0]?.colorCode);
  const [selectedImage, setSelectedImage] = useState(item.productDetail[0]?.image);
  const [selectedId, setSelectedId] = useState(item.productDetail[0]?.id as string);
  const { data: sessionData } = useSession();
  const { add: toast } = useToast();

  const mutation = trpc.cartItem.updateOrCreate.useMutation({
    onSuccess: () => {
      toast({
        type: "success",
        duration: 2000,
        message: "Thêm vào giỏ hàng thành công",
        position: "topRight",
      });
      utils.cart.get.invalidate();
    },
  });

  const colors: string[] = [];

  item.productDetail?.forEach((color: ProductDetail) => {
    colors.push(`#${color.colorCode}`);
  });

  const handleAddItemToCart = (id: string) => {
    sessionData
      ? mutation.mutate({ productDetailId: id, dto: { size: "S", numberOfItems: 1 } })
      : toast({
          type: "error",
          duration: 2000,
          message: "Bạn chưa đăng nhập",
          position: "topRight",
        });
  };

  const handleChooseColor = (color: string) => {
    setSelectedColor(color);
    for (const product1 of item.productDetail) {
      if (product1.colorCode === color) {
        setSelectedImage(product1.image);
        setSelectedId(product1.id);
      }
    }
  };
  return (
    <>
      <div
        key={item.code}
        className=" border-black-50 text-md group col-span-1 row-span-1 h-fit items-center rounded-lg bg-pink-50 font-bold drop-shadow-md">
        <div className="relative overflow-hidden">
          <div className="h-96 w-full">
            <Image
              src={selectedImage ? selectedImage : item.productDetail[0]?.image}
              fill
              className="object-cover"
              alt="Image"
              priority={true}></Image>
          </div>
          <ChooseSize
            productDetailId={selectedId ? selectedId : item.productDetail[0]?.id}
            productName={item.name}
          />
        </div>
        <h2 className="mr-18 ml-2 mt-3 truncate text-2xl text-xl capitalize hover:text-red-500">
          <a href={"/productDetail/" + item.code}>
            {item.name} &#40;{item.line.gender}&#41;
          </a>
        </h2>
        <div className="ml-2">
          <RadioGroup
            value={selectedColor ? selectedColor : item.productDetail[0]?.colorCode}
            onChange={setSelectedColor}
            className="mt-3">
            <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
            <span className="flex items-center space-x-3">
              {item.productDetail?.map((item1: ProductDetail, index: number) => {
                return (
                  <RadioGroup.Option
                    key={item1.id}
                    value={item1.colorCode}
                    className={({ active, checked }) =>
                      classNames(
                        "ring-gray-400",
                        active && checked ? "ring ring-offset-1" : "",
                        !active && checked ? "ring-2" : "",
                        "relative -m-0.5 ml-2 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                      )
                    }
                    onClick={() => handleChooseColor(item1.colorCode)}>
                    <RadioGroup.Label as="span" className="sr-only">
                      {" "}
                      {item.colorCode}{" "}
                    </RadioGroup.Label>

                    <span
                      style={{
                        background: `${colors[index]}`,
                      }}
                      aria-hidden="true"
                      className={classNames(
                        "h-4 w-4 rounded-full border border-black border-opacity-10"
                      )}
                    />
                  </RadioGroup.Option>
                );
              })}
            </span>
          </RadioGroup>
        </div>

        <div className="mt-0.5 inline-block">
          <del className="ml-2 text-lg text-red-700">
            {(item.buyPrice * 1000).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </del>
          <small className="ml-2 mr-3  rounded-full bg-red-700 px-2 tracking-widest text-white">
            -40&#37;
          </small>
        </div>

        <br />
        <span className="ml-1 mt-2 inline-block text-xl">
          {(item.buyPrice * 600).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
    </>
  );
}
