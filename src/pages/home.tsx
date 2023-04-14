import { Product } from "@prisma/client";
import { inferRouterOutputs } from "@trpc/server";
import { useRouter } from "next/router";
import { useState } from "react";
import Pagination from "../components/Pagination";
import ItemCard from "../components/itemCard";
import NavBar from "../components/navbar";
import { AppRouter } from "../server/trpc/router/_app";
import { trpc } from "../utils/trpc";
export const postsPerPage = 20;

const Products = () => {
  const router = useRouter();
  const { name } = router.query;
  const { gender } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const setPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  };

  // const [name, setName] = useState("");
  if (!gender && name) {
    // const [name, setName] = useState("");
    const { data } = trpc.product.search.useQuery({ name: name as string });
    const currentPosts: inferRouterOutputs<AppRouter>["product"]["search"] | undefined =
      data?.slice(firstPostIndex, lastPostIndex);
    return (
      <>
        <section>
          <NavBar />
        </section>
        <section className="mx-1 grid gap-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:px-20">
          <div className="col-span-6 block">
            <p className=" mt-10 text-xl font-bold sm:text-3xl">Kết quả cho: {name}</p>
          </div>
        </section>

        <section className=" p- -z-10 mx-1 grid gap-5 py-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:px-20">
          {data?.map((item) => {
            return <ItemCard key={item.code} item={item} />;
          })}
        </section>
        <div className="flex w-full items-center justify-center">
          <Pagination
            totalPosts={data?.length ?? 0}
            setCurrentPage={setPage}
            currentPage={currentPage}
          />
        </div>
      </>
    );
  }
  if (gender) {
    // const [name, setName] = useState("");
    const { data } = trpc.product.getManyWhere.useQuery({
      type: name as string,
      gender: gender === "male" ? "M" : "F",
    });
    // const currentPosts: inferRouterOutputs<AppRouter>["product"]["getAll"] | undefined =
    //   data?.slice(firstPostIndex, lastPostIndex);
    return (
      <>
        <section>
          <NavBar />
        </section>
        <section className=" p- mx-1 grid gap-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:px-20">
          <div className="col-span-6 block">
            <p className=" mt-10 text-xl font-bold sm:text-3xl">
              Kết quả cho: {name} - Giới tính: {gender === "male" ? "Nam" : "Nữ"}
            </p>
          </div>
        </section>

        <section className=" p- -z-10 mx-1 grid gap-5 py-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:px-20">
          {data?.map((item) => {
            return <ItemCard key={item.code} item={item} />;
            // }
          })}
        </section>
        <div className="flex w-full items-center justify-center">
          <Pagination
            totalPosts={data?.length ?? 0}
            setCurrentPage={setPage}
            currentPage={currentPage}
          />
        </div>
      </>
    );
  }
  if (!gender && !name) {
    const { data } = trpc.product.getAll.useQuery();

    const currentPosts: inferRouterOutputs<AppRouter>["product"]["getAll"] | undefined =
      data?.slice(firstPostIndex, lastPostIndex);

    return (
      <>
        <section>
          <NavBar />
        </section>

        <section className=" p- mx-1 grid gap-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:px-20">
          <img
            className="col-span-6 row-span-1 mt-10 hidden sm:block"
            src="/banner.jpg"
            alt="Quảng cáo"></img>
          <div className="col-span-6 block">
            <p className="text-xl font-bold sm:text-3xl">Sản phẩm nổi bật</p>
          </div>
        </section>

        <section className=" p- -z-10 mx-1 grid gap-5 py-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:px-20">
          {/* <img className='col-span-6 row-span-1' src="banner.jpg" alt='Quảng cáo'></img> */}

          {currentPosts?.map((item: Product) => {
            return <ItemCard key={item.code} item={item} />;
          })}
        </section>
        <div className="flex w-full items-center justify-center pb-4">
          <Pagination
            totalPosts={data?.length ?? 0}
            setCurrentPage={setPage}
            currentPage={currentPage}
          />
        </div>
      </>
    );
  }
};

export default Products;
