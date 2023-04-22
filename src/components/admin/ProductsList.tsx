import { inferRouterOutputs } from "@trpc/server";
import { trpc } from "@utils/trpc";
import { useToast } from "../../components/Toast";
import { AppRouter } from "../../server/trpc/router/_app";
import QuantityProduct from "./QuantityProduct";
const ProductsList = ({
  productsData,
}: {
  productsData: inferRouterOutputs<AppRouter>["product"]["getAll"] | undefined;
}) => {
  const { add: toast } = useToast();
  const mutation = trpc.product.removeFromStock.useMutation({
    onSuccess: () => {
      toast({
        type: "success",
        duration: 6000,
        message: "Xóa sản phẩm thành công",
        position: "topCenter",
      });
      // setIsOpen(false);
    },
  });

  const handleRemove = (id: string) => {
    mutation.mutate({ code: id });
  };
  return (
    <div className="mb-10 h-full w-full">
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
              Mã sản phẩm
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
              Giới tính
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
              Dòng sản phẩm
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
              Tên sản phẩm
            </th>

            <th
              scope="col"
              className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
              Giá &#40;K &#8363;&#41;
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
              Số lượng
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {productsData?.map((product, index: number) => {
            return (
              <tr
                key={index}
                className="cursor-pointer border-b bg-white text-sm transition duration-300 ease-in-out hover:bg-gray-100 md:text-base">
                <td className="whitespace-nowrap px-2 py-3 md:px-6">{index + 1}</td>
                <td className="whitespace-nowrap px-2 py-3 md:px-6">
                  <a href={"/admin/productDetail/" + product.code}>{product.code}</a>
                </td>
                <td className="whitespace-nowrap px-2 py-3 md:px-6">
                  {product.line?.gender == "M" ? "Nam" : "Nữ"}
                </td>
                <td className="whitespace-nowrap px-2 py-3 md:px-6">{product.line?.type}</td>
                <td className="whitespace-nowrap px-2 py-3 md:px-6">{product.name}</td>

                <td className="whitespace-nowrap px-2 py-3 md:px-6">
                  {product.buyPrice.toString()}
                </td>

                <td className="whitespace-nowrap px-2 py-3 md:px-6">
                  <QuantityProduct productDetail={product.productDetail} />
                </td>
                <td className="whitespace-nowrap px-2 py-3 md:px-6">
                  <button
                    className="rounded-md bg-red-500 text-white"
                    onClick={() => handleRemove(product.code)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
