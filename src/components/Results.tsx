import { useParams, Navigate } from 'react-router-dom';
const validCategories: string[] = ['search', 'images', 'news', 'videos'];

function Results() {
  const { category } = useParams<{ category? : string }>();
  if (category === undefined || !validCategories.includes(category)) {
    return <Navigate to='/error' />
  }
  return (
    <div>Results</div>
  );
}

export default Results;