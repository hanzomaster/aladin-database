import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import DropdownComponent from "../dropdownmenu";
import { NavbarItems } from "./NavbarItems";

function NavbarAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="bg-[#eff6ff]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 ">
                <Link href="/admin">
                  <img
                    className="h-10 w-28 cursor-pointer object-fill"
                    src="/logo2.jpg"
                    alt="Workflow"
                  />
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {NavbarItems.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-md px-3 py-2 text-lg font-medium text-gray-900 hover:bg-indigo-100">
                      <Link href={item.path}>{item.title}</Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-900 focus:outline-none focus:ring-offset-indigo-100 hover:bg-indigo-100 hover:text-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
            <DropdownComponent title={"user"} type={"user"} data={["Đăng xuất"]} />
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95">
          {(ref) => (
            <div className="px-5 md:hidden" id="mobile-menu">
              <div ref={ref} className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {NavbarItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-indigo-100">
                    <i className="mr-2">{item.icon}</i>

                    <Link href={item.path}>{item.title}</Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default NavbarAdmin;
