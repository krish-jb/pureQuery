import { useState } from "react";

import { Navbar } from "./components/Navbar";
import { Router } from "./components/Router";
import { Footer } from "./components/Footer";

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className="bg-zinc-100 dark:bg-zinc-800 dark:text-gray-200 min-h-screen">
        <Navbar
          darkTheme={darkTheme}
          setDarkTheme={setDarkTheme}
          setHasFetched={setHasFetched}
        />
        <Router hasFetched={hasFetched} setHasFetched={setHasFetched} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
