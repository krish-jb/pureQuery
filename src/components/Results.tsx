import { useEffect, useRef } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import Loading from "./Loading";

import useResultContext, {
  searchResults,
  searchResultItem,
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
      if (category === "videos" || category === "news") {
        if (!hasFetched.current) {
          let query: string =
            `/search?q=${searchTerm} ${category}&lr=en-in&num=20` +
            (category === "videos" ? "&tbm=vid" : "");
          console.log(query);
          getResults(query);
          hasFetched.current = true;
        }
      } else if (category === "images") {
        if (!hasFetched.current) {
          getResults(
            `/imagesearch?q=${searchTerm}&gl=in&lr=lang_en&num=10&start=0`
          );
          hasFetched.current = true;
        }
      } else {
        if (!hasFetched.current) {
          getResults(`/search?q=${searchTerm}&lr=en-US&num=40`);
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
                className="md:w-2/5 w-full max-w-ls my-2 p-5 hover:bg-neutral-200 dark:hover:bg-zinc-900 hover:shadow-sm dark:hover:shadow-sm hover:shadow-indigo-600 dark:hover:shadow-indigo-500 rounded-md duration-100"
              >
                <a href={link} target="_blank" rel="noreferrer">
                  <p className="text-sm">
                    {link.length > 30 ? link.substring(0, 30) : link}
                  </p>
                  <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
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
        <div className="flex flex-wrap justify-center my-6 sm:px-56 items-center">
          {results?.items?.map(
            (
              { title, thumbnailImageUrl, originalImageUrl }: searchResultItem,
              index: number
            ) => (
              <a
                className="sm:p-3 p-5 hover:bg-neutral-200 dark:hover:bg-zinc-900 hover:shadow-md dark:hover:shadow-sm hover:shadow-indigo-600/40 dark:hover:shadow-indigo-600 rounded-md duration-100"
                href={originalImageUrl}
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
      return (
        <div className="flex flex-wrap justify-between my-6 sm:px-56 items-center">
          {results.items?.map(({ link }: searchResultItem, index: number) => (
            <div key={index} className="p-2">
              <ReactPlayer
                url={"https://www.youtube.com/watch?v=GDa8kZLNhJ4"} // Work on this
                // use Youtube API for videos
              />
            </div>
          ))}
        </div>
      );
    case "news":
      return (
        <div className="flex flex-wrap justify-between xl:px-60 lg:px-50 lg:mx-20 sm:justify-around">
          {results?.items?.map(
            (
              { title, thumbnailImageUrl, contextLink }: searchResultItem,
              index: number
            ) => (
              <div
                key={index}
                className="inline-flex xl:w-6/12 lg:w-full sm:w-full lg:p-5 py-5 px-3 my-3 hover:bg-neutral-200 dark:hover:bg-zinc-900 hover:shadow-sm dark:hover:shadow-sm hover:shadow-indigo-600 dark:hover:shadow-indigo-500 rounded-md duration-100"
              >
                <a
                  href={contextLink}
                  target="_blank"
                  rel="noreferrer"
                  className="lg:w-4/6 sm:max-w-full"
                >
                  <p className="text-sm">
                    {contextLink.length > 30
                      ? contextLink.substring(0, 30)
                      : contextLink}
                  </p>
                  <p className="lg:text-lg sm:text-sm break-words hover:underline dark:text-blue-300 text-blue-700">
                    {title}
                  </p>
                </a>
                <img
                  src={thumbnailImageUrl}
                  alt={title}
                  loading="lazy"
                  className="max-w-40 lg:mx-10"
                />
              </div>
            )
          )}
        </div>
      );
    default:
      return <Navigate to="/error" />;
  }
}

export default Results;
