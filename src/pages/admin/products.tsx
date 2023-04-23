import { inferRouterOutputs } from "@trpc/server";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { AppRouter } from "../../server/trpc/router/_app";
import { trpc } from "@utils/trpc";

import NavbarAdmin from "../../components/admin/NavbarAdmin";
import ProductsList from "../../components/admin/ProductsList";
import Searchbar from "../../components/admin/Searchbar";
export const postsPerPage = 20;

const Orders: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    e.persist();
    setSearch(e.target.value);
  };

  const { data } = trpc.product.getAll.useQuery();
  const [searchResult, setSearchResult] = useState<
    inferRouterOutputs<AppRouter>["product"]["getAllOnSale"] | undefined
  >(data);

  useEffect(() => {
    const results = data?.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchResult(results);
  }, [search, data]);

  // Get current posts to paginate
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts: inferRouterOutputs<AppRouter>["product"]["getAllOnSale"] | undefined =
    searchResult?.slice(firstPostIndex, lastPostIndex);
  return (
    <div className="h-full w-full text-sm md:text-base">
      <NavbarAdmin />
      <main className="px-5 py-10 md:px-10 lg:px-20">
        <h1 className="text-3xl font-medium text-gray-900 ">Products</h1>
        <Searchbar handleChange={handleChange} placeholder={"Tìm kiếm theo tên sản phẩm"} />
        {searchResult?.length !== data?.length && (
          <h2 className="mt-4 text-xl font-medium text-gray-900">
            {`Kết quả tìm kiếm: ${searchResult?.length}`}
          </h2>
        )}
        <div className="mt-5">
          <ProductsList productsData={currentPosts} />
        </div>
        <div className="flex w-full items-center justify-center">
          <Pagination
            totalPosts={searchResult?.length ?? 0}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </main>
    </div>
  );
};
export default Orders;
