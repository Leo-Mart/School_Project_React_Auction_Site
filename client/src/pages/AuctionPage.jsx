import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext, useRef } from 'react';
import Spinner from '../components/Shared/Spinner';
import { FaRegHeart, FaHeart, FaRegStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CountdownTimer from '../components/CountdownTimer';
import BiddingModal from '../components/BiddingModal';
import Card from '../components/Shared/Card';
import UserContext from '../context/UserContext';
import StripePayment from '../components/Shared/StripePayment';

function AuctionPage() {
  const [auction, setAuction] = useState(null);
  const [newBid, setNewBid] = useState(0);
  const [bidAmount, setBidAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [price, setPrice] = useState(undefined);
  const [bids, setBids] = useState(undefined);
  const [expired, setExpired] = useState(false);
  const {
    user,
    userFavorites,
    setUserFavorites,
    userWonAuction,
    setUserWonAuction,
  } = useContext(UserContext);

  // fetches the id of the current auction from the URL
  const params = useParams();
  const navigate = useNavigate();
  const hasCalledExpiredAuction = useRef(false);

  useEffect(() => {
    const fetchAuction = async () => {
      const response = await fetch(`/api/auctions/${params.auctionId}`);
      const data = await response.json();
      setPrice(data.price);
      setBids(data.bids);
      setAuction(data);
      setLoading(false);
      setNewBid(price);
      setBidAmount(bids);
    };

    if (user && user.favoriteAuctions) {
      const isFavorite = user.favoriteAuctions.includes(params.auctionId);
      setIsClicked(isFavorite);
    } else {
      setIsClicked(false);
    }

    fetchAuction();
  }, [params.auctionId, price, bidAmount]);

  useEffect(() => {
    if (expired && !hasCalledExpiredAuction.current) {
      auctionExpired();
    }
  }, [expired]);

  const auctionExpired = async () => {
    if (hasCalledExpiredAuction.current) return;

    hasCalledExpiredAuction.current = true;

    console.log(auction.bidders[auction.bidders.length - 1]._id);

    const bidData = {
      _id: auction._id,
    };
    // send the objectid to the users wonAuction array
    if (user) {
      const addWonBid = await fetch(
        `/api/wonbid/${auction.bidders[auction.bidders.length - 1]._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bidData),
        }
      );
      const result = await addWonBid.json();
      console.log('success - ', result);
    }
    // send the auctionobject to a state in the usercontext for rendering on the userpage
    setUserWonAuction([...userWonAuction, auction]);
    // update the user/session object
    user.wonAuctions.push(bidData._id);
    // flag the auction as inactive or expired so it won't show up on the homepage
    // expired => true
  };

  const handleFavoriteClick = async () => {
    const favoriteData = {
      _id: auction._id,
    };

    if (!user) {
      toast.error('Du måste vara inloggad för att favoritmarkera auktioner!');
    } else {
      if (user && !isClicked) {
        console.log('auktion lagt som favorit');

        // add auction to user favorites in the database
        const addFavorite = await fetch(`/api/updatefavorites/${user._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(favoriteData),
        });
        const result = await addFavorite.json();

        // add auction to users favorites in the currently logged-in user object
        user.favoriteAuctions.push(favoriteData._id);
        setUserFavorites([...userFavorites, auction]);

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
          return auctionId !== auction._id;
        });

        user.favoriteAuctions = filteredAuctions;

        const filterAuctionsState = userFavorites.filter((auctionItem) => {
          return auctionItem._id !== auction._id;
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

  const handleBuyClick = async () => {
    if (!user) {
      toast.error('Du måste vara inloggad för att köpa!');
    } else {
      StripePayment(auction.name, auction.buyout_price);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen grid grid-cols-4 gap-4 mt-10 mx-10">
      <div className="grid col-span-2 content-center justify-center">
        <div id="item1" className=" w-full">
          <img src={auction.image_urls} className="w-full" />
        </div>
      </div>

      {/* Buttons and bid info */}
      <div className="col-span-1 flex flex-col gap-2">
        <h2 className="text-3xl">{auction.name}</h2>
        {auction.bids === 0 ? (
          <span>Utropspris: {auction.price} kr</span>
        ) : (
          <span>Nuvarande bud: {newBid} kr</span>
        )}
        <span>Slutar om:</span>
        <CountdownTimer
          endTime={new Date(auction.auctionEndTime)}
          setExpired={setExpired}
        />
        <p>Antal bud: {auction.bids}</p>
        {user && auction.seller._id === user._id ? (
          <button disabled="disabled" className="btn btn-primary">
            Lägg Bud
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById('bidding-modal').showModal()}
          >
            Lägg Bud
          </button>
        )}

        {auction.buyout_price === null ? (
          <></>
        ) : auction.buyout_price < auction.price ? (
          <button className="btn btn-outline btn-warning" disabled="disabled">
            Köp nu {auction.buyout_price} kr
          </button>
        ) : user && auction.seller._id === user._id ? (
          <button className="btn btn-outline btn-warning" disabled="disabled">
            Köp nu {auction.buyout_price} kr
          </button>
        ) : (
          <button
            className="btn btn-outline btn-warning"
            onClick={handleBuyClick}
          >
            Köp nu {auction.buyout_price} kr
          </button>
        )}

        {user && auction.seller._id === user._id ? (
          <button
            className="btn btn-ghost"
            disabled="disabled"
            onClick={handleFavoriteClick}
          >
            Spara {isClicked ? <FaHeart /> : <FaRegHeart />}
          </button>
        ) : (
          <button className="btn btn-ghost" onClick={handleFavoriteClick}>
            Spara {isClicked ? <FaHeart /> : <FaRegHeart />}
          </button>
        )}

        {/* Seller info */}
        <div className="col-span-1 flex flex-col p-4">
          <h3>Säljare: {auction.seller.firstname}</h3>
          <p>E-post: {auction.seller.email}</p>
          {/* <span className="flex flex-row">
              <FaRegStar /> 5.0
            </span> */}
          {/* <p>MER INFO OM SÄLJARE HÄR</p>
            <p>En liten checkbox här att de är veriferade säljare?</p>
            <p>En liten indikator på hur många omdömen de har</p> */}

          {/* <div className="flex flex-row gap-1">
              <button className="btn btn-ghost">Kontakta</button>
              <button className="btn btn-ghost">Läs omdömen</button>
              <button className="btn btn-ghost">Följ</button>
            </div> */}
        </div>
        <span className="flex flex-row">
          <details className="dropdown">
            <summary className="m-1 btn">Frakt</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 border-2">
              <li>Frakt med PostNord. 50 kr</li>
            </ul>
          </details>
          <details className="dropdown">
            <summary className="m-1 btn">Betalning</summary>
            <ul className="p-2 shadow menu dropdown-content z-[2] bg-base-100 rounded-box w-52 border-2">
              <li>
                Alla betalningar går genom Retroauktioner.se av säkerhetsskäl
              </li>
              <li>Betalningssätt: </li>
            </ul>
          </details>
        </span>
      </div>

      {/* Auction description and other text */}
      <div className="col-span-2 flex flex-col">
        <h3 className="text-2xl">Beskrivning</h3>
        <hr />
        <p>{auction.description}</p>
      </div>
      <BiddingModal
        currentBid={auction.price}
        newBid={newBid}
        setNewBid={setNewBid}
        bidAmount={bidAmount}
        setBidAmount={setBidAmount}
      />
    </div>
  );
}

export default AuctionPage;
