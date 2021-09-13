import './CustomerReviews.css';

import { Stars } from './UI/Stars';

export const CustomerReviews = (props) => {
  return (
    <div className="all-reviews">
      <div className="review-item">
        <Stars rating={props.stars} />
        <p className="rating-comment">
          <span class="review-item-rating">{props.stars}</span>,{' '}
          {props.comments}
        </p>
      </div>
    </div>
  );
};
