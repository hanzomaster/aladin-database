import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NavbarAdmin from "../../../components/admin/NavbarAdmin";
import OrderedItem from "../../../components/user/OrderedItem";
import { trpc } from "../../../utils/trpc";

const OrderDetailAdmin = () => {
  const router = useRouter();
  const { id } = router.query;
  let total = 0;
  const { data: session } = useSession();
  const mutation = trpc.order.cancelOrder.useMutation();

  const handleCancelOrder = () => {
    mutation.mutate({
      orderNumber: id as string,
    });
  };

  const { data: order } = trpc.order.getOneWhere.useQuery({ orderNumber: id as string });
  return (
    <>
      <NavbarAdmin />

      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css" />
      <div className="p- p- mx-1 py-20 px-4 md:px-6 2xl:container 2xl:mx-auto 2xl:px-20">
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
                    <OrderedItem item={item} disable={!(order.status === "SHIPPED")} />
                  </>
                );
              })}
            </div>
            <div className="flex w-full flex-col items-stretch justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-6 xl:space-x-8">
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
                <h3 className="text-xl font-semibold leading-5 text-gray-800">Vận chuyển</h3>
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
                <div className="flex w-full items-center justify-center">
                  {/* TODO: Sửa lại màu cho đơn hàng bị cancel */}
                  <button className="w-96 bg-gray-800 py-5 text-base font-medium leading-4 text-white focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 hover:bg-black md:w-full">
                    {order?.status}
                  </button>
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
                      {order?.comments}
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
