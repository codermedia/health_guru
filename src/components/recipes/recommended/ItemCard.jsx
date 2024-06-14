import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  return (
    <div className="flex">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="group relative h-full w-[300px] max-w-md"
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
                className="h-64 w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
            <div className="absolute h-full w-full  bg-black/20 bg-opacity-20"></div>
            <div className="absolute right-0 top-0 mx-2 flex translate-y-1/2 items-center justify-between gap-x-2 text-[#0e9493]">
              <span className="rounded-full bg-teal-700 px-3 py-1 text-sm font-semibold capitalize text-white">
                {item.recipe?.mealType?.[0] &&
                  item.recipe?.mealType[0].split("/")[0]}
              </span>
              {item.recipe?.mealType &&
                item.recipe?.mealType[0].split("/")[1] && (
                  <span className="rounded-full bg-teal-700 px-3 py-1 text-sm font-semibold capitalize text-white">
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
          <div className="mb-5 flex w-full flex-col items-center justify-center bg-[#D36060] p-5">
            <Link
              to={`/recipe/${item.recipe?.uri?.split("#")[1]}`}
              className="w-full text-center"
              target="_blank"
              onClick={() => {
                localStorage.setItem("recipe", JSON.stringify(item.recipe));
              }}
            >
              <span className="w-full text-center text-[1.1rem] font-semibold text-white first-letter:capitalize hover:underline">
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
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ItemCard;
