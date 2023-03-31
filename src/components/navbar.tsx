import { Dialog, Transition } from "@headlessui/react";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { Gender } from "@prisma/client";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, Fragment, KeyboardEvent, useState } from "react";
import { useCart } from "../context/CartContext";
import { trpc } from "../utils/trpc";
import CartItem from "./cartItem";
import DropdownComponent from "./dropdownmenu";

const userFunc = ["Quản lý tài khoản", "Quản lý đơn hàng", "Đăng xuất"];
const menuData = ["Sign in"];

const NavBar = () => {
  const { cart } = useCart();
  const { data: cartData } = trpc.cart.get.useQuery();
  const { data: sessionData } = useSession();

  const { data: productLineData } = trpc.productLine.getAll.useQuery();
  const maleData = productLineData
    ?.filter((item) => item.gender === Gender.M)
    .map((item) => item.type);
  const femaleData = productLineData
    ?.filter((item) => item.gender === Gender.F)
    .map((item) => item.type);
  const [open, setOpen] = useState(false);

  let total = 0;

  const [message, setMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const getKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      window.location.href = "/home?name=" + message;
    }
  };

  return (
    <>
      {/* Cart here  */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full">
                  <div className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col bg-white shadow-xl">
                      <div className=" h-2/3 flex-1 py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Giỏ hàng
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}>
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="relative mt-8 h-[92%] overflow-y-scroll scrollbar scrollbar-none">
                          <div className="flow-root">
                            {/* <pre>{JSON.stringify(cart, null, 2)}</pre>
                            <p>Cart Data</p>
                            <pre>{JSON.stringify(cartData, null, 2)}</pre> */}
                            <ul role="list" className="-my-6 divide-y divide-gray-200 ">
                              {/* Code here */}
                              {open &&
                                (!cart.loading ? cart?.data?.cartItem : cartData?.cartItem)?.map(
                                  (product) => {
                                    total =
                                      total +
                                      parseFloat(
                                        (
                                          (product.productDetail.product
                                            .buyPrice as unknown as number) * product.numberOfItems
                                        ).toString()
                                      );
                                    return (
                                      <li key={product.productDetail.id} className="flex py-6">
                                        <CartItem product={product} />
                                      </li>
                                    );
                                  }
                                )}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Tổng giá tiền</p>
                          <p>
                            {(total * 1000).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Miễn phí vận chuyển toàn quốc.
                        </p>
                        <button
                          className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-300 px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-gray-900 hover:text-white"
                          onClick={() =>
                            sessionData ? (window.location.href = "/checkout") : null
                          }>
                          Thanh toán
                        </button>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            hoặc
                            <button
                              type="button"
                              className="pl-1 font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => {
                                setOpen(false);
                              }}>
                              Tiếp tục mua sắm
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Navbar here */}
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css" />
      <header className="sticky z-[10]">
        <nav className="fixed mt-0 flex w-full flex-wrap items-center justify-between border-t-2  border-solid border-gray-700 bg-[#eff6ff] py-4 shadow lg:px-12">
          <div className=" relative flex w-full justify-between border-b-2 border-solid border-gray-300 pl-6 pr-2 pb-5 lg:w-auto lg:border-b-0 lg:pb-0">
            <Link href="/home" className="mr-20 flex flex-shrink-0 items-center pr-6 text-gray-800">
              <div className="relative h-10 w-28 cursor-pointer object-fill">
                <Image
                  src="/logo2.jpg"
                  layout="fill"
                  alt="Logo"
                  className="relative h-10 w-28 cursor-pointer object-fill"></Image>
              </div>
            </Link>
            <div className="block lg:hidden ">
              {sessionData ? (
                <DropdownComponent title="user" type="user" data={userFunc} />
              ) : (
                <DropdownComponent title="menu" type="menu" data={menuData} />
              )}
            </div>
          </div>

          <div className="menu hidden w-full flex-grow px-8 lg:block lg:flex lg:w-auto lg:items-center lg:px-3">
            <div className="text-md font-bold text-gray-700 lg:flex-grow">
              <DropdownComponent title="Nam" type="male" data={maleData ?? []} />

              <DropdownComponent title="Nữ" type="female" data={femaleData ?? []} />
            </div>

            <div className="relative mx-auto hidden text-gray-600 lg:block">
              <input
                id="searchBar"
                className="h-10 rounded-lg border-2 border-gray-300 bg-white pl-2 pr-8 text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
                onChange={handleChange}
                onKeyDown={getKeyDown}
              />
              <button type="submit" className="absolute right-0 top-0 mt-3 mr-2">
                <Link href={"/home?name=" + message}>
                  <svg
                    className="h-4 w-4 fill-current text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 56.966 56.966"
                    xmlSpace="preserve"
                    width="512px"
                    height="512px">
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </Link>
              </button>
            </div>
            <AuthShowcase sessionData={sessionData} />
            <div className="flex justify-center px-4 md:block">
              <button
                className="
                  relative
                  text-gray-700
                  hover:text-gray-600
                  dark:text-gray-200
                  dark:hover:text-gray-300
                  "
                onClick={() => setOpen(true)}>
                <i className="fas fa-shopping-cart"></i>

                <span className=" absolute top-0 left-0 rounded-full bg-indigo-500 p-1 text-xs text-white "></span>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;

const AuthShowcase: React.FC<{ sessionData: Session | null }> = ({ sessionData }) => {
  return (
    <>
      {!sessionData && (
        <div className="flex ">
          <button
            className="text-md ml-2 mt-4 block rounded px-4 py-2 font-bold text-gray-700 hover:bg-gray-700 hover:text-white lg:mt-0"
            onClick={sessionData ? () => signOut() : () => signIn()}>
            Sign in
          </button>
        </div>
      )}
      {sessionData && <DropdownComponent title="user" type="user" data={userFunc} />}
    </>
  );
};
