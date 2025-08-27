import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './Shared/Card';
import UserContext from '../context/UserContext.jsx';
import { toast } from 'react-toastify';

function FavoriteAuction() {
  const { user, userFavorites, setUserFavorites } = useContext(UserContext);

  const removeFromFavorites = async (id) => {
    const favoriteData = {
      _id: id,
    };

    // remove the auction from the users favorites in the database
    const removeFavorite = await fetch(`/api/updatefavorites/${user._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(favoriteData),
    });

    // remove the auction from the currently logged-in user
    const filteredAuctions = user.favoriteAuctions.filter((auctionId) => {
      return auctionId !== id;
    });

    user.favoriteAuctions = filteredAuctions;

    const filterAuctionsState = userFavorites.filter((auctionItem) => {
      return auctionItem._id !== id;
    });

    setUserFavorites([...filterAuctionsState]);

    // toast to notify user
    toast.info('Auktion borttagen från favoriter');
  };

  if (userFavorites.length <= 0) {
    return (
      <>
        <h1 className="flex justify-center text-2xl">
          Inga favorit-auktioner, lägg till några!
        </h1>
      </>
    );
  } else {
    return (
      <>
        <div className="grid grid-cols-6 gap-4 mt-10 mx-5">
          {userFavorites.map((item) => (
            <section
              className="flex flex-col justify-between gap-2"
              key={item._id}
            >
              <Card>
                <Link
                  to={`/auction/${item._id}`}
                  className="max-w-80 max-h-auto"
                >
                  <figure className="rounded-t-lg max-h-28">
                    <img src={item.image_urls} alt={item.name} />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <p className="truncate">{item.description}</p>
                    <p>{item.price} kr</p>
                    <span>{item.bids} bud</span>
                    <span>
                      {new Date(item.auctionEndTime).toLocaleString()}
                    </span>
                  </div>
                </Link>
              </Card>
              <button
                className="btn btn-warning"
                onClick={() => removeFromFavorites(item._id)}
              >
                Ta bort från favoriter
              </button>
            </section>
          ))}
        </div>
      </>
    );
  }
}

export default FavoriteAuction;
