import { createContext, useContext, useState, ReactNode } from "react";

interface ResultContextType {
  results: string[];
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  getResults: (type: string) => Promise<void>;
}

interface ResultReturn {
  children?: ReactNode;
}

const ResultContext = createContext<ResultContextType | undefined>(undefined);
const baseUrl = "https://google-search74.p.rapidapi.com";

const ResultContextProvider = ({ children }: {children: ReactNode}) => {
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getResults = async (type: string) => {
    setLoading(true);
    const response = await fetch(`${baseUrl}${type}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "8b725df164msh02d3f6a2fdc754dp177678jsne728781d5504",
        "x-rapidapi-host": "google-search74.p.rapidapi.com",
      },
    });
    const data = await response.json();

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
        getResults
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error("useResultContext must be used within a ResultContextProvider");
  }
  return context;
};

export default useResultContext;