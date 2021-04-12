import React, { useState } from 'react';
import './rating.scss';

const RATINGS = [1, 2, 3, 4, 5];

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
  deleteRating: () => void;
}) {
  const { rating, rate, deleteRating } = props;
  const [hoverRating, setHoverRating] = useState<number>(0);
  const ratingShown = hoverRating || rating || 0;

  return (
    <div className="action">
      <label>评价: </label>
      <span onMouseLeave={() => setHoverRating(0)} className="rating">
        {RATINGS.map((r: number, idx: number) => (
          <RatingStar
            key={idx}
            ratingRep={r}
            ratingShown={ratingShown}
            rate={rate}
            setHoverRating={setHoverRating}
          ></RatingStar>
        ))}
      </span>

      {rating && (
        <span className="remove">
          <button onClick={deleteRating}>删除</button>
        </span>
      )}
    </div>
  );
}

function MyRating(props: { rating: number }) {
  const { rating } = props;
  return (
    <span>
      {RATINGS.map((r: number, idx: number) => (
        <span
          key={idx}
          className={rating >= r ? 'my-filled-star' : 'my-unfilled-star'}
        >
          &#9733;
        </span>
      ))}
    </span>
  );
}

export { Rating, MyRating };
