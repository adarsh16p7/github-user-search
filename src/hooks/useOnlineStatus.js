import { useState, useEffect } from 'react';
import { checkOnlineStatus } from '../utilities/checkOnlineStatus';

export const useOnlineStatus = (setUsername) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const updateOnlineStatus = async () => {
      const online = await checkOnlineStatus();
      if (isMounted) {
        setIsOnline(online);
        if (!online) {
            setUsername('');
        }
      }
    };

    updateOnlineStatus();
    const intervalId = setInterval(updateOnlineStatus, 2000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return isOnline;
};
