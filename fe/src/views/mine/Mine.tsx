import React from 'react';
import My from '../../components/My';

const Mine = () => {
  const mystyle: { [key: string]: string } = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    margin: '30px',
  };

  return (
    <div style={mystyle}>
      <My category="book" />
      <My category="movie" />
      <My category="music" />
    </div>
  );
};

export default Mine;
