const FeedbackBtn = ({ navOpen, setNavOpen, setActiveLink }) => {
  const handleClick = (name) => {
    setActiveLink(name);

    if (window.innerWidth < 768) {
      setNavOpen(false);
    } else {
      setNavOpen(true);
    }
  };
  return (
    <a
      href="/#feedback"
      className={`flex flex-none flex-col items-center justify-center ${!navOpen ? "translate-x-[150%]" : "mb-10 translate-x-0 transition duration-200 ease-in-out md:mb-0"} rounded-xl bg-[#0d9493] px-4 py-2 text-white md:flex-none md:flex-row`}
      onClick={(e) => handleClick(e.target.name)}
    >
      Write a feedback
    </a>
  );
};

export default FeedbackBtn;
