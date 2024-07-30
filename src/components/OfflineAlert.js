import React from 'react';

function OfflineAlert({ isOnline }) {
  if (isOnline) {
    return null;
  }

  return (
    <div className='error'>
      You are currently offline. Please check your internet connection.
    </div>
  );
}

export default OfflineAlert;
