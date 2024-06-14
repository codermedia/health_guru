const SearchBox = ({
  query,
  setQuery,
  handleQuery,
  searchDropdown,
  setCategory,
}) => {
  return (
    <div className="flex items-center justify-between">
      <form
        className="relative my-6 flex cursor-pointer items-center justify-center rounded-full bg-[#0d9493] px-0.5 py-0.5"
        onSubmit={handleQuery}
      >
        <input
          id="search"
          type="text"
          placeholder="Search here for the top articles and recipes"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          className="flex h-10 w-[300px] items-center rounded-l-full p-2 px-3 text-sm capitalize text-slate-500 shadow-md placeholder:normal-case placeholder:text-slate-500 focus:outline-none sm:w-[400px]"
          required
        />
        <div
          className={`absolute right-36 mr-3 cursor-pointer items-center bg-red-50 ${query ? "flex" : "hidden"}`}
          title="Clear search"
          onClick={() => setQuery("")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 cursor-pointer rounded text-[#9b3131]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <select
          name="category"
          id=""
          className="absolute right-[66px] flex w-fit items-center justify-center rounded-full bg-[#cef9f8] p-1 px-2 text-sm font-semibold capitalize text-[#0d9493]"
          onChange={(e) => setCategory(e.target.value)}
        >
          {searchDropdown.map((option) => (
            <option key={option.id} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        <button title="Search" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="mx-4 w-6 text-xl text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
