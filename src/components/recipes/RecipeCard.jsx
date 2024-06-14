import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const RecipeCard = ({ item }) => {
  return (
    <div className="flex">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="group relative h-full w-[300px] max-w-md rounded-md border border-slate-100"
        >
          <div className="relative flex h-full w-full items-center justify-between overflow-hidden">
            <div className="flex h-full w-full items-center justify-center">
              <img
                src={
                  item.recipe?.image
                    ? item.recipe.image
                    : "https://source.unsplash.com/random/?food,recipe"
                }
                alt=""
                className="h-64 w-full rounded-md object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
            <div className="absolute h-full w-full rounded-md bg-black/20 bg-opacity-20"></div>
            <div className="absolute right-0 top-0 mx-2 flex translate-y-1/2 items-center justify-between gap-x-2 text-[#0e9493]">
              <span className="rounded-full bg-[#bc4343] px-3 py-1 text-sm font-semibold capitalize text-white">
                {item.recipe?.mealType?.[0] &&
                  item.recipe?.mealType[0].split("/")[0]}
              </span>
              {item.recipe?.mealType &&
                item.recipe?.mealType[0].split("/")[1] && (
                  <span className="rounded-full bg-[#bc4343] px-3 py-1 text-sm font-semibold capitalize text-white">
                    {item.recipe?.mealType[0].split("/")[1]}
                  </span>
                )}
            </div>
            <span
              className="absolute -bottom-4 flex w-full -translate-y-1/2 justify-center bg-slate-900 bg-opacity-40 px-3 py-1 text-sm font-semibold capitalize text-white backdrop-blur-sm"
              title={`Source: ${item.recipe?.source}`}
            >
              {item.recipe?.source}
            </span>
          </div>
          <div className="flex w-full flex-col border-2 border-slate-100 px-5 py-5">
            <span className="w-full text-center text-[1.2rem] font-semibold text-slate-800 first-letter:capitalize">
              {item.recipe?.label &&
                (
                  item.recipe?.label[0] +
                  item.recipe?.label
                    .slice(1, item.recipe.label?.length)
                    .toLowerCase()
                )
                  .split(" - ")[0]
                  .replace('"', "")
                  .replace('"', "")}
            </span>
            <hr className="my-4 w-full rounded-lg border-2 border-slate-200" />
            <div className="mt-5 flex w-full items-center justify-start gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-teal-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                />
              </svg>
              <span className="text-[1rem] font-semibold text-slate-500">
                <span className="text-[#da5151]">
                  {item.recipe?.calories?.toFixed(0)}
                </span>{" "}
                calories per serving
              </span>
            </div>
            <div className="mt-3 flex w-full items-center justify-start gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-teal-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
              <span className="text-[1rem] font-semibold text-slate-500">
                <span className="text-[#da5151]">
                  {item.recipe?.ingredients?.length}
                </span>{" "}
                total ingredients
              </span>
            </div>
            <div className="my-8 flex w-full flex-wrap items-center gap-x-3 gap-y-5 text-sm">
              <span className="font-semibold text-slate-500">
                Diet labels :
              </span>
              {item.recipe?.dietLabels
                ?.slice(0, item.recipe?.dietLabels.length)
                .map((label, index) => (
                  <span
                    key={index}
                    className="flex items-center rounded-full bg-[#218684] px-2 py-1 text-[0.8rem] text-white"
                  >
                    {label}
                  </span>
                ))}
            </div>
          </div>
          <Link
            to={`/recipe/${item.recipe?.uri?.split("#")[1]}`}
            className="absolute bottom-0 w-full translate-y-1/2 rounded-b-md bg-[#2fad70] px-5 py-3 text-center text-sm font-semibold text-white"
            target="_blank"
            onClick={() => {
              localStorage.setItem("recipe", JSON.stringify(item.recipe));
            }}
          >
            View Recipe
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RecipeCard;
