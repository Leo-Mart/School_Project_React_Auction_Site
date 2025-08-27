import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userCreatedAuctions, setUserCreatedAuctions] = useState([]);
  const [userActiveBids, setUserActiveBids] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [userWonAuction, setUserWonAuction] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch('/api/login');

      if (response.status === 200) {
        const result = await response.json();
        fetchcreatedAuctions(result._id);
        setUser(result);
      } else {
        setUser(null);
      }
    };

    getUser();
  }, []);

  const fetchcreatedAuctions = async (id) => {
    // Hämtar användarens skapade, aktiva och favoritmärkerade auktioner och lägger dem i useState.
    const responseAuctions = await fetch(`/api/users/${id}`);
    const auctionData = await responseAuctions.json();
    setUserCreatedAuctions(auctionData.createdAuctions);
    setUserActiveBids(auctionData.activeBids);
    setUserFavorites(auctionData.favoriteAuctions);
    setUserWonAuction(auctionData.wonAuctions);
  };

  const login = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const result = await response.json();

    if (response.status == 201) {
      setUser(result.user);
      fetchcreatedAuctions(result.user._id);
      toast.success(result.message);
    } else if (response.status == 404) {
      toast.error(result.message);
    } else if (response.status == 409) {
      toast.error(result.message);
    }
  };

  const logout = async () => {
    const response = await fetch('/api/login', {
      method: 'delete',
    });
    const result = await response.json();
    console.log(result);
    setUser(null);
    setUserActiveBids([]);
    setUserCreatedAuctions([]);
    setUserFavorites([]);
    toast.success('Utloggad');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userCreatedAuctions,
        userActiveBids,
        userFavorites,
        userWonAuction,
        setUserWonAuction,
        setUserCreatedAuctions,
        setUserActiveBids,
        setUserFavorites,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
