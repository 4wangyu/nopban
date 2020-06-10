import React, { useState } from 'react';
import './rating.scss';

function RatingStar(props: {
  ratingRep: number;
  ratingShown: number;
  rate: (r: number) => void;
  setHoverRating: (r: number) => void;
}) {
  const { ratingRep, ratingShown, rate, setHoverRating } = props;

  return (
    <button
      onClick={() => rate(ratingRep)}
      onMouseOver={() => setHoverRating(ratingRep)}
      className={ratingShown >= ratingRep ? 'gold' : ''}
    >
      {ratingShown >= ratingRep ? <>&#9733;</> : <>&#9734;</>}
    </button>
  );
}

function Rating(props: {
  rating: number | undefined;
  rate: (r: number) => void;
}) {
  const { rating, rate } = props;
  const [hoverRating, setHoverRating] = useState<number>(0);
  const ratingShown = hoverRating || rating || 0;

  return (
    <div className="action">
      <label>评价: </label>
      <span onMouseLeave={() => setHoverRating(0)} className="rating">
        <RatingStar
          ratingRep={1}
          ratingShown={ratingShown}
          rate={rate}
          setHoverRating={setHoverRating}
        ></RatingStar>
        <RatingStar
          ratingRep={2}
          ratingShown={ratingShown}
          rate={rate}
          setHoverRating={setHoverRating}
        ></RatingStar>
        <RatingStar
          ratingRep={3}
          ratingShown={ratingShown}
          rate={rate}
          setHoverRating={setHoverRating}
        ></RatingStar>
        <RatingStar
          ratingRep={4}
          ratingShown={ratingShown}
          rate={rate}
          setHoverRating={setHoverRating}
        ></RatingStar>
        <RatingStar
          ratingRep={5}
          ratingShown={ratingShown}
          rate={rate}
          setHoverRating={setHoverRating}
        ></RatingStar>
      </span>

      <span className="remove">
        <button>删除</button>
      </span>
    </div>
  );
}

export default Rating;
