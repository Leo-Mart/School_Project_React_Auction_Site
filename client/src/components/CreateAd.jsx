import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CreateAd({ onCreateAd }) {
  const [checked, setChecked] = useState(false);
  const [adInfo, setAdInfo] = useState({
    name: '',
    description: '',
    price: 0,
    buyout_price: 0,
    startdate: '',
    expiration: '',
    expired: false,
    category: '',
    subcategory: '',
    image_urls: '',
    bids: 0,
    seller: '',
    auctionEndTime: '',
    sold: false,
    shipping: 0,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdInfo({ ...adInfo, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageUrl = e.target.value;
    setAdInfo({ ...adInfo, image_urls: imageUrl });
  };

  const handleSubmit = () => {
    onCreateAd(adInfo);
  };

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };
  return (
    <>
      <div className="min-h-screen flex justify-center">
        <div className="card w-96 h-90 bg-base-100 shadow-xl ">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Skapa din annons</h2>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Kategori</span>
              </div>
              <select
                className="select select-bordered"
                name="category"
                value={adInfo.category}
                onChange={handleInputChange}
              >
                <option value="category">Välj kategori</option>
                <option value="nintendo">Nintendo</option>
                <option value="commodore">Commodore</option>
                <option value="atari">Atari</option>
                <option value="xbox">Xbox</option>
                <option value="playstation">Playstation</option>
                <option value="ovrigt">Övrigt</option>
              </select>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Under Kategori</span>
              </div>
              <select
                className="select select-bordered"
                name="subcategory"
                value={adInfo.subcategory}
                onChange={handleInputChange}
              >
                <option value="subcategory">Välj under kategori</option>
                <option value="konsol">Konsol</option>
                <option value="kontroll">Kontroll</option>
                <option value="spel">Spel</option>
                <option value="paket">Paket</option>
                <option value="ovrigt">Övrigt</option>
              </select>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Rubrik</span>
              </div>
              <input
                type="text"
                name="name"
                value={adInfo.name}
                onChange={handleInputChange}
                placeholder="Vad vill du sälja?"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Beskrivning</span>
              </div>
              <input
                type="text"
                name="description"
                value={adInfo.description}
                onChange={handleInputChange}
                placeholder="Berätta gärna om skick"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <figure className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Lägg till bild</span>
              </div>
              <input
                type="url"
                placeholder="URL"
                onChange={handleImageChange}
                className="file-input file-input-bordered file-input-warning w-full max-w-xs"
              />
            </figure>

            <h2 className="card-title">Annonsdetaljer</h2>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Pris</span>
              </div>
              <input
                type="text"
                name="price"
                value={adInfo.price}
                onChange={handleInputChange}
                placeholder="Ange ett pris som är minst 0kr"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label>
              <div>
                Vill du lägga ett utköpspris?
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheckboxChange}
                  className="checkbox mx-2"
                />
              </div>
            </label>
            {checked && (
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Utköpspris</span>
                </div>
                <input
                  type="text"
                  name="buyout_price"
                  value={adInfo.buyout_price}
                  onChange={handleInputChange}
                  placeholder="Ange ett pris som är minst 0kr"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            )}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Välj startdatum</span>
              </div>
              <input
                className="input input-bordered"
                type="datetime-local"
                name="startdate"
                value={adInfo.startdate}
                onChange={handleInputChange}
                placeholder={Date.now()}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Avslutas</span>
              </div>
              <select
                className="select select-bordered"
                name="expiration"
                value={adInfo.expiration}
                onChange={handleInputChange}
              >
                <option>Välj tid</option>

                <option value="1">1 dagar</option>
                <option value="2">2 dagar</option>
                <option value="3">3 dagar</option>
                <option value="4">4 dagar</option>
                <option value="5">5 dagar</option>
                <option value="6">6 dagar</option>
                <option value="7">7 dagar</option>
              </select>
            </label>

            <button className="btn btn-warning" onClick={handleSubmit}>
              Skapa annons
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAd;
