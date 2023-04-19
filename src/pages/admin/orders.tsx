import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { inferRouterOutputs } from "@trpc/server";
import { trpc } from "@utils/trpc";
import { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import Pagination, { postsPerPage } from "../../components/Pagination";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import OrdersList from "../../components/admin/OrdersList";
import Searchbar from "../../components/admin/Searchbar";
import { AppRouter } from "../../server/trpc/router/_app";

const Orders: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    e.persist();
    setSearch(e.target.value);
  };

  const statusList = [
    "Tất cả đơn hàng",
    "Chờ xác nhận",
    "Đang giao",
    "Đã giao",
    "Chờ hủy",
    "Đã hủy",
    "Chờ đổi/trả",
    "Đã đổi/trả",
    "Hoàn thành",
  ];

  const [filter, setFilter] = useState("Tất cả đơn hàng");

  const [isFiltering, setIsFiltering] = useState(false);

  const handleSetFilter = (e: string) => {
    setFilter(e as string);
    handleFilter(e);
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

  const [filterResult, setFilterResult] = useState<
    inferRouterOutputs<AppRouter>["order"]["getAll"] | undefined
  >(data);

  const handleFilter = (e: string) => {
    setIsFiltering(true);
    switch (e) {
      case "Chờ xác nhận": {
        const result = data?.filter((order) => order.status === "CONFIRM_PENDING");
        setFilterResult(result);
        break;
      }

      case "Đang giao": {
        const result = data?.filter((order) => order.status === "INPROCESS");
        setFilterResult(result);
        break;
      }

      case "Đã giao": {
        const result = data?.filter((order) => order.status === "SHIPPED");
        setFilterResult(result);
        break;
      }
      case "Chờ hủy": {
        const result = data?.filter((order) => order.status === "CANCEL_PENDING");
        setFilterResult(result);
        break;
      }
      case "Đã hủy": {
        const result = data?.filter((order) => order.status === "CANCEL");
        setFilterResult(result);
        break;
      }
      case "Chờ đổi/trả": {
        const result = data?.filter((order) => order.status === "RETURN_PENDING");
        setFilterResult(result);
        break;
      }
      case "Đã đổi/trả": {
        const result = data?.filter((order) => order.status === "RETURN");
        setFilterResult(result);
        break;
      }
      case "Hoàn thành": {
        const result = data?.filter((order) => order.status === "COMPLETED");
        setFilterResult(result);
        break;
      }
      default:
        setIsFiltering(false);
        setFilterResult(data);
        break;
    }
  };

  // Get current posts to paginate
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = isFiltering
    ? filterResult?.slice(firstPostIndex, lastPostIndex)
    : searchResult?.slice(firstPostIndex, lastPostIndex);
  return (
    <div className="h-full w-full text-sm md:text-base">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <NavbarAdmin />
      <main className="p- px-5 py-10 md:px-10 lg:px-20">
        <h1 className="text-3xl font-medium text-gray-900 ">Orders</h1>
        <Searchbar placeholder="Search by order id" handleChange={handleChange} />
        <Filter
          filter={filter}
          // setFilter={setFilter}
          handleSetFilter={handleSetFilter}
          statusList={statusList}
        />
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

function Filter({
  filter,
  handleSetFilter,
  statusList,
}: {
  filter: string;
  handleSetFilter: (e: string) => void;
  statusList: string[];
}) {
  return (
    <div className="flex gap-5">
      <div className="w-72">
        <Listbox
          value={filter}
          onChange={(e) => {
            handleSetFilter(e);
          }}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{filter}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {statusList.map((status) => (
                  <Listbox.Option
                    key={status}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={status}>
                    {() => (
                      <>
                        <span
                          className={`block truncate ${filter ? "font-medium" : "font-normal"}`}>
                          {status}
                        </span>
                        {filter ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
}
