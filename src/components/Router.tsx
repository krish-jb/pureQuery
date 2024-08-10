import { Routes, Route, Navigate } from 'react-router-dom';
import Results from './Results';
import Error from './Error';

export const Router = () => {
  return (
    <div  className="p-4">
      <Routes>
        <Route path="/" element={<Navigate to="/search" />} />
        <Route path='/:category' element={<Results />} />
        <Route path='/error' element={<Error />} />
      </Routes>
    </div>
  )
}
