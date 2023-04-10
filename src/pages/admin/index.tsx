import { OrderStatus } from "@prisma/client";
import { inferRouterOutputs } from "@trpc/server";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import { getAmountOrder } from "../../components/admin/OrdersList";
import { env } from "../../env/server.mjs";
import { AppRouter } from "../../server/trpc/router/_app";

import { trpc } from "../../utils/trpc";

function getSumAmountOrders(orders: inferRouterOutputs<AppRouter>["order"]["getAll"]) {
  let sumAmount = 0;
  orders?.map((order) => {
    if (order.status !== OrderStatus.CANCEL) sumAmount += getAmountOrder(order?.orderdetail);
  });
  return sumAmount;
}

const Admin: NextPage = () => {
  const { data: users } = trpc.user.getAll.useQuery();
  const { data: orders } = trpc.order.getAll.useQuery();
  const { data: products } = trpc.product.getAll.useQuery();
  return (
    <div className=" h-full w-full text-sm md:text-base">
      <NavbarAdmin />
      <main className="w-full bg-[#f9fafb] px-5 py-10 md:px-36 ">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:px-32 lg:py-10">
          <div className="rounded-xl bg-[#ffcfe1] p-4 shadow-sm ">
            <div className="p-4">
              <div className="mb-2 text-lg font-semibold text-gray-800 md:text-2xl">
                {users?.length}
              </div>
              <div className="flex text-sm text-gray-600 md:text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
                <span className="ml-2">Người dùng</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-[#fef3c7] p-4 shadow-sm ">
            <div className="p-4">
              <div className="mb-2 text-lg font-semibold text-gray-800 md:text-2xl">
                {orders?.length}
              </div>
              <div className="flex  text-sm text-gray-600 md:text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
                <span className="ml-2">Đơn hàng</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-[#d1fae5] p-4 shadow-sm ">
            <div className="p-4">
              <div className="mb-2 text-lg font-semibold text-gray-800 md:text-2xl">
                {products?.length}
              </div>
              <div className="flex text-sm text-gray-600 md:text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                <span className="ml-2">Sản phẩm</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-[#70d1e5] p-4 shadow-sm ">
            <div className="p-4">
              <div className="mb-2 text-lg font-semibold text-gray-800 md:text-2xl">
                {(getSumAmountOrders(orders ?? []) * 600).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
              <div className="flex text-sm text-gray-600 md:text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="ml-2">Doanh số</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Admin;

// getserversideprops to redirect if not admin

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // check session with next-auth
  const session = await getSession(context);
  if (!session || (session.user?.email && env.ADMIN_EMAILS.indexOf(session.user?.email) === -1)) {
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
