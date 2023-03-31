import { inferRouterOutputs } from "@trpc/server";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import OrdersList from "../../components/admin/OrdersList";
import Searchbar from "../../components/admin/Searchbar";
import Pagination, { postsPerPage } from "../../components/Pagination";
import { AppRouter } from "../../server/trpc/router/_app";
import { trpc } from "../../utils/trpc";

const Orders: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    e.persist();
    setSearch(e.target.value);
  };

  const { data } = trpc.order.getAll.useQuery();
  const [searchResult, setSearchResult] = useState<
    inferRouterOutputs<AppRouter>["order"]["getAll"] | undefined
  >(data);

  useEffect(() => {
    const results = data?.filter((order) =>
      order.orderNumber.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchResult(results);
  }, [search, data]);

  // Get current posts to paginate
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = searchResult?.slice(firstPostIndex, lastPostIndex);
  return (
    <div className="h-full w-full text-sm md:text-base">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <NavbarAdmin />
      <main className="p- px-5 py-10 md:px-10 lg:px-20">
        <h1 className="text-3xl font-medium text-gray-900 ">Orders</h1>
        <Searchbar placeholder="Search by order id" handleChange={handleChange} />
        {searchResult?.length !== data?.length && (
          <h2 className="mt-4 text-xl font-medium text-gray-900">
            {`Kết quả tìm kiếm: ${searchResult?.length}`}
          </h2>
        )}
        <OrdersList ordersData={currentPosts ?? []} />
        <div className="flex w-full items-center justify-center">
          <Pagination
            totalPosts={data?.length ?? 0}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </main>
    </div>
  );
};
export default Orders;
