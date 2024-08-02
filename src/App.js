import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchBox from './components/SearchBox';
import UserDetails from './components/UserDetails';
import OfflineAlert from './components/OfflineAlert';
import { checkOnlineStatus } from './utilities/checkOnlineStatus';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [isOnline, setIsOnline] = useState(true);

  const fetchUserData = async (username) => {
    if (!username) {
      setUserData(null);
      setError('');
      return;
    }

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('User not found');
      } else {
        setError('An error occurred while fetching data');
      }
      setUserData(null);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const updateOnlineStatus = async () => {
      const online = await checkOnlineStatus();
      if (isMounted) {
        setIsOnline(online);
        if (!online) {
          setUsername('');
          setUserData(null);
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

  const handleClear = () => {
    setUserData(null);
    setUsername('');
    setError('');
  }

  return (
    <div className="App">
      <SearchBox
        username={username}
        setUsername={setUsername}
        onSearch={fetchUserData}
        onClear={handleClear} />
      {error && <p className="error">{error}</p>}
      <OfflineAlert isOnline={isOnline} />
      {userData && <UserDetails user={userData} isOnline={isOnline} />}
    </div>
  );
}

export default App;
