import Link from "next/link";
import { useRouter } from "next/router";

const CheckOutSuccess = () => {
  const router = useRouter();
  const { status } = router.query;

  if (status === "success") {
    return (
      <>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css" />
        <div className="h-screen  bg-gray-100">
          <div className="w-1/2 bg-white p-6  md:mx-auto">
            <svg viewBox="0 0 24 24" className="mx-auto my-6 h-16 w-16 text-green-600">
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path>
            </svg>
            <div className="text-center">
              <h3 className="text-center text-base font-semibold text-gray-900 md:text-2xl">
                Đặt hàng thành công!
              </h3>
              <p className="my-2 text-gray-600">Đơn hàng của bạn đã được ghi nhận.</p>
              <p className="my-2 text-gray-600">
                Vui lòng kiểm tra thông tin đơn hàng ở mục{" "}
                <Link href="/purchase">
                  <span className="text-underline cursor-pointer font-semibold text-indigo-900">
                    {" "}
                    quản lý đơn hàng{" "}
                  </span>
                </Link>
                .
              </p>
              <p> Chúc bạn một ngày tốt lành! </p>
              <div className="py-10 text-center">
                <div className="bg-indigo-600 px-12 py-3 font-semibold text-white hover:bg-indigo-500">
                  <Link href="/home">VỀ TRANG CHỦ</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (status === "error") {
    return (
      <>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css" />
        <div className="h-screen  bg-gray-100">
          <div className="w-1/2 bg-white p-6  md:mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto my-6 h-16 w-16 bg-red-700 text-red-600"
              viewBox="0 0 512 512">
              <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32z" />
            </svg>

            <div className="text-center">
              <h3 className="text-center text-base font-semibold text-gray-900 md:text-2xl">
                Đặt hàng thất bại!
              </h3>
              <p className="my-2 text-gray-600">Vui lòng kiểm tra lại kết nối.</p>

              <p> Chúc bạn một ngày tốt lành! </p>
              <div className="py-10 text-center">
                <div className="bg-indigo-600 px-12 py-3 font-semibold text-white hover:bg-indigo-500">
                  <Link href="/home">VỀ TRANG CHỦ</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default CheckOutSuccess;
