import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import feedbackbg from "../../assets/feedback-img.jpg";
const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const timer1 = setTimeout(() => {
      setIsSubmitted(true);
    }, 2000);

    setFormData({
      name: "",
      email: "",
      message: "",
    });

    return () => {
      clearTimeout(timer1);
    };
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);

    return () => {
      clearTimeout(timer1);
    };
  }, [isSubmitted == true]);

  const { name, email, message } = formData;

  return (
    <section
      className="flex w-full flex-col items-center justify-center bg-slate-50 px-16 py-2"
      id="feedback"
    >
      <span className="flex items-center rounded-full bg-[#cef9f8] px-4 py-3 text-[14px] font-semibold text-[#0d9493]">
        Feedback
      </span>
      <p className="my-1 mt-2 flex items-center justify-center gap-x-2 text-center text-[22px] font-bold">
        <span className="leading-10">
          <span>
            Please share your thoughts and feedback with us to improve our
            services.
          </span>
        </span>
      </p>
      <p className="text-[16px] font-semibold text-teal-600">
        Let's together revitalize your lifestyle with healthy food and recipes.
      </p>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="my-6 flex w-full items-center justify-between rounded-xl py-10"
        >
          <div className="flex w-full flex-none flex-col items-center justify-center lg:w-1/2">
            <span className="group text-xl font-bold text-slate-700">
              Tell us what you think
              <hr className="mx-auto my-2 w-[50px] border-2 border-teal-500 transition-all duration-700 ease-in-out group-hover:w-[100px] group-hover:rotate-180 md:mx-0" />
            </span>
            <form
              className="my-6 flex w-full flex-col items-center justify-center  drop-shadow-lg"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Name"
                autoComplete="off"
                value={name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
                className="my-2 h-fit w-3/4 rounded-xl border-2 border-white bg-white p-2 text-slate-400 transition duration-500 ease-in-out focus:border-cyan-600 focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email"
                autoComplete="off"
                value={email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
                className="my-2 h-fit w-3/4 rounded-xl border-2 border-white bg-white p-2 text-slate-400 transition duration-500 ease-in-out focus:border-cyan-600 focus:outline-none"
                required
              />
              <textarea
                cols="10"
                rows="5"
                placeholder="Message (in 15-30 words)"
                autoComplete="off"
                value={message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                }}
                className="my-2 h-fit w-3/4 resize-none rounded-xl border-2 border-white bg-white p-2 text-slate-400 transition duration-500 ease-in-out focus:border-cyan-600 focus:outline-none"
                required
              ></textarea>
              <button
                type="submit"
                className="my-2 w-3/4 rounded-full bg-[#0d9493] p-2 text-white"
                title="Submit"
              >
                Submit
              </button>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-full pt-5"
                >
                  <div
                    className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-y-3 rounded-full bg-slate-100 p-4 leading-none md:flex-row md:gap-y-0"
                    role="alert"
                  >
                    <span className="flex items-center justify-center rounded-full bg-red-500 px-2 py-1 text-xs font-bold uppercase text-white">
                      New
                    </span>
                    <span className="flex-auto text-center text-[14px] font-semibold leading-7">
                      Your response has been submitted successfully to our team
                      and will be reviewed soon.
                    </span>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
          <div className="relative hidden w-1/2 flex-none items-center justify-center lg:flex">
            <img
              src={feedbackbg}
              alt="image"
              className="h-[500px] w-[500px] rounded-full bg-slate-100 object-cover p-2 drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Feedback;
