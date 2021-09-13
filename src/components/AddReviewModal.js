import './AddReviewModal.css';

import { useState, useContext } from 'react';
import { AddStarRatings } from './UI/AddStarRatings';
import { Button } from './UI/Button';
import { DataContext } from './DataContext';

export const AddReviewModal = (props) => {
  const [products, setProducts, , setReviews] = useContext(DataContext);
  const [reviewComments, setReviewComments] = useState();
  const [stars, setStars] = useState(0);
  const [error, setError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const totalStars = [5, 4, 3, 2, 1];
  const headers = {
    'Content-Type': 'application/json',
  };
  const starClickHandler = (e) => {
    setStars(e.target.value);
    setError(false);
  };

  const reviewHandler = (e) => {
    setReviewComments(e.target.value);
  };

  const reviewFormHandler = async (e) => {
    e.preventDefault();
    if (stars === 0) {
      setError(true);
      return;
    }
    let product = props.product === 'Figma' ? 1 : 2;
    const reviews = {
      product: product,
      stars: +stars,
      comments: reviewComments,
    };
    try {
      const response = await fetch('http://localhost:1337/reviews', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(reviews),
      });
      if (response.ok) {
        setSubmitSuccess(true);
        setReviews(reviews);
      }
      const data = await response.json();
      console.log(response);
    } catch (error) {
      setError(true);
    }
    try {
      const response = await fetch('http://localhost:1337/products', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(reviews),
      });
      if (response.ok) {
        setSubmitSuccess(true);
        setReviews(reviews);
      }
      const data = await response.json();
      console.log(response);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="add-review-modal">
      {submitSuccess ? (
        <p>Thanks for your feedback!</p>
      ) : (
        <>
          <h2 className="modal-title">{`What's your rating for ${props.product}?`}</h2>
          <div className="modal-rating">
            <p className="modal-rating-title">Rating</p>
            <div className="modal-rating-stars">
              {totalStars.map((star) => (
                <AddStarRatings
                  key={star}
                  value={star}
                  onClick={starClickHandler}
                />
              ))}
            </div>
          </div>
          <form className="modal-review" onSubmit={reviewFormHandler}>
            <label className="modal-review-label">Review</label>
            <textarea
              className="modal-review-textarea"
              placeholder="Start typing"
              value={reviewComments}
              onChange={reviewHandler}
            />
            <Button type="submit" value="Submit review" className="submit" />
          </form>
          {error ? (
            <p className="error">
              Unable to add review. Please fill the form and try again.
            </p>
          ) : (
            ''
          )}
        </>
      )}
    </div>
  );
};
