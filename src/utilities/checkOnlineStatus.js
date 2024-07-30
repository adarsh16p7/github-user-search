export const checkOnlineStatus = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            });
      return response.ok;
    } catch (error) {
      return false; 
    }
  };  