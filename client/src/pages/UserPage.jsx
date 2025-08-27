import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import CreateAd from '../components/CreateAd';
import ActiveAd from '../components/ActiveAd';
import ActiveAuction from '../components/ActiveBids';
import WonAuction from '../components/WonAuction';
import FavoriteAuction from '../components/FavoriteAuction';
import AuctionsContext from '../context/AuctionsContext';
import UserContext from '../context/UserContext';

function UserPage() {
  const location = useLocation();

  const [showCreateAd, setShowCreateAd] = useState(false);
  const [showActiveAd, setShowActiveAd] = useState(
    location.state?.showActiveAd || false
  );
  const [showActiveAuction, setShowActiveAuction] = useState(false);
  const [showWonAuction, setShowWonAuction] = useState(false);
  const [showFavoriteAuctions, setShowFavoriteAuctions] = useState(false);
  const [createdAdInfo, setCreatedAdInfo] = useState([]);
  const [auctionEndTime, setAuctionEndTime] = useState(null);

  const { createAuction, deleteAuction } = useContext(AuctionsContext);
  const { user } = useContext(UserContext);

  const handleAdCreation = (adInfo) => {
    const expirationPeriodInDays = parseInt(adInfo.expiration); // Convert expiration to number of days
    const currentTime = new Date(adInfo.startdate);
    const auctionEndTime = new Date(
      currentTime.getTime() + expirationPeriodInDays * 24 * 60 * 60 * 1000
    ); // Calculate auction end time
    setAuctionEndTime(auctionEndTime);

    const auctionInfo = {
      ...adInfo,
      auctionEndTime,
      image_url: adInfo.image_url,
      seller: user._id,
    };

    console.log(auctionInfo);
    createAuction(auctionInfo);
    setShowCreateAd(false);
    setShowActiveAd(true);
  };

  const handleDeleteAd = (id, item) => {
    deleteAuction(id, item);
  };

  const handleCreateAdClick = () => {
    setShowCreateAd(true);
    setShowActiveAd(false);
    setShowActiveAuction(false);
    setShowWonAuction(false);
    setShowFavoriteAuctions(false);
  };

  const handleActiveAdClick = () => {
    setShowActiveAd(true);
    setShowCreateAd(false);
    setShowActiveAuction(false);
    setShowWonAuction(false);
    setShowFavoriteAuctions(false);
  };

  const handleActiveAuctionClick = () => {
    setShowActiveAuction(true);
    setShowActiveAd(false);
    setShowCreateAd(false);
    setShowWonAuction(false);
    setShowFavoriteAuctions(false);
  };

  const handleWonAuctionClick = () => {
    setShowWonAuction(true);
    setShowActiveAd(false);
    setShowActiveAuction(false);
    setShowCreateAd(false);
    setShowFavoriteAuctions(false);
  };
  const handleFavoriteClick = () => {
    setShowWonAuction(false);
    setShowActiveAd(false);
    setShowActiveAuction(false);
    setShowCreateAd(false);
    setShowFavoriteAuctions(true);
  };

  return (
    <>
      <div className="min-h-screen">
        <div className="flex flex-col w-full space-y-4 pt-4">
          <div className="grid h-auto card bg-base-300 rounded-box place-items-center py-3">
            <div>
              Namn: {user.firstname} {user.lastname}
            </div>
            <div>Epost: {user.email}</div>
            <div>
              Du har {user.favoriteAuctions.length} auktioner favoriserade
            </div>
            <div>Du har {user.activeBids.length} aktiva bud</div>
            <div>Du har skapat {user.createdAuctions.length} annonser</div>
            <div>Du har vunnit {user.wonAuctions.length} auktioner</div>
          </div>
          <div className="divider"></div>
          <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
            <span className="flex items-center">
              <button
                className="btn btn-secondary m-2"
                onClick={handleActiveAuctionClick}
              >
                Aktiva bud
              </button>
              <button
                className="btn btn-secondary m-2"
                onClick={handleWonAuctionClick}
              >
                Mina vunna bud
              </button>
              <button
                className="btn btn-secondary m-2"
                onClick={handleActiveAdClick}
              >
                Mina aktiva annonser
              </button>
              <button
                className="btn btn-secondary m-2"
                onClick={handleCreateAdClick}
              >
                Skapa annons
              </button>
              <button
                className="btn btn-secondary m-2"
                onClick={handleFavoriteClick}
              >
                Mina favorit-auktioner
              </button>
            </span>
          </div>
        </div>
        <div className="divider"></div>
        <div className="">
          {showCreateAd && <CreateAd onCreateAd={handleAdCreation} />}
          {showActiveAd && (
            <ActiveAd
              ads={createdAdInfo}
              auctionEndTime={auctionEndTime}
              onDeleteAd={handleDeleteAd}
            />
          )}
          {showActiveAuction && <ActiveAuction />}
          {showWonAuction && <WonAuction />}
          {showFavoriteAuctions && <FavoriteAuction />}
        </div>
      </div>
    </>
  );
}

export default UserPage;
