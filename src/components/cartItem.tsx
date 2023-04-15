import { ClothSize } from "@prisma/client";
import { debounce } from "lodash";
import Image from "next/image";
import { useState } from "react";
import { trpc } from "@utils/trpc";
import { useToast } from "./Toast";

type ClothSizeLiteral = `${ClothSize}`;

const CartItem = ({ product }: any) => {
  const [count, setCount] = useState(product?.numberOfItems);
  const utils = trpc.useContext();
  const { add: toast } = useToast();
  const { data: stockData } = trpc.productInStock.getOneWhere.useQuery({
    productDetailId: product?.productDetail.id,
    size: product?.size as ClothSizeLiteral,
  });
  const createMutation = trpc.cartItem.updateOrCreate.useMutation({
    onSuccess() {
      utils.cart.get.invalidate();
    },
    onError() {
      toast({
        type: "error",
        duration: 1500,
        message: "Số lượng đặt hàng vượt quá số sản phẩm trong kho",
        position: "topRight",
      });
      setCount(product?.numberOfItems);
    },
  });
  const mutation = trpc.cartItem.delete.useMutation({
    onSuccess() {
      utils.cart.get.invalidate();
    },
  });

  const debouncedUpdate = debounce(async (criteria) => {
    setCount(criteria);
    createMutation.mutate({
      productDetailId: product?.productDetail.id,
      dto: { size: product?.size as ClothSizeLiteral, numberOfItems: parseFloat(criteria) },
    });
  }, 300);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    debouncedUpdate(e.target.value);
  }

  const removeItem = (productDetailId: string, size: ClothSizeLiteral) => {
    mutation.mutate({ productDetailId: productDetailId, size: size });
  };

  return (
    <>
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <div className="relative h-full w-full">
          <Image
            src={product?.productDetail?.image}
            fill
            alt="Ảnh sản phẩm"
            priority={true}
            className=" object-cover object-center"></Image>
        </div>
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <a
            href={"/productDetail/" + product?.productDetail?.product?.code}
            className="flex cursor-pointer justify-between text-base font-medium text-gray-900 hover:text-red-500">
            <h3>
              <p>{product?.productDetail?.product?.name}</p>
            </h3>
            <p className="ml-4">
              {(product?.productDetail?.product?.buyPrice * 1000).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </a>
          <div className="inline-block">
            <p
              style={{
                background: `#${product?.productDetail?.colorCode}`,
              }}
              className="mt-1 text-sm text-gray-500">
              {product.productDetail.colorCode}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500">Size: {product?.size}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="inline-block text-gray-500">
            SL:
            <div className="inline-block">
              <input
                className="h-8 w-16 rounded-sm bg-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 hover:bg-white "
                type="number"
                value={count}
                onChange={handleChange}
              />
            </div>
            Kho:
            {stockData?.quantity}
          </div>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() =>
                removeItem(product?.productDetail.id, product?.size as ClothSizeLiteral)
              }>
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CartItem;
