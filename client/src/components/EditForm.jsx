import { useState, useContext, useEffect } from 'react';
import AuctionsContext from '../context/AuctionsContext';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditForm() {
  const { editAuction } = useContext(AuctionsContext);
  const [checked, setChecked] = useState(false);
  const [adInfo, setAdInfo] = useState({
    auctionEndTime: '',
    category: '',
    subcategory: '',
    name: '',
    description: '',
    price: 0,
    expiration: 0,
    image_urls: '',
    bids: 0,
    seller: '',
    buyout_price: 0,
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getAuctionById = async () => {
      const responseFetch = await fetch(`/api/auctions/${params.auctionId}`);
      const data = await responseFetch.json();
      console.log(data);
      setAdInfo({ ...data });
    };
    getAuctionById();
  }, [params.auctionId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdInfo({ ...adInfo, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageUrl = e.target.value;
    setAdInfo({ ...adInfo, image_urls: imageUrl });
  };

  const handleSubmit = (updItem) => {
    editAuction(params.auctionId, adInfo);
    navigate('/userPage', { state: { showActiveAd: true } });
    toast.success('Annonsen har ändrats!');
    console.log('submit the changes');
  };

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };
  return (
    <>
      <div className='min-h-screen flex justify-center'>
        <div className='card w-96 h-90 bg-base-100 shadow-xl mt-1 '>
          <div className='card-body items-center text-center'>
            <h2 className='card-title'>Redigera din annons</h2>
            <label className='form-control w-full max-w-xs'>
              <div className='label'>
                <span className='label-text'>Kategori</span>
              </div>
              <select
                className='select select-bordered'
                name='category'
                value={adInfo.category}
                onChange={handleInputChange}
              >
                <option value='category'>Välj kategori</option>
                <option value='nintendo'>Nintendo</option>
                <option value='playstation'>Playstation</option>
                <option value='xbox'>Xbox</option>
                <option value='commodore'>Commodore</option>
                <option value='atari'>Atari</option>
              </select>
            </label>
            <label className='form-control w-full max-w-xs'>
              <div className='label'>
                <span className='label-text'>Under Kategori</span>
              </div>
              <select
                className='select select-bordered'
                name='subcategory'
                value={adInfo.subcategory}
                onChange={handleInputChange}
              >
                <option value='subcategory'>Välj under kategori</option>
                <option value='konsol'>Konsol</option>
                <option value='kontroll'>Kontroll</option>
                <option value='spel'>Spel</option>
                <option value='paket'>Paket</option>
                <option value='ovrigt'>Övrigt</option>
              </select>
            </label>
            <label className='form-control w-full max-w-xs'>
              <div className='label'>
                <span className='label-text'>Rubrik</span>
              </div>
              <input
                type='text'
                name='name'
                value={adInfo.name}
                onChange={handleInputChange}
                placeholder='Vad vill du sälja?'
                className='input input-bordered w-full max-w-xs'
              />
            </label>
            <label className='form-control w-full max-w-xs'>
              <div className='label'>
                <span className='label-text'>Beskrivning</span>
              </div>
              <input
                type='text'
                name='description'
                value={adInfo.description}
                onChange={handleInputChange}
                placeholder='Berätta gärna om skick'
                className='input input-bordered w-full max-w-xs'
              />
            </label>
            <figure className='form-control w-full max-w-xs'>
              <div className='label'>
                <span className='label-text'>Lägg till bild</span>
              </div>
              <input
                type='url'
                placeholder='URL'
                onChange={handleImageChange}
                className='file-input file-input-bordered file-input-warning w-full max-w-xs'
              />
            </figure>

            <h2 className='card-title'>Annonsdetaljer</h2>

            <label className='form-control w-full max-w-xs'>
              <div className='label'>
                <span className='label-text'>Pris</span>
              </div>
              <input
                type='text'
                name='price'
                value={adInfo.price}
                onChange={handleInputChange}
                placeholder='Ange ett pris som är minst 0kr'
                className='input input-bordered w-full max-w-xs'
              />
            </label>

            <label>
              <div>
                Vill du lägga ett utköpspris?
                <input
                  type='checkbox'
                  checked={checked}
                  onChange={handleCheckboxChange}
                  className='checkbox mx-2'
                />
              </div>
            </label>
            {checked && (
              <label className='form-control w-full max-w-xs'>
                <div className='label'>
                  <span className='label-text'>Utköpspris</span>
                </div>
                <input
                  type='text'
                  name='buyout_price'
                  value={adInfo.buyout_price}
                  onChange={handleInputChange}
                  placeholder='Ange ett pris som är minst 0kr'
                  className='input input-bordered w-full max-w-xs'
                />
              </label>
            )}
            <label className='form-control w-full max-w-xs'>
              <div className='label'>
                <span className='label-text'>Avslutas</span>
              </div>
              <select
                className='select select-bordered'
                name='expiration'
                value={adInfo.expiration}
                onChange={handleInputChange}
              >
                <option>Välj tid</option>

                <option value='1'>1 dagar</option>
                <option value='2'>2 dagar</option>
                <option value='3'>3 dagar</option>
                <option value='4'>4 dagar</option>
                <option value='5'>5 dagar</option>
                <option value='6'>6 dagar</option>
                <option value='7'>7 dagar</option>
              </select>
            </label>

            <button className='btn btn-warning' onClick={handleSubmit}>
              Spara ändringar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditForm;
