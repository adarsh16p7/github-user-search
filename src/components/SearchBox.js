import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from '../utilities/debounce';

function SearchBox({ onSearch, onClear }) {
  const [username, setUsername] = useState('');

  const debouncedSearch = useCallback(
    debounce((username) => {
      if (username) {
        onSearch(username);
      }
    }, 2500),
    [onSearch]
  );

  useEffect(() => {
    if (username) {
      debouncedSearch(username);
    } else {
      debouncedSearch.cancel && debouncedSearch.cancel(); // Cancel any pending debounced calls if cancel method exists
      if (onClear && typeof onClear === 'function') {
        onClear();
      }
    }

    // Cleanup the debounce function on component unmount
    return () => {
      debouncedSearch.cancel && debouncedSearch.cancel();
    };
  }, [username]);

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(evt) => setUsername(evt.target.value)}
        placeholder="Enter GitHub username"
      />
    </div>
  );
}

export default SearchBox;
