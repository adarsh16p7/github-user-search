import React, { useEffect, useCallback } from 'react';
import { debounce } from '../utilities/debounce';

function SearchBox({ username, setUsername, onSearch, onClear }) {
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
      if (debouncedSearch.cancel) {
        debouncedSearch.cancel(); // Cancel any pending debounced calls if cancel method exists
      }
      if (onClear) {
        onClear(); // Call the onClear callback to clear user data
      }
    }

    // Cleanup the debounce function on component unmount
    return () => {
      if (debouncedSearch.cancel) {
        debouncedSearch.cancel();
      }
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
