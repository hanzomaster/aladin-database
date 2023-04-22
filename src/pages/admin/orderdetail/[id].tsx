import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import NavbarAdmin from "../../../components/admin/NavbarAdmin";
import OrderedItem from "../../../components/user/OrderedItem";

import { OrderStatus } from "@prisma/client";
import { trpc } from "@utils/trpc";
import { useToast } from "../../../components/Toast";

const OrderDetailAdmin = () => {
  const router = useRouter();
  const { add: toast } = useToast();
  const { id } = router.query;
  let total = 0;
  const { data: session } = useSession();
  const mutation = trpc.order.updateOrderInProcess.useMutation({
    onSuccess: () => {
      toast({
        type: "success",
        duration: 6000,
        message: "Cập nhật thành công",
        position: "topCenter",
      });
      setIsOpen(false);
    },
  });
  const updateMutation = trpc.order.updateOrderStatus.useMutation({
    onSuccess: () => {
      toast({
        type: "success",
        duration: 6000,
        message: "Cập nhật thành công",
        position: "topCenter",
      });
      setIsOpen(false);
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const handleUpdateStatus = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.CANCEL_PENDING:
        updateMutation.mutate({ orderNumber: id as string, status: OrderStatus.CANCEL });
        break;
      case OrderStatus.RETURN_PENDING:
        updateMutation.mutate({ orderNumber: id as string, status: OrderStatus.RETURN });
        break;
      case OrderStatus.INPROCESS:
        updateMutation.mutate({ orderNumber: id as string, status: OrderStatus.SHIPPED });
        break;
      default:
        break;
    }
  };

  const [nameShipper, setNameShipper] = useState("");
  const [phoneShipper, setPhoneShipper] = useState("");
  const handleSubmit = () => {
    mutation.mutate({
      orderNumber: id as string,
      shipperName: nameShipper as string,
      shipperPhone: phoneShipper as string,
    });
    console.log({
      selected: selected,
      nameShipper: nameShipper,
      phoneShipper: phoneShipper,
    });
    // setIsOpen(false);
  };
  const deliveryBrands = [
    { name: "Giao hàng nhanh (GHN)" },
    { name: "J&T Express" },
    { name: "Giao hàng tiết kiệm (GHTK)" },
    { name: "Viettel Post" },
    { name: "Vietnam Post" },
  ];
  const [selected, setSelected] = useState(deliveryBrands[0]);

  const { data: order } = trpc.order.getOneWhere.useQuery({ orderNumber: id as string });
  return (
    <>
      <NavbarAdmin />

      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css" />
      <div className="mx-1 px-4 py-20 2xl:container md:px-6 2xl:mx-auto 2xl:px-20">
        <div className="item-start flex flex-col justify-start space-y-2 ">
          <h1 className="text-3xl font-semibold leading-7 text-gray-800 lg:text-4xl  lg:leading-9">
            Đơn hàng {id}
          </h1>
          <p className="text-base font-medium leading-6 text-gray-600">
            {order?.orderDate.toDateString() + " at " + order?.orderDate.toTimeString()}{" "}
          </p>
          <p className="text-base font-medium leading-6 text-gray-600">{order?.customerNumber} </p>
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
                    <OrderedItem item={item} disable={true} />
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
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold leading-5 text-gray-800">Vận chuyển</h3>
                  <h3 className="text-base leading-5 ">
                    {order?.status === "SHIPPED" && (
                      <>
                        <p>Đã giao</p> <p>{"Shipper: " + order?.shipperName}</p>
                        <p>{"Số điện thoại: " + order?.shipperPhone}</p>
                      </>
                    )}
                    {order?.status === "CONFIRM_PENDING" && <p>Đang chờ xác nhận</p>}
                    {order?.status === "INPROCESS" && (
                      <>
                        <p>Đang giao</p> <p>{"Shipper: " + order?.shipperName}</p>
                        <p>{"Số điện thoại: " + order?.shipperPhone}</p>{" "}
                      </>
                    )}
                    {order?.status === "CANCEL" && <p>Đã hủy</p>}
                    {order?.status === "CANCEL_PENDING" && <p>Đang chờ hủy</p>}
                    {order?.status === "RETURN_PENDING" && <p> Đang chờ đổi/ trả</p>}
                    {order?.status === "RETURN" && (
                      <>
                        <p>Đã đổi/trả</p> <p>{"Shipper: " + order?.shipperName}</p>
                        <p>{"Số điện thoại: " + order?.shipperPhone}</p>{" "}
                      </>
                    )}
                    {order?.status === "COMPLETED" && (
                      <>
                        {" "}
                        <p>Hoàn thành</p> <p>{"Shipper: " + order?.shipperName}</p>
                        <p>{"Số điện thoại: " + order?.shipperPhone}</p>
                      </>
                    )}
                  </h3>
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
                        {order?.status === "RETURN_PENDING" || order?.status === "CANCEL_PENDING"
                          ? "Lý do:"
                          : "Aladin Delivery"}
                        <br />
                        {order?.status === "RETURN_PENDING" && <p>{order?.cancelReason}</p>}
                        {order?.status === "CANCEL_PENDING" && <p>{order?.cancelReason}</p>}
                        {!(order?.status === "RETURN_PENDING") &&
                          !(order?.status === "CANCEL_PENDING") && (
                            <span className="font-normal">Giao hàng toàn quốc</span>
                          )}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 text-gray-800">0 &#8363;</p>
                </div>
                <div className="flex w-full items-center justify-center">
                  {/* TODO: Sửa lại màu cho đơn hàng bị cancel */}
                  {/* <button className="w-96 bg-gray-800 py-5 text-base font-medium leading-4 text-white focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 hover:bg-black md:w-full"> */}
                  {/* {order?.status} */}
                  {order?.status === "CONFIRM_PENDING" && (
                    <UpdateInProcessStatus
                      isOpen={isOpen}
                      openModal={openModal}
                      handleSubmit={handleSubmit}
                      closeModal={closeModal}
                      setNameShipper={setNameShipper}
                      setPhoneShipper={setPhoneShipper}
                      nameShipper={nameShipper}
                      phoneShipper={phoneShipper}
                      selected={selected}
                      setSelected={setSelected}
                      deliveryBrands={deliveryBrands}
                    />
                  )}
                  {order?.status === "INPROCESS" && (
                    <UpdateOtherStatus
                      isOpen={isOpen}
                      openModal={openModal}
                      closeModal={closeModal}
                      handleUpdateStatus={() => handleUpdateStatus(OrderStatus.INPROCESS)}
                      updateStatus="Đã giao"
                    />
                  )}
                  {order?.status === "CANCEL_PENDING" && (
                    <UpdateOtherStatus
                      isOpen={isOpen}
                      openModal={openModal}
                      closeModal={closeModal}
                      handleUpdateStatus={() => handleUpdateStatus(OrderStatus.CANCEL_PENDING)}
                      updateStatus="Đã hủy"
                    />
                  )}
                  {order?.status === "RETURN_PENDING" && (
                    <UpdateOtherStatus
                      isOpen={isOpen}
                      openModal={openModal}
                      closeModal={closeModal}
                      handleUpdateStatus={() => handleUpdateStatus(OrderStatus.RETURN_PENDING)}
                      updateStatus="Đã đổi / trả"
                    />
                  )}

                  {/* </button> */}
                </div>
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
                <div className="flex w-full items-center justify-center md:items-start md:justify-start">
                  {/* <button
                    className="mt-6 w-96 border border-gray-800 py-5 text-base font-medium leading-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 hover:bg-gray-200 md:mt-0 2xl:w-full"
                    onClick={handleCancelOrder}>
                    Hủy/ Đổi trả đơn hàng
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderDetailAdmin;

function SelectionList({
  selected,
  setSelected,
  deliveryBrands,
}: {
  selected: { name: string } | undefined;
  setSelected: React.Dispatch<React.SetStateAction<{ name: string }>>;
  deliveryBrands: { name: string }[];
}) {
  return (
    <div className="w-full">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full rounded-md border p-2 text-left focus:outline-none">
            <span className="block truncate">{selected?.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {deliveryBrands.map((brand) => (
                <Listbox.Option
                  key={brand.name}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={brand}>
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {brand.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

function UpdateInProcessStatus({
  isOpen,
  openModal,
  handleSubmit,
  closeModal,
  setNameShipper,
  setPhoneShipper,
  nameShipper,
  phoneShipper,
  selected,
  setSelected,
  deliveryBrands,
}: {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleSubmit: () => void;
  setNameShipper: React.Dispatch<React.SetStateAction<string>>;
  setPhoneShipper: React.Dispatch<React.SetStateAction<string>>;
  nameShipper: string;
  phoneShipper: string;
  selected: { name: string } | undefined;
  setSelected: React.Dispatch<React.SetStateAction<{ name: string }>>;
  deliveryBrands: Array<{ name: string }>;
}) {
  return (
    <div className=" w-full">
      <div className="flex w-full items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className=" bg-gray-600 py-5 text-base font-medium uppercase leading-4 text-white focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 hover:bg-gray-700 md:w-full">
          Cập nhật
        </button>
      </div>

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-10 py-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Trạng thái: Đang giao
                  </Dialog.Title>
                  <div className="mt-5">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="info_delivery"
                        className="text-base font-semibold text-gray-700">
                        Đơn vị vận chuyển
                      </label>
                      {/* <input
                        type="text"
                        id="info_delivery"
                        className="w-full rounded-md border border-gray-300 p-2 outline-none"
                      /> */}
                      <SelectionList
                        selected={selected}
                        setSelected={setSelected}
                        deliveryBrands={deliveryBrands}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="mt-5 font-semibold text-gray-700">Thông tin shipper</h1>
                      <label htmlFor="name_shipper">Họ tên</label>
                      <input
                        type="text"
                        id="name_shipper"
                        onChange={(e) => {
                          setNameShipper(e.target.value);
                        }}
                        value={nameShipper}
                        className="w-full rounded-md border border-gray-300 p-2 outline-none"
                      />
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                      <label htmlFor="phone_shipper">Số điện thoại</label>
                      <input
                        type="tel"
                        id="phone_shipper"
                        onChange={(e) => {
                          setPhoneShipper(e.target.value);
                        }}
                        value={phoneShipper}
                        className="w-full rounded-md border border-gray-300 p-2 outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex h-10 w-24 items-center justify-center rounded-md border border-transparent bg-blue-100 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200"
                      onClick={handleSubmit}>
                      Cập nhật
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-10 w-24 items-center justify-center rounded-md border border-transparent bg-red-200 text-sm font-medium text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 hover:bg-red-300"
                      onClick={closeModal}>
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
}

function UpdateOtherStatus({
  isOpen,
  openModal,
  closeModal,
  handleUpdateStatus,
  updateStatus,
}: {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleUpdateStatus: () => void;
  updateStatus: string;
}) {
  return (
    <div className=" w-full">
      <div className="flex w-full items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className=" bg-gray-600 py-5 text-base font-medium uppercase leading-4 text-white focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 hover:bg-gray-700 md:w-full">
          Cập nhật
        </button>
      </div>

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
            <div className="flex min-h-full items-center justify-center p-2 text-center">
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
                    {`Bạn muốn cập nhật trạng thái thành ${updateStatus}?`}
                  </Dialog.Title>
                  <div className="mt-5"></div>

                  <div className="mt-10 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex h-10 w-24 items-center justify-center rounded-md border border-transparent bg-blue-100 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200"
                      onClick={handleUpdateStatus}>
                      Cập nhật
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-10 w-24 items-center justify-center rounded-md border border-transparent bg-red-200 text-sm font-medium text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 hover:bg-red-300"
                      onClick={closeModal}>
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
}
