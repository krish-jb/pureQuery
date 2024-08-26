import { useState } from "react";
import useResultContext from "../contexts/ResultContextProvider.tsx";
import Link from "./Links.tsx";

interface props {
  setHasFetched: (setTo: boolean) => void;
}

export const Search = ({ setHasFetched }: props) => {
  const [text, setText] = useState("");
  const { setSearchTerm } = useResultContext();

  const search = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchTerm(text);
      setHasFetched(false);
    }
  };

  return (
    <div className="relative md:ml-80 md:-mt-10 lg:ml-80 lg:-mt-10 xl:ml-80 xl:-mt-[46px] mt-5 max-w-full">
      <input
        value={text}
        type="text"
        className="xl:text-3xl sm:text-xl font-medium bg-zinc-200 text-neutral-600 py-1 
        px-5 rounded-sm dark:bg-zinc-700 dark:text-neutral-400 outline-none
        hover:shadow-md dark:hover:shadow-sm hover:shadow-indigo-600/40 
        dark:hover:shadow-indigo-600 duration-100 hover:dark:bg-zinc-900
        w-full"
        placeholder="Search anything..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={search}
      />
      <Link setHasFetched={setHasFetched} />
    </div>
  );
};
