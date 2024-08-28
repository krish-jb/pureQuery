import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import ReactPlayer from "react-player";
import Loading from "./Loading";
import useResultContext, {
  videoSearchResutlsData,
  searchResultItem,
} from "../contexts/ResultContextProvider";

interface props {
  hasFetched: boolean;
  setHasFetched: (setTo: boolean) => void;
}

function Results({ hasFetched, setHasFetched }: props) {
  const { category } = useParams<{ category?: string }>();
  const { results, isLoading, searchTerm, getResults, getVideoResults } =
    useResultContext();

  useEffect(() => {
    if (searchTerm) {
      if (category === "videos") {
        if (!hasFetched) {
          getVideoResults(
            `?query=${searchTerm}&geo=IN&type=video&duration=medium`
          );
          setHasFetched(true);
        }
      } else {
        if (!hasFetched) {
          getResults(searchTerm, category);
          setHasFetched(true);
        }
      }
    }
  }, [searchTerm, category, hasFetched]);

  if (isLoading) return <Loading />;

  switch (category) {
    case "search":
      return (
        <div className="flex flex-wrap justify-between lg:px-60 sm:px-20 sm:justify-around">
          {results?.result?.map(
            ({ href, title }: searchResultItem, index: number) => (
              <div
                key={index}
                className="md:w-2/5 w-full max-w-ls my-2 p-5 hover:bg-neutral-200 dark:hover:bg-zinc-900 hover:shadow-sm hover:shadow-indigo-600 dark:hover:shadow-indigo-500 rounded-md duration-100"
              >
                <a href={href} target="_blank" rel="noreferrer">
                  <p className="text-sm">
                    {href?.length > 30 ? href.substring(0, 30) : href}
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
          {results?.result?.map(
            ({ title, thumbnail, image }: searchResultItem, index: number) => (
              <a
                className="sm:p-3 p-5 max-w-80 hover:bg-neutral-200 dark:hover:bg-zinc-900 hover:shadow-md dark:hover:shadow-sm hover:shadow-indigo-600/40 dark:hover:shadow-indigo-600 rounded-md duration-100"
                href={image}
                key={index}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={thumbnail}
                  alt={title}
                  loading="lazy"
                  className="max-h-80"
                />
                <p className="w-50 break-words text-sm mt-2">
                  {title?.length > 50 ? title.substring(0, 50) + "..." : title}
                </p>
              </a>
            )
          )}
        </div>
      );
    case "videos":
      return (
        <div className="flex flex-wrap justify-around w-full my-6 sm:px-50 items-center">
          {results.data?.map(
            ({ title, videoId }: videoSearchResutlsData, index: number) => (
              <div
                key={index}
                className="p-2 max-w-fit hover:bg-neutral-200 dark:hover:bg-zinc-900 hover:shadow-md dark:hover:shadow-sm hover:shadow-indigo-600/40 dark:hover:shadow-indigo-600 rounded-md duration-100"
              >
                <ReactPlayer
                  url={"https://www.youtube.com/watch?v=" + videoId}
                  controls
                  width={"320px"}
                  height={"200px"}
                />
                <p className="max-w-[320px] truncate">{title}</p>
              </div>
            )
          )}
        </div>
      );
    case "news":
      return (
        <div className="flex flex-wrap justify-between xl:px-60 lg:px-50 lg:mx-20 sm:justify-around">
          {results?.news?.map(
            ({ title, image, url }: searchResultItem, index: number) => (
              <div
                key={index}
                className="inline-flex xl:w-6/12 lg:w-full sm:w-full lg:p-5 py-5 px-3 my-3 hover:bg-neutral-200 dark:hover:bg-zinc-900 hover:shadow-sm dark:hover:shadow-sm hover:shadow-indigo-600 dark:hover:shadow-indigo-500 rounded-md duration-100"
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="lg:w-4/6 sm:max-w-full"
                >
                  <p className="text-sm">
                    {url?.length > 30 ? url.substring(0, 30) + "..." : url}
                  </p>
                  <p className="lg:text-lg sm:text-sm break-words hover:underline dark:text-blue-300 text-blue-700">
                    {title}
                  </p>
                </a>
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  className="max-w-40 max-h-20 lg:mx-10"
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
