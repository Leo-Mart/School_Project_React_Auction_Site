import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from './Shared/Card.jsx';
import UserContext from '../context/UserContext.jsx';
import StripePayment from './Shared/StripePayment.jsx';

function WonAuction() {
  const { user, userWonAuction } = useContext(UserContext);

  if (user.wonAuctions.length <= 0) {
    return (
      <>
        <h1 className="flex justify-center text-2xl">
          Du har inte vunnit några auktioner :\
        </h1>
        <p className="flex justify-center">Lägg bud och vinn något...</p>
      </>
    );
  } else {
    return (
      <>
        <div className="grid grid-cols-6 gap-4 mt-10 mx-5">
          {userWonAuction.map((item) => (
            <section
              className="flex flex-col justify-between gap-2"
              key={item._id}
            >
              <Link
                to={`/auction/${item._id}`}
                key={item._id}
                className="max-w-80 max-h-80"
              >
                <Card>
                  <figure>
                    <img src={item.image_urls} />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title truncate">{item.name}</h2>
                    <p className="truncate">{item.description}</p>
                    <p className="truncate">{item.price} kr</p>
                    <span>{item.bids} bud</span>
                    <p className="truncate">{item.end_date}</p>
                  </div>
                </Card>
              </Link>
              <button
                className="btn btn-warning"
                onClick={() => StripePayment(item.name, item.price)}
              >
                Betala
              </button>
            </section>
          ))}
        </div>
      </>
    );
  }
}

export default WonAuction;
