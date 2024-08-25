import { Routes, Route, Navigate } from "react-router-dom";
import Results from "./Results";
import Error from "./Error";
interface props {
  hasFetched: boolean;
  setHasFetched: (setTo: boolean) => void;
}
export const Router = ({ hasFetched, setHasFetched }: props) => {
  return (
    <div className="px-1">
      <Routes>
        <Route path="/" element={<Navigate to="/search" />} />
        <Route
          path="/:category"
          element={
            <Results hasFetched={hasFetched} setHasFetched={setHasFetched} />
          }
        />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
};
