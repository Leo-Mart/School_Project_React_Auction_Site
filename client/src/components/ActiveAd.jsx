import Card from './Shared/Card';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import AuctionsContext from '../context/AuctionsContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import EditForm from './EditForm.jsx';
import Spinner from './Shared/Spinner.jsx';

function ActiveAd({ onDeleteAd }) {
  const { user, userCreatedAuctions } = useContext(UserContext);
  const { loading, setLoading, auctions } = useContext(AuctionsContext);

  const navigate = useNavigate();

  const handleDelete = (id, item) => {
    if (window.confirm('Är du säker du vill ta bort din annons?'))
      onDeleteAd(id, item);
  };

  const handleEditClick = (id) => {
    navigate(`/userPage/edit/${id}`);
  };

  if (loading) {
    return <Spinner />;
  } else if (!userCreatedAuctions.length) {
    return (
      <>
        <h1 className="flex justify-center text-2xl">
          Inga aktiva annonser, gå in i skapa annons för att börja sälja!
        </h1>
      </>
    );
  } else {
    return (
      <>
        <h1 className="flex justify-center text-2xl">Mina aktiva annonser</h1>
        <div className="grid grid-cols-6 gap-4 mt-10 mx-5">
          {userCreatedAuctions.map((item) => (
            <section
              key={item._id}
              className="flex flex-col justify-between gap-2"
            >
              <Card>
                <Link
                  to={`/auction/${item._id}`}
                  className="max-w-80 max-h-auto"
                >
                  <figure className="max-h-28 rounded-t-lg">
                    <img src={item.image_urls} />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title truncate">{item.name}</h2>
                    <p className="truncate">{item.description}</p>
                    <p className="truncate">Nuvarande bud: {item.price} kr</p>
                    <p className="truncate">
                      Utköpspris: {item.buyout_price} kr
                    </p>
                    <span>{item.bids} bud</span>
                    <span>
                      {new Date(item.auctionEndTime).toLocaleString()}
                    </span>
                  </div>
                </Link>
              </Card>
              {item.bids > 0 ? (
                <div
                  className="tooltip cursor-not-allowed"
                  data-tip="Auktion har aktiva bud och kan inte raderas"
                >
                  <button
                    className="btn btn-warning flex btn-disabled w-full"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-warning flex"
                  onClick={() => handleDelete(item._id, item)}
                >
                  Delete
                </button>
              )}
              {item.bids > 0 ? (
                <div
                  className="tooltip cursor-not-allowed"
                  data-tip="Auktion har aktiva bud och kan inte ändras"
                >
                  <button
                    disabled="disabled"
                    className="tooltip cursor-not-allowed btn flex w-full"
                    onClick={() => handleEditClick(item._id)}
                  >
                    Ändra annons
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-info flex"
                  onClick={() => handleEditClick(item._id, item)}
                >
                  Ändra annons
                </button>
              )}
            </section>
          ))}
        </div>
      </>
    );
  }
}

export default ActiveAd;
