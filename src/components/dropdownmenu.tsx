import { Menu, Transition } from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Fragment } from "react";

// TODO - Remove this
// const maleData = [
// "Coat",
// "Hoodie",
// "Jeans",
// "Pants",
// "Pj",
// "Polo",
// "Shirt",
// "Shorts",
// "Sweater",
// "T-shirt",
// ];
// const femaleData = [
//   "Coat",
//   "Hoodie",
//   "Jeans",
//   "Pants",
//   "Pj",
//   "Polo",
//   "Shirt",
//   "Shorts",
//   "Sweater",
//   "T-shirt",
// ];
// const userFunc = ["Quản lý tài khoản", "Quản lý đơn hàng", "Đăng xuất"];
// const menuData = ["Sign in", "Sign up"];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function menuName(name: string, img: string | null | undefined) {
  if (name === "menu") {
    return (
      <>
        <div>
          <Menu.Button className="mt-4 mr-1 block rounded px-4 py-2 hover:bg-gray-700 hover:text-white lg:mt-0 lg:inline-block">
            <svg
              className="h-3 w-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </Menu.Button>
        </div>
      </>
    );
  } else if (!img && name === "user") {
    return (
      <div>
        <Menu.Button className="mt-4 mr-1 ml-4 block rounded-full hover:bg-gray-700 hover:text-white lg:mt-0 lg:inline-block">
          <div className="relative h-7 w-7 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
            <svg
              className="text-black-400 absolute -left-1 h-9 w-9"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"></path>
            </svg>
          </div>
        </Menu.Button>
      </div>
    );
  } else if (img && name === "user") {
    return (
      <div>
        <Menu.Button className="mt-4 mr-1 ml-4 block rounded-full hover:bg-gray-700 hover:text-white lg:mt-0 lg:inline-block">
          <div className="relative h-7 w-7 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
            <img src={img} className="text-black-400 absolute h-8 w-8"></img>
            {/* <svg
              className="text-black-400 absolute -left-1 h-9 w-9"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"></path>
            </svg> */}
          </div>
        </Menu.Button>
      </div>
    );
  } else {
    return (
      <>
        <div>
          <Menu.Button className="mt-4 mr-1 block rounded px-4 py-2 hover:bg-gray-700 hover:text-white lg:mt-0 lg:inline-block">
            {name}
          </Menu.Button>
        </div>
      </>
    );
  }
}

export default function DropdownComponent({
  title,
  type,
  data,
}: {
  title: string;
  type: string;
  data: string[];
}) {
  const { data: sessionData } = useSession();
  return (
    <Menu as="div" className=" relative inline-block text-left">
      {menuName(title, sessionData?.user?.image)}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {type === "user" && (
              <h1 className="bg-slate-100 py-4 pl-3 font-bold">{sessionData?.user?.name}</h1>
            )}
            {(type === "male" || type === "female") &&
              data?.map((content) => {
                return (
                  <Menu.Item key={content}>
                    {({ active }) => (
                      <a
                        href={"/home?name=" + content + "&gender=" + type}
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}>
                        {content}
                      </a>
                    )}
                  </Menu.Item>
                );
              })}
            {type === "menu" &&
              data?.map((content) => {
                return (
                  <>
                    <Menu.Item>
                      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                      {/* @ts-ignore */}
                      {({ active }) => {
                        if (content === "Sign in")
                          return (
                            <div
                              onClick={() => signIn()}
                              className={classNames(
                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                "block cursor-pointer px-4 py-2 text-sm"
                              )}>
                              {content}
                            </div>
                          );
                      }}
                    </Menu.Item>
                  </>
                );
              })}
            {type === "user" &&
              data?.map((content) => {
                return (
                  <>
                    <Menu.Item>
                      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                      {/* @ts-ignore */}
                      {({ active }) => {
                        if (content === "Đăng xuất")
                          return (
                            <div
                              key={content}
                              onClick={() => {
                                signOut();
                                window.location.href = "/home";
                              }}
                              className={classNames(
                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                "block cursor-pointer px-4 py-2 text-sm"
                              )}>
                              {content}
                            </div>
                          );
                        if (content === "Quản lý tài khoản")
                          return (
                            <div
                              key={content}
                              onClick={() => (window.location.href = "/account")}
                              className={classNames(
                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                "block cursor-pointer px-4 py-2 text-sm"
                              )}>
                              {content}
                            </div>
                          );

                        if (content === "Quản lý đơn hàng")
                          return (
                            <div
                              key={content}
                              onClick={() => (window.location.href = "/purchase")}
                              className={classNames(
                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                "block cursor-pointer px-4 py-2 text-sm"
                              )}>
                              {content}
                            </div>
                          );
                      }}
                    </Menu.Item>
                  </>
                );
              })}
            {/* {getMenuData(type)} */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
