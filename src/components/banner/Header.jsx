import { useContext, useState } from "react";
import { Context } from "../../contexts/Context";

import bg1 from "../../assets/header-bg.jpg";
import bg2 from "../../assets/header-bg-2.jpg";

import { searchDropdown, searchOptions } from "../../constants";
import SearchBox from "../ui/SearchBox";

const Header = () => {
  const [query, setQuery] = useState("Food");
  const [category, setCategory] = useState("1");

  const { Query, Category } = useContext(Context);

  const [dt, setDt] = Query;
  const [option_selected, setOption] = Category;

  const handleQuery = (e) => {
    e.preventDefault();

    if (query === "") {
      return;
    }

    setDt(query);
    setOption(category);

    const timer = setTimeout(() => {
      if (category === "1" || category === "2") {
        window.location.href = "#articles";
      } else if (category === "3") {
        window.location.href = "#recipes";
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <header className="flex w-full items-center justify-between px-16 py-32 pb-16">
      <div className="flex w-full flex-grow-0 flex-col items-center justify-center lg:w-3/4 lg:items-baseline">
        <span className="flex w-fit items-center rounded-full bg-[#cef9f8] px-4 py-3 text-[14px] font-semibold text-[#0d9493]">
          Build your healthy lifestyle
        </span>
        <p className="my-2 mt-4 flex items-center gap-x-2 text-center text-[1.75rem] font-bold lg:items-baseline lg:text-left">
          <span>
            Your health is our top priority and{" "}
            <span className="text-teal-400">we are here to help you</span>
          </span>
        </p>
        <p className="my-4 w-fit text-wrap text-center text-[1rem] font-semibold md:my-0 lg:text-nowrap lg:text-left">
          Discover the best health tips, recipes, and advices to help you live
          better and healthier.
        </p>
        <SearchBox
          handleQuery={handleQuery}
          query={query}
          setQuery={setQuery}
          setCategory={setCategory}
          searchDropdown={searchDropdown}
        />
        <div className="flex flex-wrap items-center justify-center gap-5 md:flex-nowrap md:gap-y-0">
          {searchOptions.map((item) => (
            <div
              className={`flex cursor-pointer items-center gap-x-2 rounded-full px-3 py-1 text-sm font-semibold transition-all duration-300 ease-in-out ${query === item.name.toLowerCase() || query === item.name.toUpperCase() || query === item.name[0].toUpperCase() + item.name.slice(1, item.name.length) ? "bg-teal-900 tracking-wide text-white" : "bg-[#cef9f8] text-[#0d9493]"}`}
              key={item.id}
            >
              <span
                onClick={(e) => {
                  setQuery(e.target.innerText);
                }}
              >
                {item.name}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`h-[20px] w-[20px] text-white ease-in-out visited:transition ${query === item.name.toLowerCase() || query === item.name.toUpperCase() || query === item.name[0].toUpperCase() + item.name.slice(1, item.name.length) ? "block" : "hidden"}`}
                onClick={() => setQuery("")}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
      <div className="relative hidden w-[450px] items-center justify-end lg:flex lg:w-1/2">
        <img
          src={bg2}
          alt=""
          className="h-96 w-96 rounded-full bg-slate-100 object-cover p-2 drop-shadow-xl"
        />
        <div className="absolute h-full w-full rounded-full bg-slate-100 bg-opacity-20">
          <img
            src={bg1}
            alt=""
            className="h-96 w-96 rounded-full bg-slate-100 object-cover p-2 drop-shadow-xl"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
