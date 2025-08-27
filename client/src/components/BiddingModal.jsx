import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuctionsContext from '../context/AuctionsContext';
import { toast } from 'react-toastify';
import UserContext from '../context/UserContext';

function BiddingModal({
  currentBid,
  newBid,
  setNewBid,
  bidAmount,
  setBidAmount,
}) {
  const [input, setInput] = useState('');

  const params = useParams();
  const { updateBid } = useContext(AuctionsContext);
  const { user } = useContext(UserContext);

  const handleClick = async () => {
    if (!user) {
      toast.error('Du måste vara inloggad för att lägga bud');
    } else if (input <= currentBid) {
      toast.error('Du måste lägga ett bud som är högre än nuvarande bud!');
    } else {
      await updateBid(params.auctionId, input);
      setNewBid(input);
      setBidAmount((prevBid) => prevBid + 1);

      toast.success('Du har budat successfully');
    }
  };

  return (
    <>
      <dialog id='bidding-modal' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg flex justify-center py-4'>
            Lägg bud
          </h3>

          <input
            type='text'
            placeholder='0kr'
            className='input input-bordered w-full max-w-xs'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <p className='py-4'>Du är bunden till att köpa varan om du vinner</p>
          <div className='modal-action '>
            <form method='dialog'>
              <button className='btn btn-warning mr-5' onClick={handleClick}>
                Lägg bud
              </button>
              <button className='btn btn-secondary'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default BiddingModal;
