import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { ClothSize } from "@prisma/client";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { useToast } from "./Toast";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ChooseSize = ({
  productDetailId,
  productName,
  productInStockList,
  color,
}: {
  productDetailId: string;
  productName: string;
  productInStockList: any;
  color: string;
}) => {
  // console.log(productDetail[0].productCode);
  // console.log(productCode);
  const utils = trpc.useContext();
  const { add: toast } = useToast();
  type ClothSizeLiteral = `${ClothSize}`;
  const { data: sessionData } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<ClothSizeLiteral>(ClothSize.L);
  const mutation = trpc.cartItem.updateOrCreate.useMutation({
    onSuccess: () => {
      toast({
        type: "success",
        duration: 2000,
        message: "Thêm vào giỏ hàng thành công",
        position: "topRight",
      });
      utils.cart.get.invalidate();
      setIsOpen(false);
    },
  });

  const handleAddItemToCart = (id: string) => {
    sessionData
      ? mutation.mutate({ productDetailId: id, dto: { size: selectedSize, numberOfItems: 1 } })
      : toast({
          type: "error",
          duration: 2000,
          message: "Bạn chưa đăng nhập",
          position: "topRight",
        });
  };

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <div className="absolute -bottom-10 flex h-full w-full items-center justify-center bg-black/20 opacity-0 transition-all duration-300 group-hover:bottom-0 group-hover:opacity-100">
        <button
          className="rounded-lg bg-gray-100 px-5 py-2 text-gray-900 hover:bg-slate-500 hover:text-white"
          onClick={openModal}>
          Thêm vào giỏ hàng
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform items-center overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Chọn size sản phẩm {productName}{" "}
                    <span
                      style={{
                        background: `#${color}`,
                      }}>
                      {color}
                    </span>
                  </Dialog.Title>

                  <RadioGroup
                    value={selectedSize}
                    // onChange={setSelectedSize}
                    className="inset-x-0 mt-4 items-center justify-center">
                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                    <div className="grid w-full grid-cols-4 items-center gap-4">
                      {productInStockList?.map((productInStock) => (
                        <div key={productInStock.size} className="flex flex-col">
                          <RadioGroup.Option
                            value={productInStock.size}
                            disabled={productInStock.quantity <= 0}
                            onClick={() => setSelectedSize(productInStock.size)}
                            className={({ active }) =>
                              classNames(
                                productInStock.quantity > 0
                                  ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                  : "cursor-not-allowed bg-gray-50 text-gray-200",
                                active ? "ring-2 ring-indigo-500" : "",
                                "relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase focus:outline-none hover:bg-gray-50 sm:flex-1"
                              )
                            }>
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">{productInStock.size}</RadioGroup.Label>
                                {productInStock.quantity > 0 ? (
                                  <span
                                    className={classNames(
                                      active ? "border" : "border-2",
                                      checked ? "border-indigo-500" : "border-transparent",
                                      "pointer-events-none absolute -inset-px rounded-md border-2 border-gray-300"
                                    )}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                                    <svg
                                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      stroke="currentColor">
                                      <line
                                        x1={0}
                                        y1={100}
                                        x2={100}
                                        y2={0}
                                        vectorEffect="non-scaling-stroke"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </>
                            )}
                          </RadioGroup.Option>
                          <div>{productInStock.quantity}</div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>

                  <div className="mt-4 flex w-full items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200"
                      onClick={() => {
                        handleAddItemToCart(productDetailId);
                      }}>
                      Thêm vào giỏ hàng
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 hover:bg-red-200"
                      onClick={() => {
                        setIsOpen(false);
                      }}>
                      Hủy
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
export default ChooseSize;
