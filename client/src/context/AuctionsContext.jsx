import { createContext, useState, useEffect, useContext, useRef } from 'react';
import UserContext from './UserContext';

const AuctionsContext = createContext();

export const AuctionsProvider = ({ children }) => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    user,
    setUser,
    userFavorites,
    userCreatedAuctions,
    userActiveBids,
    setUserCreatedAuctions,
    setUserActiveBids,
    setUserFavorites,
  } = useContext(UserContext);

  useEffect(() => {
    fetchAuctions();
  }, [userFavorites, user]);

  // fetch auctions
  const fetchAuctions = async () => {
    const response = await fetch('/api/auctions');
    const data = await response.json();

    const filterByStartdate = data.filter((auction) => {
      return !(new Date(auction.startdate) > Date.now());
    });

    const filterByExpiredStatus = filterByStartdate.filter((auction) => {
      return auction.expired != true;
    });

    setAuctions(filterByExpiredStatus);
    setLoading(false);
  };

  // create new auction
  const createAuction = async (newAuction) => {
    // puts the auction in the auctions collection
    const response = await fetch('/api/auctions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAuction),
    });
    const result = await response.json();
    console.log('Success', result);

    // updates the auction-state
    setAuctions([...auctions, { ...result }]);
    setUserCreatedAuctions([...userCreatedAuctions, result]);

    //update user with the newly created auction
    setUser({
      ...user,
      createdAuctions: [...user.createdAuctions, result._id],
    });

    // updates the user object in the database with the newly created auction.
    const responseUser = await fetch(`/api/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    });
    const resultUser = await responseUser.json();
  };

  // edit auction
  const editAuction = async (id, data) => {
    // spreads the updates auction across a new variable for use in the user object
    const updatedAuction = {
      ...data,
    };

    // pushes the new auctions to the database
    const response = await fetch(`/api/auctions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedAuction),
    });
    const result = await response.json();

    setAuctions(
      auctions.map((item) => {
        if (item._id === id) {
          return { ...item, ...result };
        } else {
          return item;
        }
      })
    );

    setUserCreatedAuctions(
      userCreatedAuctions.map((item) => {
        if (item._id === id) {
          return { ...item, ...result };
        } else {
          return item;
        }
      })
    );
  };

  // update bid
  const updateBid = async (id, bid) => {
    // gets the auctions data from the database so we have all the info
    const responseFetch = await fetch(`/api/auctions/${id}`);
    const data = await responseFetch.json();

    // increment the bids
    data.bids++;
    // get the existing bidders
    const existingBids = data.bidders;
    console.log(existingBids);

    // creates a new object with the new info
    const newPrice = {
      ...data,
      price: bid,
      bidders: [...existingBids, { _id: user._id, current_bid: bid }],
    };

    // updates the auction in the database
    const updateAuctionWithNewPrice = await fetch(`/api/updatebid/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPrice),
    });
    const resultNewPrice = await updateAuctionWithNewPrice.json();

    // updates the auctions state with the new info
    setAuctions((prevAuctions) => {
      const updatedAuctions = prevAuctions.map((auctionItem) =>
        auctionItem._id === id
          ? {
              ...auctionItem,
              price: resultNewPrice.price,
              bids: resultNewPrice.bids,
            }
          : auctionItem
      );
      return updatedAuctions;
    });

    if (!userActiveBids.some((item) => item._id === id)) {
      setUserActiveBids([...userActiveBids, { ...resultNewPrice }]);
    } else {
      setUserActiveBids(
        userActiveBids.map((item) => {
          if (item._id === id) {
            return { ...item, ...resultNewPrice };
          } else {
            return item;
          }
        })
      );
    }
  };

  // deletes an auction from the database and also from the users database of their auctions
  const deleteAuction = async (id, item) => {
    // removes the auction from the auction state/context
    setAuctions(auctions.filter((a) => a._id !== id));

    // filters out the deleted auction and returns a new array with the remaining auctions
    const filteredAuctions = user.createdAuctions.filter((a) => a !== id);
    const filteredFavorites = user.favoriteAuctions.filter((a) => a !== id);

    console.log(id);
    console.log(item);
    const filterFavoriteState = userFavorites.filter((auctionItem) => {
      return auctionItem._id !== item._id;
    });
    user.favoriteAuctions = filteredFavorites;

    const filterCreatedState = userCreatedAuctions.filter((auctionItem) => {
      return auctionItem._id !== item._id;
    });
    user.createdAuctions = filteredAuctions;

    //removes the auction from the usercreated auctions
    setUserCreatedAuctions([...filterCreatedState]);
    // removes auction from favorites, if it exists
    setUserFavorites([...filterFavoriteState]);

    // deletes the auction from the auctions collection in the database
    const response = await fetch(`/api/auctions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const resultDelete = await response.json();

    // puts the auction in the users createdAuctions array.
    const responseUser = await fetch(`/api/users_create_auction/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filteredAuctions),
    });
    const resultUser = await responseUser.json();
    console.log(resultUser);
  };

  return (
    <AuctionsContext.Provider
      value={{
        auctions,
        loading,
        setLoading,
        updateBid,
        editAuction,
        createAuction,
        deleteAuction,
      }}
    >
      {children}
    </AuctionsContext.Provider>
  );
};

export default AuctionsContext;
