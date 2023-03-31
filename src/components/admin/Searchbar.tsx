function Searchbar({
  handleChange,
  placeholder,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div className="mt-5 flex w-3/4 rounded border border-gray-300 bg-white shadow-sm">
      <input
        type="search"
        placeholder={placeholder}
        onChange={handleChange}
        className=" w-full cursor-default rounded py-2 pl-3  pr-10 text-left focus:outline-double  focus:outline-indigo-500  sm:text-sm "
      />
      <button type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
}
export default Searchbar;
