import { inferRouterOutputs } from "@trpc/server";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import Searchbar from "../../components/admin/Searchbar";
import UsersList from "../../components/admin/UsersList";
import Pagination, { postsPerPage } from "../../components/Pagination";
import { AppRouter } from "../../server/trpc/router/_app";
import { trpc } from "@utils/trpc";

const Users: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const utils = trpc.useContext();
  const { data } = trpc.user.getAll.useQuery();
  const mutation = trpc.user.toggleStatus.useMutation({
    onSuccess() {
      utils.user.getAll.invalidate();
    },
  });

  const handleActive = (id: string, status: boolean) => {
    mutation.mutate({ id, status });
  };

  const [search, setSearch] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    e.persist();
    setSearch(e.target.value);
  };
  const [searchResult, setSearchResult] = useState<
    inferRouterOutputs<AppRouter>["user"]["getAll"] | undefined
  >(data);

  useEffect(() => {
    const results = data?.filter((user) =>
      user.email.toLowerCase().startsWith(search.toLowerCase())
    );
    setSearchResult(results);
  }, [search, data]);

  // Get current posts to paginate
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts: inferRouterOutputs<AppRouter>["user"]["getAll"] | undefined =
    searchResult?.slice(firstPostIndex, lastPostIndex);
  return (
    <div className="h-full w-full text-sm md:text-base">
      <NavbarAdmin />
      <main className=" p- px-5 py-10 md:px-10 lg:px-20">
        <h1 className="text-3xl font-medium text-gray-900 ">Users</h1>
        <Searchbar placeholder="Search by user email" handleChange={handleChange} />
        <UsersList usersData={currentPosts ?? []} handleActive={handleActive} />
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
export default Users;
