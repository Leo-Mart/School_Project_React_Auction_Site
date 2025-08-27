import { useContext } from 'react';
import AuctionsContext from '../context/AuctionsContext';
import AuctionItem from './AuctionItem';
import { Link } from 'react-router-dom';
import Spinner from './Shared/Spinner';

function AuctionList() {
  const { auctions, loading } = useContext(AuctionsContext);
  return loading ? (
    <Spinner />
  ) : (
    <div className='grid grid-cols-6 gap-4 mt-10 mx-5 min-h-screen'>
      {auctions.map((item) => (
        <Link
          to={`/auction/${item._id}`}
          key={item._id}
          className='max-w-80 max-h-80'
        >
          <AuctionItem item={item} />
        </Link>
      ))}
    </div>
  );
}

export default AuctionList;
