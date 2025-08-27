import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPending, setIsPending] = useState(false); // Denna useState kollar om man aktiv håller på med att skapa en användare, låter sidan "tänka" först

  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    console.log(email);

    if (password === confirmPassword) {
      const user = {
        email,
        password,
        firstname,
        lastname,
        createdAuctions: [],
        favoriteAuctions: [],
        wonAuctions: [],
        activeBids: [],
      };

      setIsPending(true);

      const response = await fetch('api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      let result = await response.json();

      if (response.status == 409) {
        toast.error(result.message);
        setIsPending(false);
      } else if (response.status == 201) {
        toast.success('Konto skapad!');
        setIsPending(false);
        navigate('/');
        document.getElementById('my_modal_1').showModal();
      }
    } else if (password !== confirmPassword) {
      toast.error('Lösenorden matchar inte!');
      setIsPending(false);
    }
  };

  return (
    <>
      <div className='min-h-screen'>
        <div className=' flex align-center bg-secondary pl-4 py-5 w-96 mx-auto rounded mt-10 '>
          <form onSubmit={handleSubmit} className='my-5'>
            <span className='text-black'>E-post address</span>
            <label className='input input-bordered flex items-center gap-2 bg-white my-4 w-80'>
              <input
                type='text'
                name='email'
                className='grow text-black'
                placeholder='E-post address'
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                } /* Varje gång denna inputen ändras, så uppdateras email-valuen i useState */
                required
              />
            </label>
            <span className='text-black'>Förnamn</span>
            <label className='input input-bordered flex items-center gap-2 bg-white my-4 w-80'>
              <input
                type='text'
                name='name'
                className='grow text-black'
                placeholder='Förnamn'
                value={firstname}
                required
                onChange={(e) =>
                  setFirstName(e.target.value)
                } /* Varje gång denna inputen ändras, så uppdateras name-valuen i useState */
              />
            </label>
            <span className='text-black'>Efternamn</span>
            <label className='input input-bordered flex items-center gap-2 bg-white my-4 w-80'>
              <input
                type='text'
                name='name'
                className='grow text-black'
                placeholder='Efternamn'
                value={lastname}
                required
                onChange={(e) =>
                  setLastName(e.target.value)
                } /* Varje gång denna inputen ändras, så uppdateras name-valuen i useState */
              />
            </label>
            <span className='text-black'>Lösenord</span>
            <label className='input input-bordered flex items-center gap-2 bg-white my-4 w-80'>
              <input
                type='password'
                name='password'
                className='grow text-black'
                placeholder='Lösenord'
                value={password}
                required
                onChange={(e) =>
                  setPassword(e.target.value)
                } /* Varje gång denna inputen ändras, så uppdateras password-valuen i useState */
              />
            </label>
            <span className='text-black'>Bekräfta lösenord</span>
            <label className='input input-bordered flex items-center gap-2 bg-white my-4 w-80'>
              <input
                type='password'
                name='password'
                className='grow text-black'
                placeholder='Bekräfta lösenord'
                value={confirmPassword}
                required
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                } /* Varje gång denna inputen ändras, så uppdateras password-valuen i useState */
              />
            </label>
            {!isPending && (
              <button className='rounded bg-primary text-black p-3 mb-8'>
                Skapa konto
              </button>
            )}{' '}
            {/* När man kan skapa ett konto så dyker denna knappen upp */}
            {isPending && (
              <button
                disabled
                className='rounded bg-primary text-black p-3 mb-8'
              >
                Lägger till användare...
              </button>
            )}
            {/* När man håller på att skapa en användare, så byts Skapa konto-knappen ut mot en disabled button */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
