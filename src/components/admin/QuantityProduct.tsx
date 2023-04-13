import { Dialog, Transition } from "@headlessui/react";
import { ClothSize, ProductDetail } from "@prisma/client";
import { Fragment, useState } from "react";

function QuantityProduct({
  productDetail,
}: {
  productDetail: (ProductDetail & {
    productInStock: {
      quantity: number;
      size: ClothSize;
    }[];
  })[];
}) {
  // console.log(productDetail[0].productCode);
  // console.log(productCode);

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsUpdate(false);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [isUpdate, setIsUpdate] = useState(false);
  const handleUpdate = () => {
    setIsUpdate(false);
    setIsOpen(false);
  };
  return (
    <div>
      <button className="text-[#0070f3] hover:text-[#0070f3]/80" onClick={openModal}>
        Chi tiết
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 w-96" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Số lượng sản phẩm
                  </Dialog.Title>

                  <table>
                    <thead>
                      <tr className="border-b bg-white text-sm transition duration-300 ease-in-out hover:bg-gray-100 md:text-base">
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
                          Màu sắc
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
                          S
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
                          M
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
                          L
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
                          XL
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productDetail?.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b bg-white text-sm transition duration-300 ease-in-out hover:bg-gray-100 md:text-base">
                          <td className="whitespace-nowrap px-1 py-3 md:px-4">{item.colorCode}</td>
                          {item?.productInStock?.map((item, index) => (
                            <td key={index} className="whitespace-nowrap px-1 py-3 md:px-4">
                              {/* {item.quantity} */}
                              <input
                                type="number"
                                className="h-8 w-14 rounded-md border border-gray-300 px-1"
                                defaultValue={item.quantity}
                                disabled={!isUpdate}
                                onChange={(e) => {
                                  console.log(e.target.value);
                                }}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-4 flex justify-between">
                    {isUpdate ? (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200"
                        onClick={handleUpdate}>
                        Xác nhận
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200"
                        onClick={() => setIsUpdate(true)}>
                        Cập nhật
                      </button>
                    )}

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 hover:bg-red-200"
                      onClick={closeModal}>
                      Trở về
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
}
export default QuantityProduct;
