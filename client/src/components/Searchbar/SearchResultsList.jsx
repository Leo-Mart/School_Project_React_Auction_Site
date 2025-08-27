import { SearchResult } from './SearchResult';

export const SearchResultsList = ({ results, setResults, setInput }) => {
  return (
    <div className="container bg-accent flex-col shadow-sm rounded-lg mt-1 max-h-64 z-10 overflow-x-clip overflow-y-scroll ml-3 absolute w-72">
      {results.map((result, id) => {
        return (
          <SearchResult
            result={result}
            key={id}
            setResults={setResults}
            setInput={setInput}
          />
        );
      })}
    </div>
  );
};
