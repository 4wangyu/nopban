import React from 'react';

const dictionary: { [key: string]: string } = {
  book: '读',
  movie: '看',
  music: '听',
};

const My = (props: { category: string }) => {
  const { category } = props;

  const mystyle: { [key: string]: string } = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  };

  return (
    <div>
      <div>我{dictionary[category]}</div>
      <div style={mystyle}>
          <div>{dictionary[category]}过</div>
          <div>pic1</div>
          <div>pic2</div>
          <div>pic3</div>
          <div>pic4</div>
          <div>pic5</div>
      </div>
    </div>
  );
};

export default My;
