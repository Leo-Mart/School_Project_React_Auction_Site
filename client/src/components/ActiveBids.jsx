import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from './Shared/Card.jsx';
import UserContext from '../context/UserContext.jsx';

function ActiveAuction() {
  const { user, userActiveBids } = useContext(UserContext);

  if (user.activeBids.length <= 0) {
    return (
      <>
        <h1 className="flex justify-center text-2xl">Inga aktiva bud</h1>
      </>
    );
  } else {
    return (
      <>
        <div className="grid grid-cols-6 gap-4 mt-10 mx-5 min-h-screen">
          {userActiveBids.map((item) => (
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
          ))}
        </div>
      </>
    );
  }
}

export default ActiveAuction;
