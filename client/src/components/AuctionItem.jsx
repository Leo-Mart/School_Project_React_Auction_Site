import Card from './Shared/Card';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import { toast } from 'react-toastify';
import CountdownTimer from '../components/CountdownTimer';

function AuctionItem({ item }) {
  // item e varje auktion i auctions i databasen.
  const { user, setUserFavorites, userFavorites } = useContext(UserContext);
  const [isClicked, setIsClicked] = useState(false);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (user && user.favoriteAuctions) {
      const isFavorite = user.favoriteAuctions.includes(item._id);
      setIsClicked(isFavorite);
    } else {
      setIsClicked(false);
    }
  }, [userFavorites]);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();

    const favoriteData = {
      _id: item._id,
    };
    if (!user) {
      toast.error('du måste logga in för att lägga favoriter');
    } else {
      if (user && !isClicked) {
        // add auction to users favorites in the database
        const addFavorite = await fetch(`/api/updatefavorites/${user._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(favoriteData),
        });
        const result = await addFavorite.json();

        // add auction to users favorites in the currenlty logged-in user object
        user.favoriteAuctions.push(favoriteData._id);
        setUserFavorites([...userFavorites, item]);
        // shows the toast on successful
        toast.success('Auktion favoritmarkerad!');

        // set isclicked to true to fill in the button
        setIsClicked(true);
      } else if (user && isClicked) {
        // remove the auction from the users favorites in the database
        const removeFavorite = await fetch(`/api/updatefavorites/${user._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(favoriteData),
        });

        // remove the auction from the currently logged-in user
        const filteredAuctions = user.favoriteAuctions.filter((auctionId) => {
          return auctionId !== item._id;
        });

        user.favoriteAuctions = filteredAuctions;

        const filterAuctionsState = userFavorites.filter((auction) => {
          return auction._id !== item._id;
        });

        setUserFavorites([...filterAuctionsState]);

        // toast to notify user
        toast.info('Auktion borttagen från favoriter');
        // set isclicked back to false to unfill the button
        setIsClicked(false);
      } else {
        console.log('Annat fel!');
      }
    }
  };
  return (
    <>
      <Card>
        <figure>
          <img src={item.image_urls} />
        </figure>
        <div className="card-body ">
          <h2 className="card-title truncate">{item.name}</h2>
          <p className="truncate">{item.description}</p>
          <p className="truncate">{item.price} kr</p>
          <span className="truncate">{item.bids} bud</span>
          <span>
            {expired ? (
              <p className="text-red-800 text-shadow text-2xl">Avslutad</p>
            ) : (
              <CountdownTimer
                endTime={new Date(item.auctionEndTime)}
                setExpired={setExpired}
              />
            )}
          </span>

          <div className="card-actions justify-end">
            <div onClick={handleFavoriteClick}>
              {isClicked ? <FaHeart /> : <FaRegHeart />}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default AuctionItem;
