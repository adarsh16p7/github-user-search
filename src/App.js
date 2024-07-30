import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBox from './components/SearchBox';
import UserDetails from './components/UserDetails';
import OfflineAlert from './components/OfflineAlert';
import { checkOnlineStatus } from './utilities/checkOnlineStatus';

function App() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [isOnline, setIsOnline] = useState(true);

  const fetchUserData = async (username) => {
    if (!username) {
      setUserData(null); // Clear user data if username is empty
      setError('');
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.status === 404) {
        throw new Error('User not found');
      }
      if (!response.ok) {
        throw new Error('An error occurred while fetching data');
      }
      const data = await response.json();
      setUserData(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setUserData(null);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const updateOnlineStatus = async () => {
      const online = await checkOnlineStatus();
      if (isMounted) {
        setIsOnline(online);
      }
    };

    updateOnlineStatus(); // Initial check
    const intervalId = setInterval(updateOnlineStatus, 2000); // Check every 2 seconds

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="App">
      <SearchBox onSearch={fetchUserData} />
      {error && <p className="error">{error}</p>}
      <OfflineAlert isOnline={isOnline} />
      {userData && <UserDetails user={userData} isOnline={isOnline} />}
    </div>
  );
}

export default App;
