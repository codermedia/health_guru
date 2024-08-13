import { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "../loader/Loader";

import { Context } from "../../contexts/Context";
import ArticleCard from "./ArticleCard";

const Articles = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const { Query, Category } = useContext(Context);

  const [dt] = Query;
  const [option_selected] = Category;

  let isHeadlinesRendered = useRef(false);

  const handleHeadlines = async () => {
    await fetch("https://health-guru-server.vercel.app/articles/" + dt, {
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
      if (option_selected === "1" || option_selected === "2") {
        const timer2 = setTimeout(() => {
          setIsLoading(true);
        }, 2500);

        handleHeadlines();

        setIsLoading(false);

        // if (data?.length > 0) {
          setIsDataLoaded(true);
        // }

        return () => {
          clearTimeout(timer2);
        };
      }
    }, 500);

    if (isHeadlinesRendered.current === false) {
      return () => {
        isHeadlinesRendered.current = true;
      };
    }
    return () => {
      isHeadlinesRendered.current = false;
      clearTimeout(timer1);
    };
  }, [dt, option_selected]);

  return (
    <section className="mb-10 w-full px-16 py-2" id="articles">
      <div className="group w-full text-center md:w-fit md:text-left">
        <span className="text-xl font-semibold leading-normal text-slate-700">
          Recent posts
        </span>
        <hr className="mx-auto my-2 w-[50px] border-2 border-teal-500 transition-all duration-700 ease-in-out group-hover:w-[100px] group-hover:rotate-180 md:mx-0" />
      </div>

      {!isLoading && <Loader className="h-screen w-full" />}

      <AnimatePresence>
        <div className="my-8 flex h-full w-full flex-wrap items-center gap-5 rounded-lg">
          {isLoading && data?.length > 0
            ? data.map(
                (item, index) =>
                  item.description?.split(".")[0].length > 10 && (
                    <ArticleCard key={index} item={item} id={index} />
                  ),
              )
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
                    No articles found
                  </span>
                </motion.div>
              )}
        </div>
      </AnimatePresence>
    </section>
  );
};

export default Articles;
