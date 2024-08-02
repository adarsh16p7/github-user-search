import axios from 'axios';

export const checkOnlineStatus = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.status === 200;
  } catch (error) {
    return false; 
  }
};
