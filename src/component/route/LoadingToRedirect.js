import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const LoadingToRedirect = () => {
  const history = useHistory();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    //redirect once count == 0
    count === 0 && history.push('/login');

    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className='container p-5 text-center'>
      <p>
        You are not authorized to this route. Redirecting you in {count} seconds{' '}
      </p>
    </div>
  );
};

export default LoadingToRedirect;
