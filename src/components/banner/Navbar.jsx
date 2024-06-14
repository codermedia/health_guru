import { useEffect, useState } from "react";
import { navLinks } from "../../constants";
import { useLocation } from "react-router-dom";

import Logo from "./Logo";
import FeedbackBtn from "../ui/FeedbackBtn";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(true);
  const [activeLink, setActiveLink] = useState("#");

  const location = useLocation();

  const handleNav = () => {
    const timeout = setTimeout(() => {
      setNavOpen(!navOpen);
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  };

  const handleClick = (path) => {
    setActiveLink(path);

    if (window.innerWidth < 768) {
      setNavOpen(false);
    } else {
      setNavOpen(true);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        setNavOpen(true);
      } else {
        setNavOpen(false);
      }
    });
  }, [window.innerWidth]);

  useEffect(() => {
    let tab = "/" + location.hash;

    if (tab === "/") {
      tab = "/#";
    }

    setActiveLink(tab);
  }, [location.hash]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("scroll", () => {
      const navbar = document.getElementById("navbar");

      if (window.scrollY > 0) {
        navbar.classList.remove("md:py-5");
        navbar.classList.add("md:py-3");
      } else {
        navbar.classList.remove("md:py-3");
        navbar.classList.add("md:py-5");
      }
    });
  }, [window.scrollY]);

  return (
    <header className="flex h-fit items-center justify-center">
      <nav
        className="flex w-full flex-col justify-start gap-y-5 pt-10 transition-all duration-500 ease-in-out md:flex-row md:items-center md:justify-between md:gap-y-0 md:py-5"
        id="navbar"
      >
        <div className="flex items-center justify-between">
          <Logo />
          <div className="ml-auto flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`h-8 w-8 cursor-pointer md:hidden ${navOpen && "hidden"}`}
              onClick={handleNav}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`h-8 w-8 cursor-pointer md:hidden ${!navOpen && "hidden"}`}
              onClick={handleNav}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <ul
          className={`flex flex-none flex-col justify-between rounded-lg transition duration-200 ease-in-out ${!navOpen ? "hidden translate-x-[150%]" : "translate-x-0 p-5 transition-all duration-200 ease-in-out"} gap-y-5 overflow-x-hidden text-[0.94rem] font-semibold text-slate-600 md:translate-x-0 md:flex-row md:items-center md:gap-x-10 md:gap-y-0 md:transition-none md:duration-200 md:ease-in-out`}
          id="navlinks"
        >
          {navLinks.map((item) => (
            <li
              key={item.id}
              className={`transition duration-500 ease-in-out ${activeLink === item.path ? "font-semibold text-[#0d9493]" : "hover:text-[#ce5858]"}`}
              onClick={() => handleClick(item.path)}
            >
              <a href={item.path}>{item.name}</a>
            </li>
          ))}
        </ul>
        <FeedbackBtn
          navOpen={navOpen}
          setNavOpen={setNavOpen}
          setActiveLink={setActiveLink}
        />
      </nav>
    </header>
  );
};

export default Navbar;
