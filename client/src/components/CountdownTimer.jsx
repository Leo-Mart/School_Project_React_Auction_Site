import { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext';

function CountdownTimer({ endTime, setExpired }) {
  const [gotTime, setGotTime] = useState(true);
  const { user } = useContext(UserContext);
  const calculateTimeLeft = () => {
    const difference = endTime - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (Object.keys(timeLeft).length <= 0) {
      setGotTime(false);
      setExpired(true);
    }
    if (gotTime) {
      let timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return Object.keys(timeLeft).length === 0 ? (
    <>
      <p>Auktionen har utgått!</p>
    </>
  ) : (
    <span className="countdown font-mono text-xs md:text-base lg:text-lg">
      <span style={{ '--value': timeLeft.days }}></span>:
      <span style={{ '--value': timeLeft.hours }}></span>:
      <span style={{ '--value': timeLeft.minutes }}></span>:
      <span style={{ '--value': timeLeft.seconds }}></span>
    </span>
    // <div className='grid grid-flow-col gap-5 text-center auto-cols-max justify-center'>
    //   <div className='flex flex-col p-2 bg-neutral rounded-box text-neutral-content'>
    //     <span className='countdown font-mono text-4xl'>
    //       <span style={{ '--value': timeLeft.days }}></span>
    //     </span>
    //     days
    //   </div>
    //   <div className='flex flex-col p-2 bg-neutral rounded-box text-neutral-content'>
    //     <span className='countdown font-mono text-4xl'>
    //       <span style={{ '--value': timeLeft.hours }}></span>
    //     </span>
    //     hours
    //   </div>
    //   <div className='flex flex-col p-2 bg-neutral rounded-box text-neutral-content'>
    //     <span className='countdown font-mono text-4xl'>
    //       <span style={{ '--value': timeLeft.minutes }}></span>
    //     </span>
    //     min
    //   </div>
    //   <div className='flex flex-col p-2 bg-neutral rounded-box text-neutral-content'>
    //     <span className='countdown font-mono text-4xl'>
    //       <span style={{ '--value': timeLeft.seconds }}></span>
    //     </span>
    //     sec
    //   </div>
    // </div>
  );
}

export default CountdownTimer;
