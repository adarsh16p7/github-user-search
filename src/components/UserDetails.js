import React, { useEffect, useState } from 'react';

function UserDetails({ user, isOnline }) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchRepos = async () => {
      if (!user || !isOnline) {
        return;
      }

      try {
        const response = await fetch(user.repos_url);
        const data = await response.json();
        if (isMounted) {
          setRepos(data);
        }
      } catch (err) {
        console.error('Failed to fetch repositories', err);
      }
    };

    fetchRepos();

    return () => {
      isMounted = false;
    };
  }, [user, isOnline]);

  if (!isOnline) {
    return (
      <div className='error'>
        You are currently offline. Please check your internet connection.
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="user-details">
      <img src={user.avatar_url} alt={user.login} width={100} />
      <h2>{user.login}</h2>
      <h3>Repositories:</h3>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserDetails;
