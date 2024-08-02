import React from 'react';
import './App.css';
import SearchBox from './components/SearchBox';
import UserDetails from './components/UserDetails';
import OfflineAlert from './components/OfflineAlert';
import { useUserData } from './hooks/useUserData';
import { useOnlineStatus } from './hooks/useOnlineStatus';

function App() {
  const [username, setUsername] = React.useState('');
  const { userData, error, fetchUserData, clearUserData } = useUserData();
  const isOnline = useOnlineStatus(setUsername);

  const handleClear = () => {
    setUsername('');
    clearUserData();
  };

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
