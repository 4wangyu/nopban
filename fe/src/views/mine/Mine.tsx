import React from 'react';
import MyRecent from './MyRecent';

const Mine = () => {
  const mystyle: { [key: string]: string } = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    margin: '30px',
  };

  return (
    <div style={mystyle}>
      <MyRecent category="book" />
      <MyRecent category="movie" />
      <MyRecent category="music" />
    </div>
  );
};

export default Mine;
