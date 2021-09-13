import './ProductRatings.css';

import { useContext, useState } from 'react';

import { DataContext } from './DataContext';
import { Button } from './UI/Button';
import { CustomerReviews } from './CustomerReviews';

export const ProductRatings = (props) => {
  const [, , reviews] = useContext(DataContext);

  return (
    <section className="ratings">
      <div className="ratings__head">
        <h1 className="product-title">{props.product}</h1>
        <div className="product-rating">
          <p className="total-rating">{props.overallRating}</p>
          <div
            className="stars"
            style={{ '--rating': props.overallRating }}
            aria-label={`Rating of this product is ${props.overallRating} out of 5.`}
          ></div>
          <Button value="Add Rating" />
        </div>
      </div>
      <hr />

      {reviews
        .filter((review) => props.product === review.product.name)
        .map((review) => (
          <CustomerReviews
            key={review.id}
            stars={review.stars}
            comments={review.comments}
          />
        ))}
    </section>
  );
};
