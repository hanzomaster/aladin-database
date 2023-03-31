import Link from "next/link";
import React from "react";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="navbar-expand-lg absolute top-0 z-50 flex w-full flex-wrap items-center justify-between px-2 py-3">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
          <div className="relative flex w-full justify-between lg:static lg:block lg:w-auto lg:justify-start">
            <Link href="/home">
              <a className="mr-4 inline-block whitespace-nowrap py-2 text-lg font-bold uppercase leading-relaxed text-white">
                Aladin
              </a>
            </Link>
            <button
              className="block cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none outline-none focus:outline-none lg:hidden"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}>
              <i className="fas fa-bars text-white"></i>
            </button>
          </div>
          <div
            className={
              "flex-grow items-center bg-white lg:flex lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning">
            <ul className="flex list-none flex-col lg:ml-auto lg:flex-row">
              <li className="flex items-center">
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase text-[#334155] lg:py-2 lg:text-white lg:hover:text-[#E2E8F0] "
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-nextjs%2F">
                  <i className="fab fa-facebook leading-lg text-lg text-[#94A3B8] lg:text-[#E2E8F0] " />
                  <span className="ml-2 inline-block lg:hidden">Share</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase text-[#334155] lg:py-2 lg:text-white lg:hover:text-[#E2E8F0]"
                  href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-nextjs%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20NextJS%20UI%20Kit%20and%20Admin.%20Let%20Notus%20NextJS%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level.">
                  <i className="fab fa-twitter leading-lg text-lg text-[#94A3B8] lg:text-[#E2E8F0] " />
                  <span className="ml-2 inline-block lg:hidden">Tweet</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase text-[#334155] lg:py-2 lg:text-white lg:hover:text-[#E2E8F0]"
                  href="https://github.com/creativetimofficial/notus-nextjs?ref=nnjs-auth-navbar">
                  <i className="fab fa-github leading-lg text-lg text-[#94A3B8] lg:text-[#E2E8F0] " />
                  <span className="ml-2 inline-block lg:hidden">Star</span>
                </a>
              </li>

              <li className="flex items-center">
                <Link href="/">
                  <button
                    className="active:bg-blueGray-50 ml-3 mb-3 rounded bg-white px-4 py-2 text-xs font-bold uppercase text-[#334155] shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:shadow-md lg:mr-1 lg:mb-0"
                    type="button">
                    <i className="fas fa-arrow-alt-circle-down"></i> Home
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
