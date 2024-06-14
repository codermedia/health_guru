import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "../loader/Loader";

import { Context } from "../../contexts/Context";
import RecipeCard from "./RecipeCard";
import ExploreBtn from "../ui/ExploreBtn";

const Recipes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(40);
  const [initialTime, setInitialTime] = useState(2500);
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const { Query, Category } = useContext(Context);

  const [dt] = Query;
  const [option_selected] = Category;

  let isRecipesRendered = useRef(false);

  const showMore = () => {
    setLimit((prev) => prev + 30);

    setInitialTime((prev) => prev + 2500);
  };

  const handleRecipes = async () => {
    await fetch("http://localhost:3000/recipes/" + dt + "/" + limit, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      handleRecipes();
    }, 200);

    return () => {
      clearTimeout(timer1);
    };
  }, [limit]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (option_selected === "1" || option_selected === "3") {
        const timer2 = setTimeout(() => {
          setIsLoading(true);
        }, initialTime);

        handleRecipes();

        setIsLoading(false);

        if (data?.length > 0) {
          setIsDataLoaded(true);
        }

        return () => {
          clearTimeout(timer2);
        };
      }
    }, 500);

    if (isRecipesRendered.current === false) {
      return () => {
        isRecipesRendered.current = true;
      };
    }
    return () => {
      isRecipesRendered.current = false;
      clearTimeout(timer1);
    };
  }, [dt, option_selected]);

  return (
    <section className="mb-10 w-full px-16 py-2" id="recipes">
      <div className="flex items-center justify-between">
        <div className="group w-full text-center md:w-fit md:text-left">
          <span className="flex justify-center text-xl font-semibold leading-normal text-teal-700">
            Top Recipes
          </span>
          <hr className="mx-auto my-2 w-[50px] border-2 border-teal-500 transition-all duration-700 ease-in-out group-hover:w-[100px] group-hover:rotate-180 md:mx-0" />
        </div>
      </div>

      {!isLoading && <Loader className="h-screen w-full" />}

      <AnimatePresence>
        <div className="my-8 flex h-full w-full flex-wrap items-center gap-x-[63px] gap-y-16">
          {isLoading && data?.length > 0
            ? data.map((item, index) => <RecipeCard key={index} item={item} />)
            : isLoading &&
              isDataLoaded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex w-full flex-col items-center justify-center gap-y-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-9 w-9 text-[#da5151]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                    />
                  </svg>
                  <span className="text-center text-xl font-semibold text-teal-900">
                    No recipes found
                  </span>
                </motion.div>
              )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`flex w-full justify-center ${isLoading && limit < 100 && data?.length > 0 ? "block" : "hidden"}`}
          >
            <Link
              className="flex justify-center gap-x-3 rounded-lg border-2 border-[#0d9493] px-2 py-1"
              onClick={showMore}
            >
              <ExploreBtn />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 flex-none rotate-90"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </AnimatePresence>
    </section>
  );
};

export default Recipes;
