import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Home, RecipeDetails } from "./pages";
import { Navbar } from "./components";
import { useState } from "react";
import { Context } from "./contexts/Context";
import { AnimatePresence, motion } from "framer-motion";

const Layout = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative flex select-none antialiased"
      >
        <div className="fixed top-0 z-50 h-auto w-full flex-none overflow-hidden bg-slate-50 px-16">
          <Navbar />
        </div>
        <div className="flex w-full items-center overflow-y-auto bg-slate-50">
          <Outlet />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/recipe/:recipe_id",
        element: <RecipeDetails />,
      },
    ],
  },
]);

const App = () => {
  const [dt, setDt] = useState("Food");
  const [option_selected, setOption] = useState("1");

  return (
    <div className="App">
      <Context.Provider
        value={{
          Query: [dt, setDt],
          Category: [option_selected, setOption],
        }}
      >
        <RouterProvider router={router} />
      </Context.Provider>
    </div>
  );
};

export default App;
