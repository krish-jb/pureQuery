import { Link } from "react-router-dom";
import { Search } from "./Search";
interface props {
  darkTheme: boolean;
  setDarkTheme: (setTo: boolean) => void;
}

export const Navbar = ({ darkTheme, setDarkTheme }: props) => {
  return (
    <div className="p-5 pb-0 flex flex-wrap sm:justify-between justify-center items-center border-b dark:border-zinc-700 border-zinc-200">
      <div className="flex justify-between items-center space-x-5 w-screen">
        <Link to="/">
          <p className="text-3xl font-medium bg-zinc-200 text-neutral-600 py-1 px-5 rounded-sm dark:bg-zinc-700 dark:text-neutral-400">
            pure_query 🛸
          </p>
        </Link>
        <button
          type="button"
          onClick={() => setDarkTheme(!darkTheme)}
          title={darkTheme ? "Light Mode" : "Dark Mode"}
          className="text-xl bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-700 hover:text-neutral-400 hover:border-zinc-500 dark:bg-zinc-700 dark:text-neutral-400 dark:hover:bg-zinc-50 dark:hover:text-zinc-600 dark:border-zinc-500 dark:hover:border-zinc-200 py-2 w-12 rounded-sm border-2 duration-200 outline-none shadow-lg hover:shadow-xl hover:shadow-gray-500 dark:shadow-neutral-700 dark:hover:shadow-neutral-500/100"
        >
          {darkTheme ? "💡" : "🌙"}
        </button>
      </div>
      <Search />
    </div>
  );
};
