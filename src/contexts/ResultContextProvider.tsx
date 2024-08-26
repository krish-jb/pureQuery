import { createContext, useContext, useState, ReactNode } from "react";

export interface searchResultItem {
  htmlSnippet: string;
  htmlTitle: string;
  link: string;
  snippet: string;
  title: string;
  contextLink: string;
  originalImageUrl: string;
  thumbnailImageUrl: string;
}

export interface videoSearchResutlsData {
  title: string;
  videoId: string;
}

export interface searchResults {
  items?: searchResultItem[];
  data?: videoSearchResutlsData[];
}

interface ResultContextType {
  results: searchResults;
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  getResults: (type: string, isNewsImages: boolean) => Promise<void>;
  getVideoResults: (type: string) => Promise<void>;
}

interface ResultReturn {
  children?: ReactNode;
}

const ResultContext = createContext<ResultContextType | undefined>(undefined);
const baseUrl = "https://google-search72.p.rapidapi.com";
const baseUrlVideo = "https://yt-api.p.rapidapi.com/search";

export const ResultContextProvider = ({ children }: ResultReturn) => {
  const [results, setResults] = useState<searchResults>({
    items: [],
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("microprocessors");

  const fetchData = async (
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

  const getResults = async (query: string, isNewsImages: boolean = false) => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    setLoading(true);
    const modQuery = `${query}&start=0`;
    const data: searchResults = await fetchData(
      baseUrl,
      modQuery,
      import.meta.env.VITE_GOOGLE_SEARCH_API_KEY,
      import.meta.env.VITE_GOOGLE_SEARCH_API_URI
    );
    delay(1000);
    if (isNewsImages) {
      const modQuery = `${query}&start=10`;
      const data2: searchResults = await fetchData(
        baseUrl,
        modQuery,
        import.meta.env.VITE_GOOGLE_SEARCH_API_KEY,
        import.meta.env.VITE_GOOGLE_SEARCH_API_URI
      );
      const combinedData: searchResults = {
        items: [...(data.items || []), ...(data2.items || [])],
        data: [],
      };
      setResults(combinedData);
    } else {
      setResults(data);
    }
    setLoading(false);
  };

  const getVideoResults = async (query: string) => {
    setLoading(true);
    const data: searchResults = await fetchData(
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
