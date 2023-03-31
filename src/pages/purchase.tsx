import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../components/navbar";
import SidebarAccount from "../components/user/SidebarAccount";

import { trpc } from "../utils/trpc";
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // check session with next-auth
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

const Purchase: NextPage = () => {
  const { data: orders } = trpc.order.getAllOfUser.useQuery();
  return (
    <div className="h-full w-full text-sm md:text-base">
      {/* Navbar */}
      <NavBar />
      {/* Content */}
      <div className="p- mx-1 py-10">
        <div className="mt-10 flex h-full border-4 px-4 pb-20 lg:px-10">
          <SidebarAccount />
          {/* main */}
          <div className="w-[80%] xl:w-[60%]">
            <header className="w-full border-b-2 py-5 pl-2 sm:pl-5 ">
              <h1 className="text-2xl font-semibold text-gray-800 md:text-3xl ">Tất cả đơn hàng</h1>
            </header>
            <main className="pl-5 md:pl-10 lg:pl-32">
              {orders?.reverse().map((item) => {
                let total = 0;
                for (const item1 of item.orderdetail) {
                  total = total + parseFloat(item1.priceEach.toString()) * item1.quantityInOrdered;
                }
                return (
                  <Link key={item.orderNumber} href={"/orderdetail/" + item.orderNumber}>
                    <div className=" m d:px-4 relative my-4 h-full w-full cursor-pointer bg-gray-50 px-2 pb-2 hover:bg-gray-100">
                      <header className="flex justify-between border-b-2 py-4">
                        <h1 className="  text-base font-semibold text-gray-800 sm:text-lg md:text-xl">
                          Xem chi tiết và đánh giá
                        </h1>
                        <div className="flex flex-col items-center text-xs sm:flex-row sm:text-base md:text-lg">
                          <p className="mr-2 sm:mr-4">{item.orderDate.toDateString()}</p>
                          <p className="text-[#0070f3]">{item.status}</p>
                        </div>
                      </header>
                      <main className="w-full">
                        <div className="mt-4 flex">
                          <div className=" relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <div className="relative h-full w-full"></div>
                            <Image
                              src={
                                item.orderdetail[0]?.productDetail.image
                                  ? item.orderdetail[0]?.productDetail.image
                                  : ""
                              }
                              layout="fill"
                              alt="Ảnh sản phẩm"
                              className="object-cover object-center"></Image>
                            {/* <img
                              className="w-full md:block"
                              src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
                              alt="dress"
                            /> */}
                          </div>
                          <div className="flex w-full flex-col justify-between px-2 md:px-10">
                            <div className="flex w-full justify-between">
                              <h1 className="text-sm font-medium text-gray-800 sm:text-base md:text-lg">
                                {item.orderdetail[0]?.productDetail.product.name}
                              </h1>
                            </div>
                            <div className="relative right-0 top-0 pr-4 ">
                              <div className="r-0 mt-0.5 inline-block">
                                {/* <del className="ml-2 text-lg text-red-700">
                                  {(
                                    (item.orderdetail[0]?.priceEach as unknown as number) * 1000
                                  ).toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </del> */}
                              </div>

                              {/* <p className="r-0 mt-2 ml-1 inline-block pr-4  text-xl">
                                {(
                                  (item.orderdetail[0]?.priceEach as unknown as number) * 600
                                ).toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </p> */}
                            </div>
                          </div>
                        </div>

                        <div className="absolute right-0 bottom-0 mb-2 pr-4 ">
                          <span className="text-xs sm:text-sm md:text-base">Tổng số tiền: </span>
                          <span className="text-sm font-medium text-gray-800 sm:text-lg md:text-xl">
                            {(total * 600).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>
                      </main>
                    </div>
                  </Link>
                );
              })}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Purchase;
