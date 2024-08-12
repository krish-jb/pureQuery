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

const validCategories: string[] = ["search", "images", "news", "videos"];

function Results() {
  const { category } = useParams<{ category?: string }>();
  const hasFetched = useRef(false);

  const { results, isLoading, searchTerm, getResults } = useResultContext();

  useEffect(() => {
    if (!hasFetched.current) {
      getResults("/search?q=word%20cup&lr=en-US&num=10");
      hasFetched.current = true;
    }
  }, []);

  if (isLoading) return <Loading />;

  switch (category) {
    case "search":
      return (
        <>
          {results.items.map(
            ({ link, title }: searchResultItem, index: number) => (
              <div key={index}>
                <a href={link}>{title}</a>
              </div>
            )
          )}
        </>
      );
    case "images":
      return "images";
    case "videos":
      return "videos";
    case "news":
      return "news";
    default:
      return <Navigate to="/error" />;
  }
}

export default Results;
