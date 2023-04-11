// import { BsHeart } from 'react-icons/bs'
import { Dialog, Transition } from "@headlessui/react";
import { Address } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import Select from "react-select";
import { useToast } from "../components/Toast";
import NavBar from "../components/navbar";
import useLocationForm from "../constants/useLocationForm";
import { checkout } from "../utils/checkout";
import { trpc } from "../utils/trpc";

const CheckOut = () => {
  const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(false);
  const { data: sessionData } = useSession();
  const [disable, setDisable] = useState(true);
  const { add: toast } = useToast();
  const { data: cartData } = trpc.cart.get.useQuery();

  const { data: addressList } = trpc.user.address.get.useQuery();

  const mutation = trpc.order.create.useMutation({
    onError: () => {
      window.location.href = "/checkoutsuccess/error";
    },
    onSuccess: () => {
      toast({
        type: "success",
        duration: 6000,
        message: "Đặt hàng thành công!",
        position: "topCenter",
      });
      window.location.href = "/checkoutsuccess/success";
    },
  });
  let total = 0;
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const [name, setName] = useState(sessionData?.user?.name);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const [detailAddress, setDetailAddress] = useState("");

  const handleDetailAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(event.target.value);
  };

  const [note, setNote] = useState("");

  // handle onlick dialog button
  const [isDefault, setIsDefault] = useState(false);

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [idAddress, setIdAddress] = useState("");

  const handleDialogBtnClicked = (address: Address) => {
    setIsDefault(true);
    setName(address.receiver);
    setPhone(address.phone);
    setDetailAddress(address.detail);
    setCity(address.city);
    setDistrict(address.district);
    setWard(address.ward);
    setIdAddress(address.id);
    setIsOpen(false);
  };
  const handleCheckOutBtnClicked = () => {
    if (isDefault) {
      mutation.mutate({
        note: note ?? "",
        addressId: idAddress,
      });
    } else {
      mutation.mutate({
        note: note ?? "",
        address: {
          phone: phone ?? "",
          receiver: name as string,
          city: selectedCity?.label as string,
          district: selectedDistrict?.label as string,
          ward: selectedWard?.label as string,
          detail: detailAddress ?? "",
        },
      });
    }
  };

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsDefault(false);
    setIsOpen(false);
    setName("");
    setPhone("");
    setDetailAddress("");
  }

  function openModal() {
    setIsOpen(true);
    setIsDefault(true);
  }

  return (
    <>
      <div className="h-full w-full text-sm md:text-base">
        <section className="">
          <NavBar />
        </section>
        <div className="p- mx-1 gap-5 px-32 py-10">
          <div className="mx-auto mt-10 flex w-full flex-col px-0 md:flex-row">
            <div className="flex flex-col md:w-full">
              <h2 className="text-heading mb-4 font-bold md:text-xl ">Địa chỉ giao hàng:</h2>
              <form className="mx-auto w-full justify-center" method="post">
                <div className="">
                  <div className="space-x-0 lg:flex lg:space-x-4">
                    <div className="w-full lg:w-full">
                      <label
                        htmlFor="firstName"
                        className="mb-3 block text-sm font-semibold text-gray-500">
                        Họ và tên:
                      </label>
                      <input
                        name="firstName"
                        value={name as string}
                        placeholder={"Họ và tên"}
                        onChange={handleNameChange}
                        disabled={isDefault}
                        required
                        type="text"
                        className="w-full rounded border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 lg:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full">
                      <label
                        htmlFor="Email"
                        className="mb-3 block text-sm font-semibold text-gray-500">
                        Số điện thoại:
                      </label>
                      <input
                        name="Last Name"
                        value={phone}
                        onChange={handlePhoneChange}
                        disabled={isDefault}
                        type="text"
                        placeholder="Số điện thoại"
                        required
                        className="w-full rounded border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 lg:text-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-5">
                    <label
                      htmlFor="Email"
                      className="mb-3 block text-sm font-semibold text-gray-500">
                      Địa chỉ:
                      <div className=" justify-between">
                        {/* Dialog */}
                        <>
                          <div className="">
                            <button
                              type="button"
                              onClick={openModal}
                              className="mt-2 rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 hover:bg-blue-400">
                              Chọn địa chỉ sẵn có
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
                                    <Dialog.Panel className=" w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                      <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900">
                                        Địa chỉ giao hàng
                                      </Dialog.Title>
                                      <div className="relative mt-2 flex h-64 flex-col overflow-y-scroll scrollbar scrollbar-none">
                                        {addressList?.map((address) => {
                                          return (
                                            <div
                                              className="flex flex-col border-b-2 py-4 text-left text-base hover:bg-slate-100 md:flex-row md:justify-between"
                                              key={address.id}>
                                              <div>
                                                <header className="flex ">
                                                  <h1 className="mr-4 text-sm font-semibold sm:text-base">
                                                    {address.receiver}
                                                  </h1>
                                                  <p className="border-l-2 pl-1 text-sm sm:text-base">
                                                    {address.phone}
                                                  </p>
                                                </header>

                                                <p className="">{address.detail}</p>
                                                <p className="">
                                                  {`${address.ward}, ${address.district}, ${address.city}`}
                                                </p>

                                                <span
                                                  className="border-[1px] border-[#da291c] px-[0.1rem] text-[#da291c]"
                                                  hidden={!address.isDefault}>
                                                  Mặc định
                                                </span>
                                              </div>

                                              <button
                                                className="relative h-10 rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 hover:bg-red-200"
                                                onClick={() => handleDialogBtnClicked(address)}>
                                                Sử dụng
                                              </button>
                                            </div>
                                          );
                                        })}
                                      </div>

                                      <div className="mt-4">
                                        <button
                                          type="button"
                                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200"
                                          onClick={closeModal}>
                                          Thêm địa chỉ mới
                                        </button>
                                      </div>
                                    </Dialog.Panel>
                                  </Transition.Child>
                                </div>
                              </div>
                            </Dialog>
                          </Transition>
                        </>

                        {isDefault && (
                          <div className="pt-2">
                            <div className="text-lg font-semibold text-gray-900">
                              <span className=" mr-4 border-r-2 pr-4">Tên: {name}</span>
                              <span className="">SĐT: {phone}</span>
                            </div>
                            <div>
                              <p className="text-base font-normal text-gray-900">{`${detailAddress}`}</p>
                              <p className="text-base font-normal text-gray-900">{`${ward}, ${district}, ${city}`}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                    <Select
                      name="cityId"
                      key={`cityId_${selectedCity?.value}`}
                      isDisabled={cityOptions.length === 0 || isDefault}
                      options={cityOptions}
                      onChange={(option) => {
                        if (option) {
                          onCitySelect({
                            value: option.value,
                            label: option.label,
                          });
                        }
                      }}
                      placeholder="Tỉnh/Thành"
                      defaultValue={selectedCity}
                    />

                    <Select
                      name="districtId"
                      key={`districtId_${selectedDistrict?.value}`}
                      isDisabled={districtOptions.length === 0}
                      options={districtOptions}
                      onChange={(option) => {
                        if (option)
                          onDistrictSelect({
                            value: option.value,
                            label: option.label,
                          });
                      }}
                      placeholder="Quận/Huyện"
                      className="z-5"
                      defaultValue={selectedDistrict}
                    />

                    <Select
                      name="wardId"
                      key={`wardId_${selectedWard?.value}`}
                      isDisabled={wardOptions.length === 0}
                      options={wardOptions}
                      placeholder="Phường/Xã"
                      className="z-5"
                      onChange={(option) => {
                        if (option) {
                          setDisable(false);
                          onWardSelect({
                            value: option.value,
                            label: option.label,
                          });
                        }
                      }}
                      defaultValue={selectedWard}
                    />
                  </div>
                  <div className="mt-4">
                    <div className="w-full">
                      <label
                        htmlFor="Detail Adress"
                        className="mb-3 block text-sm font-semibold text-gray-500">
                        Địa chỉ chi tiết:
                      </label>
                      <input
                        name="Last Name"
                        type="text"
                        value={detailAddress}
                        placeholder=""
                        disabled={isDefault}
                        onChange={handleDetailAddressChange}
                        className="w-full rounded border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 lg:text-sm"
                      />
                    </div>
                  </div>

                  <div className="relative pt-3 xl:pt-6">
                    <label
                      htmlFor="note"
                      className="mb-3 block text-sm font-semibold text-gray-500">
                      {" "}
                      Ghi chú (Nếu có)
                    </label>
                    <textarea
                      onChange={(e) => setNote(e.target.value)}
                      name="note"
                      className="focus:ring-black-600 flex w-full resize-none items-center rounded border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1"
                      placeholder="Notes for delivery"></textarea>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button
                      className="mr-4 w-full rounded-lg bg-blue-100 px-6 py-2 font-bold text-blue-900 enabled:hover:bg-blue-300"
                      disabled={(disable || phone === "" || name === "") && !isDefault}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCheckOutBtnClicked();
                      }}>
                      Thanh toán khi nhận hàng
                    </button>
                    <button
                      className="w-full rounded-lg bg-red-100 px-6 py-2 font-bold text-red-700 enabled:hover:hover:bg-red-200"
                      disabled={(disable || phone === "" || name === "") && !isDefault}
                      onClick={(e) => {
                        e.preventDefault();
                        checkout({
                          lineItems: [
                            {
                              price: "price_1MGikvFGv0kJxmcOES5iimdl",
                              quantity: 1,
                            },
                          ],
                        });
                        handleCheckOutBtnClicked();
                      }}>
                      Thanh toán trực tuyến
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="ml-0 flex w-full flex-col lg:ml-12 lg:w-2/5">
              <div className="pt-12 md:pt-0 2xl:ps-4">
                <h2 className="text-xl font-bold">Đơn hàng</h2>
                <div className="mt-8 ">
                  <div className="flex h-80 w-auto flex-col space-y-4 overflow-y-scroll border-black scrollbar-thin scrollbar-none ">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {cartData?.cartItem?.map((product) => {
                        total =
                          total +
                          parseFloat(
                            (
                              (product.productDetail.product.buyPrice as unknown as number) *
                              product.numberOfItems *
                              0.6
                            ).toString()
                          );
                        return (
                          <li
                            key={product.productDetailId}
                            className="flex rounded-lg bg-slate-50 px-1 py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <div className="relative h-full w-full">
                                <Image
                                  src={product?.productDetail?.image}
                                  layout="fill"
                                  alt="Ảnh sản phẩm"
                                  className=" object-cover object-center"
                                  priority={true}
                                />
                              </div>
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <p>{product?.productDetail?.product?.name}</p>
                                  </h3>
                                  <p className="ml-4">
                                    {(
                                      parseFloat(
                                        product?.productDetail?.product?.buyPrice.toString()
                                      ) * 1000
                                    ).toLocaleString("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    })}
                                  </p>
                                </div>
                                <div className=" inline-block">
                                  <p
                                    style={{
                                      background: `#${product?.productDetail?.colorCode}`,
                                    }}
                                    className="mt-1 text-sm text-gray-500">
                                    {product.productDetail.colorCode}
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Size: {product?.size}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className=" inline-block text-gray-500">
                                  SL:
                                  <div className="inline-block">{product?.numberOfItems}</div>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 flex p-4">
                  <h2 className="text-xl font-bold">
                    Số lượng sản phẩm: {cartData?.cartItem.length}
                  </h2>
                </div>
                <div className="text-heading flex w-full items-center border-b border-gray-300 py-4 text-sm font-semibold last:border-b-0 last:pb-0 last:text-base lg:px-3 lg:py-5">
                  Giá đơn hàng
                  <span className="ml-2 text-base">
                    {(total * 1000).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                    <small className="ml-2 mr-3  rounded-full bg-red-700 px-2 tracking-widest text-white">
                      -40&#37;
                    </small>
                  </span>
                </div>
                <div className="text-heading flex w-full items-center border-b border-gray-300 py-4 text-sm font-semibold last:border-b-0 last:pb-0 last:text-base lg:px-3 lg:py-5">
                  Phí ship<span className="ml-2">0&#8363;</span>
                </div>
                <div className="text-heading flex w-full items-center border-b border-gray-300 py-4 text-sm font-semibold last:border-b-0 last:pb-0 last:text-base lg:px-3 lg:py-5">
                  Tổng
                  <span className="ml-2">
                    {(total * 1000).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CheckOut;
