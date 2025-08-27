import AuctionList from '../components/AuctionList';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function Home() {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      toast.success('Auktion betalad! Ett mail med kvitto har skickats!');
    }

    if (query.get('canceled')) {
      toast.warning('Betalning avbruten');
    }
  }, []);
  return (
    <>
      <AuctionList />
    </>
  );
}

export default Home;
