import { useState, useEffect } from 'react';

const PaymentStatus = () => {
  const [message, setMessage] = useState('');

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setMessage('Auktion betalad! Ett mail med kvitto har skickats!');
    }

    if (query.get('canceled')) {
      setMessage('Betalning avbruten');
    }
  }, []);
  return <Message message={message} />;
};
export default PaymentStatus;
