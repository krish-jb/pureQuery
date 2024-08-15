import { useEffect, useRef } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import Loading from "./Loading";

import useResultContext, {
  searchResults,
  searchResultItem,
  imageResultItem,
} from "../contexts/ResultContextProvider";

interface searchType {
  link: string;
  title: string;
}

function Results() {
  const { category } = useParams<{ category?: string }>();
  const hasFetched = useRef(false);

  const { results, isLoading, searchTerm, getResults } = useResultContext();

  useEffect(() => {
    if (searchTerm) {
      if (category === "videos") {
        if (!hasFetched.current) {
          getResults(
            `/${category}?q=${searchTerm} ${category}&lr=en-US&num=40`
          );
          hasFetched.current = true;
        }
      } else if (category === "images") {
        if (!hasFetched.current) {
          getResults(
            `/imagesearch?q=${searchTerm}&gl=in&lr=en-US&num=10&start=0`
          );
          hasFetched.current = true;
        }
      } else {
        if (!hasFetched.current) {
          getResults(`/${category}?q=${searchTerm}&lr=en-US&num=40`);
          hasFetched.current = true;
        }
      }
    }
  }, [searchTerm, category]);

  if (isLoading) return <Loading />;

  switch (category) {
    case "search":
      return (
        <div className="flex flex-wrap justify-between lg:px-60 sm:px-20 sm:justify-around">
          {results?.items?.map(
            ({ link, title }: searchResultItem, index: number) => (
              <div
                key={index}
                className="md:w-2/5 w-full max-w-ls my-2 p-5 hover:bg-neutral-200 dark:hover:bg-zinc-900 hover:shadow-md dark:hover:shadow-sm hover:shadow-gray-500/50 dark:hover:shadow-blue-500/50 rounded-md duration-100"
              >
                <a href={link} target="_blank" rel="noreferrer">
                  <p className="text-sm">
                    {link.length > 30 ? link.substring(0, 30) : link}
                  </p>
                  <p className="text-lg hover:underline dark:text-blue-300 text-blue-700 hover:shadow">
                    {title}
                  </p>
                </a>
              </div>
            )
          )}
        </div>
      );
    case "images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.items?.map(
            (
              { title, thumbnailImageUrl, contextLink }: imageResultItem,
              index: number
            ) => (
              <a
                className="sm:p-3 p-5"
                href={contextLink}
                key={index}
                target="_blank"
                rel="noreferrer"
              >
                <img src={thumbnailImageUrl} alt={title} loading="lazy" />
                <p className="w-36 break-words text-sm mt-2">{title}</p>
              </a>
            )
          )}
        </div>
      );
    case "videos":
      return "videos";
    case "news":
      return "news";
    default:
      return <Navigate to="/error" />;
  }
}

export default Results;
