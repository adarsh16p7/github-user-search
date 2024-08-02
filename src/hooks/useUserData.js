import { useState } from 'react';
import axios from 'axios';

export const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const fetchUserData = async (username) => {
    if (!username) {
      clearUserData();
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

  const clearUserData = () => {
    setUserData(null);
    setError('');
  };

  return {
    userData,
    error,
    fetchUserData,
    clearUserData,
  };
};
