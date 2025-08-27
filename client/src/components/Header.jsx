import { Link } from 'react-router-dom';
import Categories from './Categories';

import ModalButton from './ModalButton';

import { SearchBar } from './Searchbar/SearchBar';
import { SearchResultsList } from './Searchbar/SearchResultsList';
import { useState, useContext } from 'react';
import UserContext from '../context/UserContext';

function Header() {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState([]);

  const { user, logout } = useContext(UserContext);

  return (
    <>
      <div className="flex flex-col items-center bg-base-300 outline p-3 text-black">
        <nav className="flex justify-between w-full">
          <Link className="btn btn-primary btn-lg" to={'/'}>
            Retroauktioner
          </Link>

          <div className="search-bar-container">
            <SearchBar
              setResults={setResults}
              setInput={setInput}
              input={input}
            />
            <SearchResultsList
              results={results}
              setResults={setResults}
              setInput={setInput}
            />
          </div>

          <Categories />
          <div className="flex flex-col items-center">
            {user ? (
              <Link className="btn btn-warning m-1 w-40" to={'/userPage'}>
                Mina sidor
              </Link>
            ) : (
              <ModalButton />
            )}
            {user ? (
              <button className="btn btn-error m-1 w-40" onClick={logout}>
                Logga ut
              </button> // Logga ut knapp här
            ) : (
              <Link
                className="btn btn-warning btn-bg-base-200 m-1 w-40"
                to={'/register'}
              >
                Registrera
              </Link>
            )}
          </div>
        </nav>
        {/* {user ? <p className="text-white"> {user.message}!</p> : <></>} */}
      </div>
    </>
  );
}

export default Header;
