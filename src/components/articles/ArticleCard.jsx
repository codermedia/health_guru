import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ id, item }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [time, setTime] = useState(null);

  const handleClick = (id) => {
    setIsAdded(!isAdded);

    const timer1 = setTimeout(() => {
      if (isAdded) {
        alert("Article no." + (id + 1) + " removed from favorites !");
      } else {
        alert("Article no." + (id + 1) + " added to favorites !");
      }
    }, 1000);

    return () => {
      clearTimeout(timer1);
    };
  };

  useEffect(() => {
    setTime(Math.ceil((Math.random().toFixed(2, 200) / 60) * 1000));
  }, []);

  return (
    <div className="flex">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="group relative flex h-[50vh] w-fit items-center justify-center overflow-hidden md:h-[40vh] lg:h-96"
        >
          <img
            src={
              item.urlToImage !== null
                ? item.urlToImage
                : "https://source.unsplash.com/random/?food,nutrition"
            }
            alt=""
            className="h-full w-[450px] rounded-lg object-cover lg:h-full"
          />
          <div className="absolute h-full w-full rounded-lg bg-white/10 bg-opacity-10"></div>

          <div className="absolute -bottom-0 flex h-full w-full items-center justify-center rounded-lg bg-teal-500 bg-opacity-50 duration-500 ease-in-out group-hover:backdrop-blur-sm group-hover:transition-all md:h-1/2 md:group-hover:h-full">
            <div className="my-5 flex flex-col items-center justify-center px-4 transition-all duration-500 ease-in-out">
              {!isAdded && (
                <div
                  title="Save to favorites"
                  className="absolute right-0 top-0 mx-2 hidden translate-y-1/2 cursor-pointer items-center justify-center text-white group-hover:flex"
                  onClick={() => {
                    handleClick(id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    title="Save to favorites"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>
                </div>
              )}
              {isAdded && (
                <div
                  title="Remove from favorites"
                  className="absolute right-0 top-0 mx-2 hidden translate-y-1/2 cursor-pointer items-center justify-center text-white group-hover:flex"
                  onClick={() => {
                    handleClick(id);
                  }}
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
                      d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
                    />
                  </svg>
                </div>
              )}
              <div className="flex items-center justify-between gap-x-2">
                <span className="my-2 flex items-center rounded-full bg-[#cef9f8] px-4 py-2 text-center text-[12px] font-bold capitalize text-[#0d9493]">
                  {item.title && item.title.split(" - ")[1]}
                </span>
                <span className="my-2 flex items-center rounded-full px-4 py-2 text-[12px] font-bold text-white">
                  {time}
                  &nbsp;min read
                </span>
              </div>
              <p className="text-wrap text-center text-[1.2rem] font-bold text-white">
                {item.title[0].toUpperCase() +
                  item.title
                    .split(" - ")[0]
                    .split("|")[0]
                    .slice(1, item.title.length)
                    .toLowerCase()}
              </p>
              <p className="mx-auto mt-2 w-fit text-wrap text-center text-[1rem] font-semibold text-white md:hidden md:group-hover:flex">
                {item.description.split("&nbsp")[0][0].toUpperCase() +
                  item.description
                    .split("&nbsp")[0]
                    .slice(1, item.description.split(".")[0].length)}
                .
              </p>
              <p className="mx-auto my-2 w-full flex-col text-wrap text-center font-semibold text-white md:hidden md:group-hover:flex">
                - {(item.title && item.title.split("-")[1]) || "Unknown"}
              </p>
              <Link
                to={item.url}
                className="my-4 rounded-lg border border-white px-2.5 py-2 text-[14px] text-white backdrop-blur-xl md:hidden md:text-[1rem] md:group-hover:flex"
                target="_blank"
              >
                Read more
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ArticleCard;
