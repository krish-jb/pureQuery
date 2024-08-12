import { createContext, useContext, useState, ReactNode } from "react";

export interface searchResultItem {
  link: string;
  title: string;
  htmlSnippet: string;
  htmlTitle: string;
  snippet: string;
}

export interface searchResults {
  items: serachResultItem[];
}

interface ResultContextType {
  results: searchResults;
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  getResults: (type: string) => Promise<void>;
}

interface ResultReturn {
  children?: ReactNode;
}

const ResultContext = createContext<ResultContextType | undefined>(undefined);
const baseUrl = "https://google-search72.p.rapidapi.com";

export const ResultContextProvider = ({ children }: ResultReturn) => {
  const [results, setResults] = useState<searchResults>({ items: [] });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getResults = async (type: string) => {
    setLoading(true);
    const response = await fetch(`${baseUrl}${type}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "e10dd9551bmsh11374e7b97be551p1f5d4cjsncaec8d125dd3",
        "x-rapidapi-host": "google-search72.p.rapidapi.com",
      },
    });
    const data: searchResults = await response.json();
    console.log(data);

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
