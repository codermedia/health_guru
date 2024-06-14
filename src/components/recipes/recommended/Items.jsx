import ItemCard from "./ItemCard";
import { motion } from "framer-motion";

const Items = ({ isLoading, recommended, recipe, isDataLoaded }) => {
  return (
    <div className="mt-10 flex w-full flex-wrap items-center gap-10 gap-y-5">
      {isLoading &&
        recommended?.length > 0 &&
        recommended
          ?.filter((item) => item.recipe.uri != recipe["uri"])
          .map(
            (item, index) =>
              item.recipe.mealType.length > 0 && (
                <ItemCard key={index} item={item} />
              ),
          )}
      {isLoading && recommended?.length <= 1 && !isDataLoaded && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-[1rem] font-semibold text-slate-700"
        >
          No more recipes
        </motion.span>
      )}
    </div>
  );
};

export default Items;
