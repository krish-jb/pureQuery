import { createContext, useContext, useState, ReactNode } from "react";

export interface searchResultItem {
  href: string;
  title: string;
  image: string;
  thumbnail: string;
  url: string;
}

export interface videoSearchResutlsData {
  title: string;
  videoId: string;
}

export interface searchResults {
  result?: searchResultItem[];
  news?: searchResultItem[];
  data?: videoSearchResutlsData[];
}

interface ResultContextType {
  results: searchResults;
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  getResults: (query: string, type: string | undefined) => Promise<void>;
  getVideoResults: (type: string) => Promise<void>;
}

interface ResultReturn {
  children?: ReactNode;
}

interface FetchRequestWebBody {
  text: string;
  safesearch: "off" | "moderate" | "on";
  timelimit: string;
  region: string;
  max_results: number;
}

interface FetchRequestImagesBody {
  text: string;
  safesearch: "off" | "moderate" | "on";
  region: "in-en";
  color: string;
  size: string;
  type_image: string;
  layout: string;
  max_results: number;
}

interface FetchRequestNewsBody {
  text: string;
  region: "in-en";
  max_results: number;
}

const ResultContext = createContext<ResultContextType | undefined>(undefined);
const baseUrlWeb = "https://google-api31.p.rapidapi.com";
const baseUrlVideo = "https://yt-api.p.rapidapi.com/search";

export const ResultContextProvider = ({ children }: ResultReturn) => {
  const [results, setResults] = useState<searchResults>({
    result: [],
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // To send request and fetch Data from server for Video search
  const fetchVideoData = async (
    baseUrl: string,
    query: string,
    api_key: string,
    api_host: string
  ) => {
    const response = await fetch(`${baseUrl}${query}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": api_key,
        "x-rapidapi-host": api_host,
      },
    });
    const data: searchResults = await response.json();
    return data;
  };

  // To send request and fetch Data from server for Web Search, Images and News
  const fetchData = async (
    url: string,
    api_key: string,
    api_host: string,
    requestBody:
      | FetchRequestWebBody
      | FetchRequestImagesBody
      | FetchRequestNewsBody
  ): Promise<searchResults> => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-rapidapi-key": api_key,
        "x-rapidapi-host": api_host,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const data: searchResults = await response.json();
    return data;
  };

  const getResults = async (query: string, type: string | undefined) => {
    setLoading(true);
    let body:
      | FetchRequestWebBody
      | FetchRequestImagesBody
      | FetchRequestNewsBody
      | undefined = undefined;
    let url: string | undefined;
    const searchMode = "moderate";
    switch (type) {
      case "search":
        body = {
          text: query,
          safesearch: searchMode,
          timelimit: "",
          region: "in-en",
          max_results: 20,
        };
        url = `${baseUrlWeb}/websearch`;
        break;
      case "images":
        body = {
          text: query,
          safesearch: searchMode,
          region: "in-en",
          color: "",
          size: "",
          type_image: "",
          layout: "",
          max_results: 20,
        };
        url = `${baseUrlWeb}/imagesearch`;
        break;
      case "news":
        body = {
          text: query,
          region: "in-en",
          max_results: 20,
        };
        url = `${baseUrlWeb}/`;
        break;
      default:
        throw new Error("Invalid URL");
    }
    if (!body) {
      throw new Error("Reqest Body undefined in function: getResults()");
    }
    try {
      const response = await fetchData(
        url,
        import.meta.env.VITE_GOOGLE_SEARCH_API_KEY,
        import.meta.env.VITE_GOOGLE_SEARCH_API_URI,
        body
      );
      setResults(response);
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const getVideoResults = async (query: string) => {
    setLoading(true);
    const data: searchResults = await fetchVideoData(
      baseUrlVideo,
      query,
      import.meta.env.VITE_YOUTUBE_API_KEY,
      import.meta.env.VITE_YOUTUBE_API_URI
    );
    setResults(data);
    setLoading(false);
  };
  return (
    <ResultContext.Provider
      value={{
        results,
        isLoading,
        searchTerm,
        setSearchTerm,
        getResults,
        getVideoResults,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

const useResultContext = () => {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error(
      "useResultContext must be used within a ResultContextProvider"
    );
  }
  return context;
};

export default useResultContext;
