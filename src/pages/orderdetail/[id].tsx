import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useToast } from "../../components/Toast";
import Navbar from "../../components/navbar";
import OrderedItem from "../../components/user/OrderedItem";

import { OrderStatus } from "@prisma/client";
import { trpc } from "@utils/trpc";

const OrderDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { add: toast } = useToast();
  let total = 0;
  const { data: session } = useSession();
  const mutation = trpc.order.cancelOrder.useMutation({
    onSuccess: () => {
      toast({
        type: "success",
        duration: 1500,
        message: "Hủy đơn hàng thành công!",
        position: "topCenter",
      });
      window.location.reload();
    },
  });

  const returnMutation = trpc.order.returnOrder.useMutation({
    onSuccess: () => {
      toast({
        type: "success",
        duration: 1500,
        message: "Hủy đơn hàng thành công!",
        position: "topCenter",
      });
      window.location.reload();
    },
  });

  const handleCancelOrder = (status: OrderStatus | undefined) => {
    if (status === "CONFIRM_PENDING") {
      mutation.mutate({
        orderNumber: id as string,
        cancelReason: comment as string,
      });
    } else {
      returnMutation.mutate({
        orderNumber: id as string,
        cancelReason: comment as string,
      });
    }
  };

  // const handleReturnOrder = () => {
  //   mutation.mutate({
  //     orderNumber: id as string,
  //   });
  // };
  const { data: order } = trpc.order.getOneWhere.useQuery({ orderNumber: id as string });

  const [isOpen, setIsOpen] = useState(false);
  const [starRate, setStarRate] = useState(0);

  const [comment, setComment] = useState("");
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  function closeConfirmModal() {
    setIsConfirmOpen(false);
  }
  function openConfirmModal() {
    setIsConfirmOpen(true);
  }
  return (
    <>
      <Navbar />

      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css" />
      <div className="mx-1 px-4 py-20 2xl:container md:px-6 2xl:mx-auto 2xl:px-20">
        <div className="item-start flex flex-col justify-start space-y-2 ">
          <h1 className="text-3xl font-semibold leading-7 text-gray-800 lg:text-4xl  lg:leading-9">
            Đơn hàng {id}
          </h1>
          <p className="text-base font-medium leading-6 text-gray-600">
            {order?.orderDate.toDateString() + " at " + order?.orderDate.toTimeString()}{" "}
          </p>
        </div>
        <div className="jusitfy-center mt-6 flex w-full flex-col items-stretch  space-y-4 md:space-y-6 xl:flex-row xl:space-x-8 xl:space-y-0">
          <div className="flex h-[45rem] w-full flex-col items-start justify-start space-y-4  md:space-y-6 xl:space-y-8">
            <div className="flex w-full flex-col items-start justify-start overflow-y-scroll bg-white px-4 py-4 scrollbar-thin scrollbar-none md:p-6 md:py-6 xl:p-8">
              <p className="text-lg font-semibold leading-6 text-gray-800 md:text-xl xl:leading-5">
                Chi tiết đơn hàng
              </p>

              {order?.orderdetail.map((item) => {
                total = total + parseFloat(item.priceEach.toString()) * item.quantityInOrdered;

                return (
                  <>
                    <OrderedItem item={item} disable={order.status !== "SHIPPED"} />
                  </>
                );
              })}
            </div>
            <div className="flex w-full flex-col items-stretch justify-center space-y-4 md:flex-row md:space-x-6 md:space-y-0 xl:space-x-8">
              <div className="flex w-full flex-col space-y-6 bg-gray-50 px-4 py-6 md:p-6 xl:p-8   ">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                <div className="flex w-full flex-col items-center justify-center space-y-4 border-b border-gray-200 pb-4">
                  <div className="flex w-full  justify-between">
                    <p className="text-base leading-4 text-gray-800">Tổng tiền hàng:</p>
                    <p className="text-base leading-4 text-gray-600">{total}000 &#8363;</p>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <p className="text-base leading-4 text-gray-800">
                      Giảm giá{" "}
                      <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">
                        Mừng khai trương
                      </span>
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      {(total * 0.4 * 1000).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}{" "}
                      (40%)
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <p className="text-base leading-4 text-gray-800">Phí vận chuyển</p>
                    <p className="text-base leading-4 text-gray-600">0.00</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between">
                  <p className="text-base font-semibold leading-4 text-gray-800">Tổng</p>
                  <p className="text-base font-semibold leading-4 text-gray-600">
                    {(total * 600).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                    ;
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-col justify-center space-y-6 bg-gray-50 px-4 py-6 md:p-6 xl:p-8   ">
                <div className="flex justify-between">
                  <h3 className="text-xl font-semibold leading-5 text-gray-800">Vận chuyển</h3>
                  {order?.status === "SHIPPED" && <p>Đã giao</p>}
                  {order?.status === "CONFIRM_PENDING" && <p>Đang chờ xác nhận</p>}
                  {order?.status === "INPROCESS" && <p>Đang giao</p>}
                  {order?.status === "CANCEL" && <p>Đã hủy</p>}
                  {order?.status === "CANCEL_PENDING" && <p>Đang chờ hủy</p>}
                  {order?.status === "INPROCESS" && <p> Đang giao</p>}
                  {order?.status === "RETURN_PENDING" && <p> Đang chờ đổi/ trả</p>}
                  {order?.status === "RETURN" && <p>Đã đổi/trả</p>}
                  {order?.status === "COMPLETED" && <p>Hoàn thành</p>}
                </div>
                <div className="flex w-full items-start justify-between">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="h-8 w-8">
                      <img
                        className="h-full w-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-start">
                      <p className="text-lg font-semibold leading-6 text-gray-800">
                        Aladin Delivery
                        <br />
                        <span className="font-normal">Giao hàng toàn quốc</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 text-gray-800">0 &#8363;</p>
                </div>
                {order?.status === "SHIPPED" && (
                  <div>
                    <div className="flex w-full items-center justify-center">
                      {/* TODO: Sửa lại màu cho đơn hàng bị cancel */}
                      <button
                        onClick={openConfirmModal}
                        className="w-96 bg-gray-600 py-5 text-base font-medium leading-4 text-white focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 hover:bg-gray-800 md:w-full">
                        Đã nhận đươc hàng
                      </button>
                    </div>
                    <Transition appear show={isConfirmOpen} as={Fragment}>
                      <Dialog as="div" className="relative z-10" onClose={closeConfirmModal}>
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
                                <Dialog.Title
                                  as="h3"
                                  className="text-lg font-medium leading-6 text-gray-900">
                                  Xác nhận đã nhận hàng
                                </Dialog.Title>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">
                                    Bạn chắc chắn đã nhận hàng và không có khiếu nại gì về đơn hàng?
                                  </p>
                                </div>

                                <div className="mt-4 flex justify-between">
                                  <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200"
                                    onClick={closeConfirmModal}>
                                    Xác nhận
                                  </button>
                                  <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 hover:bg-red-300"
                                    onClick={closeConfirmModal}>
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
                )}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-between bg-gray-50 px-4 py-6 md:items-start md:p-6 xl:w-96 xl:p-8 ">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">Tên người nhận:</h3>
            <div className="flex  h-full w-full flex-col items-stretch justify-start md:flex-row md:space-x-6 lg:space-x-8 xl:flex-col xl:space-x-0 ">
              <div className="flex flex-shrink-0 flex-col items-start justify-start">
                <div className="flex w-full  items-center  justify-center space-x-4 border-b border-gray-200 py-8 md:justify-start">
                  <div className=" flex flex-col items-start justify-start space-y-2">
                    <p className="text-left text-base font-semibold leading-4 text-gray-800">
                      {order?.address.receiver}
                    </p>
                  </div>
                </div>

                <div className="flex w-full  items-center justify-center space-x-4 border-b border-gray-200 py-4 md:justify-start">
                  <i className="fas fa-phone"></i>
                  <p className="cursor-pointer text-sm leading-5 text-gray-800">
                    {order?.address.phone}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex w-full  flex-col items-stretch justify-between md:mt-0 xl:h-full">
                <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:items-start md:justify-start md:space-x-6 md:space-y-0 lg:space-x-8 xl:flex-col  xl:space-x-0 xl:space-y-12 ">
                  <div className="flex flex-col items-center  justify-center space-y-4 md:items-start md:justify-start xl:mt-8">
                    <p className="text-center text-base font-semibold leading-4 text-gray-800 md:text-left">
                      Địa chỉ giao hàng:
                    </p>
                    <p className=" w-56 text-center text-sm leading-5 text-gray-600 md:text-left lg:w-full xl:w-56">
                      {order?.address.detail +
                        ", " +
                        order?.address.ward +
                        ", " +
                        order?.address.district +
                        ", " +
                        order?.address.city}
                    </p>
                    <p className="text-center text-base font-semibold leading-4 text-gray-800 md:text-left">
                      Ghi chú:
                    </p>
                    <p className=" w-56 text-center text-sm leading-5 text-gray-600 md:text-left lg:w-full xl:w-56">
                      {order?.note}
                    </p>
                  </div>
                </div>
                {order?.status === "CONFIRM_PENDING" && (
                  <div className="flex w-full items-center justify-center md:items-start md:justify-start">
                    <button
                      className="mt-2 w-96 border border-gray-800 py-3 text-base font-medium leading-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 hover:bg-gray-200 md:mt-0 2xl:w-full"
                      // disabled={order?.status === "CANCEL"}
                      onClick={openModal}>
                      Hủy đơn hàng
                    </button>
                  </div>
                )}
                {order?.status === "SHIPPED" && (
                  <div className="flex w-full items-center justify-center md:items-start md:justify-start">
                    <button
                      className="mt-2 w-96 border border-gray-800 py-3 text-base font-medium leading-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 hover:bg-gray-200 md:mt-0 2xl:w-full"
                      // disabled={order?.status === "CANCEL"}
                      onClick={openModal}>
                      Đổi/ trả hàng
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900">
                          {`Bạn có chắc chắn muốn ${
                            order?.status === "CONFIRM_PENDING" ? "huỷ" : "đổi/ trả"
                          } đơn hàng`}
                        </Dialog.Title>

                        <label className="mt-3">{`Lý do ${
                          order?.status === "CONFIRM_PENDING" ? "huỷ" : "đổi/ trả"
                        } hàng:`}</label>
                        <textarea
                          className="mt-3 w-full rounded border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 md:text-base"
                          onChange={(e) => setComment(e.target.value)}
                        />

                        <div className="mt-4 flex w-full items-center justify-between">
                          <button
                            type="button"
                            onClick={() => handleCancelOrder(order?.status)}
                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 hover:bg-red-200">
                            Xác nhận
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200"
                            onClick={() => {
                              setIsOpen(false);
                            }}>
                            Quay lại
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderDetail;
