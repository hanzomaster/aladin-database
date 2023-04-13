import { OrderDetail, OrderStatus } from "@prisma/client";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "../../server/trpc/router/_app";

export function getAmountOrder(orderdetail: OrderDetail[]) {
  let sum = 0;
  orderdetail?.map((item) => {
    sum += item?.quantityInOrdered * (item?.priceEach as any);
  });
  return sum;
}

function convertDate(inputFormat: Date) {
  function pad(s: number) {
    return s < 10 ? "0" + s : s;
  }
  const d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
}

const OrdersList = ({
  ordersData,
}: {
  ordersData: inferRouterOutputs<AppRouter>["order"]["getAll"];
}) => {
  return (
    <div className=" mb-10 w-full">
      <table className="w-full">
        <thead className="border-b bg-white">
          <tr>
            <th
              scope="col"
              className="px-2 py-3 text-left text-sm font-medium text-gray-900 md:px-6 md:text-base">
              #
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
              Mã đơn hàng
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
              Khách hàng
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
              Ngày đặt hàng
            </th>

            <th
              scope="col"
              className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
              Hóa đơn
            </th>

            <th
              scope="col"
              className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
              Trạng thái
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {ordersData?.map((order, index: number) => {
            return (
              <tr
                key={index}
                className="cursor-pointer border-b bg-white text-sm transition duration-300 ease-in-out hover:bg-gray-100 md:text-base"
                onClick={() => {
                  window.location.href = "/admin/orderdetail/" + order.orderNumber;
                }}>
                <td className="whitespace-nowrap px-2 py-3 md:px-6">{index + 1}</td>
                <td className="whitespace-nowrap px-2 py-3 md:px-6">{order.orderNumber}</td>
                <td className="whitespace-nowrap px-2 py-3 md:px-6">{order.customerNumber}</td>
                <td className="whitespace-nowrap px-2 py-3 md:px-6">
                  {`${convertDate(
                    order.orderDate
                  )} ${order.orderDate.getHours()}h:${order.orderDate.getMinutes()}m:${order.orderDate.getSeconds()}s`}
                </td>

                <td className="whitespace-nowrap px-2 py-3 md:px-6">
                  {getAmountOrder(order?.orderdetail)}
                </td>

                {/* order status */}
                {order.status === OrderStatus.INPROCESS && (
                  <td className="whitespace-nowrap px-2 py-3 md:px-6">
                    <span className="rounded-full bg-yellow-100 px-3 pb-2 pt-1 text-base font-medium text-yellow-700 ">
                      Đang giao
                    </span>
                  </td>
                )}
                {order.status === OrderStatus.CANCEL && (
                  <td className="whitespace-nowrap px-2 py-3 md:px-6">
                    <span className="rounded-full bg-red-100 px-3 pb-2 pt-1 text-base font-medium text-red-700 ">
                      Đã hủy
                    </span>
                  </td>
                )}
                {order.status === OrderStatus.SHIPPED && (
                  <td className="whitespace-nowrap px-2 py-3 md:px-6 ">
                    <span className="rounded-full bg-green-100 px-3 pb-2 pt-1 text-base font-medium text-green-700 ">
                      Đã giao
                    </span>
                  </td>
                )}
                {order.status === OrderStatus.CONFIRM_PENDING && (
                  <td className="whitespace-nowrap px-2 py-3 md:px-6 ">
                    <span className="rounded-full bg-blue-100 px-3 pb-2 pt-1 text-base font-medium text-blue-700 ">
                      Chờ xác nhận
                    </span>
                  </td>
                )}
                {order.status === OrderStatus.CANCEL_PENDING && (
                  <td className="whitespace-nowrap px-2 py-3 md:px-6 ">
                    <span className="rounded-full bg-orange-100 px-3 pb-2 pt-1 text-base font-medium text-orange-700 ">
                      Chờ huỷ
                    </span>
                  </td>
                )}
                {order.status === OrderStatus.RETURN && (
                  <td className="whitespace-nowrap px-2 py-3 md:px-6 ">
                    <span className="rounded-full bg-emerald-200 px-3 pb-2 pt-1 text-base font-medium text-emerald-700 ">
                      Đã đổi/trả
                    </span>
                  </td>
                )}
                {order.status === OrderStatus.RETURN_PENDING && (
                  <td className="whitespace-nowrap px-2 py-3 md:px-6 ">
                    <span className="rounded-full bg-cyan-100 px-3 pb-2 pt-1 text-base font-medium text-cyan-700 ">
                      Chờ đổi/trả
                    </span>
                  </td>
                )}
                {order.status === OrderStatus.COMPLETED && (
                  <td className="whitespace-nowrap px-2 py-3 md:px-6 ">
                    <span className="rounded-full bg-pink-100 px-3 pb-2 pt-1 text-base font-medium text-pink-700 ">
                      Hoàn thành
                    </span>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
