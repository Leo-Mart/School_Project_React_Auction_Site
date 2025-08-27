import Spinner from '../Shared/Spinner';
import { useNavigate } from 'react-router-dom';

export const SearchResult = ({ result, loading, setResults, setInput }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/auction/${result._id}`, { replace: true });
    setResults([]);
    setInput('');
  };
  return loading ? (
    <Spinner />
  ) : (
    <div className="cursor-pointer hover:bg-primary m-2" onClick={handleClick}>
      <span className="text-red-600 truncate mr-1">{result.price} kr</span>
      <span className="mr-1 text-clip font-semibold">{result.name}</span>
      <p className="truncate">{result.description}</p>
    </div>
  );
};
