import { useState, useContext, useEffect } from 'react';
import AuctionsContext from '../context/AuctionsContext.jsx';
import Spinner from '../components/Shared/Spinner.jsx';
import { Link, useParams } from 'react-router-dom';
import AuctionItem from '../components/AuctionItem.jsx';

function SearchPage() {
  const { categoryName } = useParams();
  const { auctions, loading } = useContext(AuctionsContext);
  const [currentCategory, setCurrentCategory] = useState('');
  const [filteredAuctions, setFilteredAuctions] = useState([]);

  const filterItems = (array, searchTerm) =>
    array.filter((item) => {
      return item.category.toLowerCase().includes(searchTerm.toLowerCase());
    });

  useEffect(() => {
    let filter = filterItems(auctions, categoryName);
    setFilteredAuctions(filter);
    setCurrentCategory(categoryName);
  }, [currentCategory, categoryName]);

  const handleOnClick = (e) => {
    const category = e.target.innerText;

    const filter = filterItems(auctions, category);
    setFilteredAuctions(filter);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="flex flex-row min-h-screen m-5">
      {/* <div>
        <ul className="menu bg-base-200 w-56 rounded-box">
          <li>
            <details
              open={currentCategory === 'Nintendo' ? true : false}
              onClick={handleOnClick}
            >
              <summary>Nintendo</summary>
              <ul>
                <details
                  open={currentCategory === 'Konsol' ? true : false}
                  onClick={handleOnClick}
                >
                  <summary>Konsol</summary>
                  <li>
                    <a></a>
                  </li>
                </details>
                <li>
                  <a>Spel</a>
                </li>
                <li>
                  <details>
                    <summary>Parent</summary>
                    <ul>
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </details>
            <details
              open={currentCategory === 'Commodore' ? true : false}
              onClick={handleOnClick}
            >
              <summary>Commodore</summary>
              <ul>
                <li>
                  <a>Konsol</a>
                </li>
                <li>
                  <a>Spel</a>
                </li>
                <li>
                  <details>
                    <summary>Parent</summary>
                    <ul>
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </details>
            <details
              open={currentCategory === 'Atari' ? true : false}
              onClick={handleOnClick}
            >
              <summary>Atari</summary>
              <ul>
                <li>
                  <a>Konsol</a>
                </li>
                <li>
                  <a>Spel</a>
                </li>
                <li>
                  <details>
                    <summary>Parent</summary>
                    <ul>
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </details>
            <details
              open={currentCategory === 'Famicom' ? true : false}
              onClick={handleOnClick}
            >
              <summary>Famicom</summary>
              <ul>
                <li>
                  <a>Konsol</a>
                </li>
                <li>
                  <a>Spel</a>
                </li>
                <li>
                  <details>
                    <summary>Parent</summary>
                    <ul>
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </details>
            <details
              open={currentCategory === 'Amiga' ? true : false}
              onClick={handleOnClick}
            >
              <summary>Amiga</summary>
              <ul>
                <li>
                  <a>Konsol</a>
                </li>
                <li>
                  <a>Spel</a>
                </li>
                <li>
                  <details>
                    <summary>Parent</summary>
                    <ul>
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div> */}
      <div className="grid grid-cols-6 gap-4 mt-10 mx-5">
        {filteredAuctions.map((item) => (
          <Link
            to={`/auction/${item._id}`}
            key={item._id}
            className="max-w-80 max-h-80"
          >
            <AuctionItem item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
