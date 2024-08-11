import { useEffect } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import Loading from './Loading';

import { useResultContext } from "../contexts/ResultContextProvider";

const validCategories: string[] = ["search", "images", "news", "videos"];

function Results() {
  const { category } = useParams<{ category?: string }>();
  if (category === undefined || !validCategories.includes(category)) {
    return <Navigate to="/error" />;
  }
  const { results, isLoading, searchTerm, setSearchTerm  } = useResultContext();
  const location = useLocation();
  
  if (isLoading) return <Loading />


  return <div>results</div>;
}

export default Results;
