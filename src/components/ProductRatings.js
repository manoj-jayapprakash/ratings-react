import './ProductRatings.css';

import { useContext, useState } from 'react';

import { DataContext } from './DataContext';
import { Button } from './UI/Button';
import { Stars } from './UI/Stars';
import { CustomerReviews } from './CustomerReviews';

export const ProductRatings = (props) => {
  const [, , reviews] = useContext(DataContext);

  return (
    <section className="ratings">
      <div className="ratings__head">
        <h1 className="product-title">{props.name}</h1>
        <div className="product-rating">
          <p className="total-rating">{props.rating}</p>
          <Stars rating={props.rating} />
          <Button value="Add Rating" />
        </div>
      </div>
      <hr />
      <div className="ratings__body">
        <h2 className="review-title">Reviews</h2>
        {reviews
          .filter((review) => props.name === review.product.name)
          .map((review) => (
            <CustomerReviews
              key={review.id}
              stars={review.stars}
              comments={review.comments}
            />
          ))}
      </div>
    </section>
  );
};
