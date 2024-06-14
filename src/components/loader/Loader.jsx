import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex min-h-52 items-center justify-center bg-slate-50">
      <motion.div
        transition={{
          staggerChildren: 0.25,
        }}
        initial="initial"
        animate="animate"
        className="flex gap-1"
      >
        <motion.div variants={variants} className="h-12 w-2 bg-teal-600" />
        <motion.div variants={variants} className="h-12 w-2 bg-teal-600" />
        <motion.div variants={variants} className="h-12 w-2 bg-teal-600" />
        <motion.div variants={variants} className="h-12 w-2 bg-teal-600" />
        <motion.div variants={variants} className="h-12 w-2 bg-teal-600" />
      </motion.div>
    </div>
  );
};

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
};

export default Loader;
