import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { Loader, Footer } from "../components";

import Items from "../components/recipes/recommended/Items";

const RecipeDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const [recipe, setRecipe] = useState([]);
  const [recipeNutrients, setRecipeNutrients] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(null);

  const handleRecommended = async (label, limit) => {
    await fetch("https://health-guru-server.vercel.app/recipes/" + label + "/" + limit, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRecommended(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (localStorage.getItem("recipe") === null) {
      return;
    }

    const data = JSON.parse(localStorage.getItem("recipe"));

    setUsers((Math.random(10, 100) * 100).toFixed(0));

    setRecipe(data);
    setRecipeNutrients(Object.values(data["totalNutrients"]));

    const timer1 = setTimeout(() => {
      setIsLoading(true);
    }, 5000);

    handleRecommended(data["label"], 4);

    setIsLoading(false);

    if (recommended?.length > 0) {
      setIsDataLoaded(true);
    }

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex w-full flex-col"
      >
        <div className="px-16 pb-16 pt-32">
          <div className="flex w-full flex-wrap items-center justify-between">
            <span className="flex w-fit items-center justify-center rounded-full py-1 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-7 w-7 text-teal-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
              <span className="rounded-full px-1.5 py-1 text-[14px] font-semibold text-slate-700">
                {users !== null && users}% of users have this recipe in their
                library
              </span>
            </span>
            <div className="flex items-center gap-x-2 text-sm font-semibold text-slate-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
              <span>Save</span>
            </div>
          </div>
          <div className="my-8 flex w-full flex-col flex-wrap justify-between gap-y-10 rounded-lg bg-slate-100 md:flex-row md:flex-nowrap md:gap-y-0">
            <div className="h-full w-full md:w-1/2">
              <img
                src={recipe["image"]}
                alt=""
                className="h-80 w-[650px] rounded-l-lg bg-fixed bg-center bg-no-repeat object-cover md:h-96"
              />
            </div>
            <div className="flex w-full flex-col justify-center gap-x-10 gap-y-5 px-5 md:w-1/2">
              <h1 className="text-center text-2xl font-semibold text-slate-800 md:text-left md:text-3xl">
                {recipe["label"] &&
                  recipe["label"][0].toUpperCase() +
                    recipe["label"].slice(1, recipe["label"].length)}
              </h1>
              <div className="flex w-full items-center justify-center gap-x-2 md:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <span className="text-sm font-medium text-slate-700">
                  By{" "}
                  <span className="font-semibold capitalize">
                    {recipe["source"]}
                  </span>
                </span>
              </div>
              <div className="my-5 flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-9 rounded-lg bg-slate-50 py-3 md:my-0 md:justify-start md:gap-x-16 md:gap-y-0 md:bg-transparent">
                <div className="flex w-full flex-col items-center md:w-fit md:gap-y-2">
                  <span className="rounded-full text-2xl font-semibold text-red-700 md:text-3xl">
                    {recipe["ingredients"]?.length}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">
                    Ingredients
                  </span>
                </div>
                <div className="flex w-full flex-col items-center md:w-fit md:gap-y-2">
                  <span className="rounded-full text-2xl font-semibold text-red-700 md:text-3xl">
                    {recipe["calories"]?.toFixed(0)}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">
                    Calories / servings
                  </span>
                </div>
                {recipe["totalTime"] > 0 && (
                  <div className="flex w-full flex-col items-center md:w-fit md:gap-y-2">
                    <span className="rounded-full text-2xl font-semibold text-red-700 md:text-3xl">
                      {recipe["totalTime"] > 60
                        ? Math.floor(recipe["totalTime"] / 60)
                        : recipe["totalTime"]}
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      Minutes to prepare
                    </span>
                  </div>
                )}
                <div className="flex w-full flex-col items-center md:w-fit md:gap-y-2">
                  <span className="rounded-full text-2xl font-semibold text-red-700 md:text-3xl">
                    {recipe["yield"]}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">
                    Servings
                  </span>
                </div>
              </div>
              <div className="my-2 flex w-full flex-wrap justify-center gap-x-5 gap-y-5 md:justify-start">
                {recipe["mealType"]?.map((meal, index) => (
                  <div className="flex items-center gap-x-5" key={index}>
                    <span className="rounded-lg bg-slate-200 px-2 py-1 text-sm font-semibold capitalize text-slate-700">
                      {meal.split("/")[0]}
                    </span>
                    {meal.split("/")[1] && (
                      <span className="rounded-lg bg-slate-200 px-2 py-1 text-sm font-semibold capitalize text-slate-700">
                        {meal.split("/")[1]}
                      </span>
                    )}
                  </div>
                ))}
                {recipe["cuisineType"]?.map((cuisine, index) => (
                  <span
                    className="rounded-lg bg-slate-200 px-2 py-1 text-sm font-semibold capitalize text-slate-700"
                    key={index}
                  >
                    {cuisine}
                  </span>
                ))}
                {recipe["dietLabels"]?.map((label, index) => (
                  <span
                    className="rounded-lg bg-slate-200 px-2 py-1 text-sm font-semibold capitalize text-slate-700"
                    key={index}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col flex-wrap justify-between gap-x-10 md:flex-row md:flex-nowrap">
            <div className="my-10 flex w-full flex-col gap-10 md:w-1/2">
              <span className="group w-fit text-2xl font-semibold text-slate-700">
                Ingredients
                <hr className="my-2 w-[50px] border-2 border-teal-500 transition-all duration-700 ease-in-out group-hover:w-full" />
              </span>

              <div className="flex w-full flex-wrap gap-5 text-wrap">
                {recipe["ingredients"]?.map((ingredient, index) => (
                  <div key={index} className="flex w-fit items-center gap-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 flex-none text-red-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    <span className="text-[1rem] font-semibold text-slate-700">
                      {ingredient.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="my-10 flex w-full flex-col">
                <span className="group w-fit text-2xl font-semibold text-slate-700">
                  Nutrition Facts
                  <hr className="my-2 w-[50px] border-2 border-teal-500 transition-all duration-700 ease-in-out group-hover:w-full" />
                </span>
                <table className="my-10 w-full text-[16px] text-slate-700 xl:w-[650px]">
                  <tbody>
                    {recipeNutrients?.slice(0, 20).map((nutrient, index) => (
                      <tr key={index}>
                        <td className="border border-slate-200 px-4 py-2 text-[1rem]">
                          {nutrient["label"]}
                        </td>
                        <td className="border border-slate-200 px-4 py-2 text-right font-semibold">
                          {Math.ceil(nutrient["quantity"].toFixed(1))}{" "}
                          {nutrient["unit"]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex w-full flex-col">
                <span className="group w-fit text-2xl font-semibold text-slate-700">
                  Preparation
                  <hr className="my-2 w-[50px] border-2 border-teal-500 transition-all duration-700 ease-in-out group-hover:w-full" />
                </span>
                <span className="mt-5 text-[1rem] font-semibold text-slate-700">
                  For cooking instructions, refer to{" "}
                  <Link
                    to={recipe["url"]}
                    target="_blank"
                    className="text-red-700 no-underline hover:underline"
                  >
                    {recipe["source"]}
                  </Link>{" "}
                  cooking page.
                </span>
              </div>
            </div>
            <div className="my-10 flex w-full flex-col gap-10 md:w-1/2">
              <span className="group w-fit text-2xl font-semibold text-slate-700">
                Health benefits
                <hr className="my-2 w-[50px] border-2 border-teal-500 transition-all duration-700 ease-in-out group-hover:w-full" />
              </span>
              <div className="flex w-full flex-wrap gap-5">
                {recipe["healthLabels"]?.map((label, index) => (
                  <div
                    key={index}
                    className="flex w-fit items-center justify-center gap-x-2 rounded-full bg-red-500 px-3 py-1 text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span className="text-[1rem] font-semibold">{label}</span>
                  </div>
                ))}
              </div>
              <div className="my-10 flex h-full w-full flex-col">
                <span className="group w-fit text-2xl font-semibold text-slate-700">
                  More recipes like this
                  <hr className="my-2 w-[50px] border-2 border-teal-500 transition-all duration-700 ease-in-out group-hover:w-full" />
                </span>

                {!isLoading && <Loader className="h-screen w-full" />}

                <Items
                  isLoading={isLoading}
                  recommended={recommended}
                  recipe={recipe}
                  isDataLoaded={isDataLoaded}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </motion.section>
    </AnimatePresence>
  );
};

export default RecipeDetails;
