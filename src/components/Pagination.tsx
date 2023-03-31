import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
export const postsPerPage = 20;
const Pagination = ({
  totalPosts,
  setCurrentPage,
  currentPage,
}: {
  totalPosts: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className=" mx-auto inline-flex items-center justify-center -space-x-px rounded-md shadow-sm md:right-10 lg:right-20">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 focus:z-20 disabled:bg-gray-200 hover:bg-gray-200">
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={`${
              page === currentPage && "border-indigo-500 bg-indigo-50 text-indigo-600"
            } inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 focus:z-20 hover:bg-gray-200`}>
            {page}
          </button>
        );
      })}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === pages.length}
        className="inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 focus:z-20 disabled:bg-gray-200 hover:bg-gray-200">
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export default Pagination;
