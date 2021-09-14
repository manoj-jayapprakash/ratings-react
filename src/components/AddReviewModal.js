import './AddReviewModal.css';

import { useState, useContext } from 'react';
import { AddStarRatings } from './UI/AddStarRatings';
import { Button } from './UI/Button';
import { DataContext } from './DataContext';

export const AddReviewModal = (props) => {
  const [products, , reviews, setReviews, , , newData, setNewData] =
    useContext(DataContext);
  const [reviewComments, setReviewComments] = useState();
  const [stars, setStars] = useState(0);
  const [error, setError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const totalStars = [5, 4, 3, 2, 1];
  const headers = {
    'Content-Type': 'application/json',
  };

  //Star rating click handler, saves the number of stars given by the user
  const starClickHandler = (e) => {
    setStars(e.target.value);
    setError(false);
  };

  //Saves the user review comments
  const reviewHandler = (e) => {
    setReviewComments(e.target.value);
  };

  //identify the product on which the review is made
  const reviewedProduct = products.filter((product) => {
    return props.product === product.name;
  });

  //Adding the user review to the db
  const postReview = async () => {
    const customerReview = {
      product: reviewedProduct[0].id,
      stars: +stars,
      comments: reviewComments,
    };

    try {
      const response = await fetch(
        'https://mj-product-ratings.herokuapp.com/reviews',
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(customerReview),
        }
      );

      if (response.ok) {
        setSubmitSuccess(true);
        setReviews([...reviews, customerReview]);
      }
    } catch (error) {
      setError(true);
    }
  };

  //Updating the overall rating for the product on which the review is made
  const updateProductOverallRating = async () => {
    //Identify the total stars received so far
    const totalStars = reviews
      .filter((review) => review.product.name === props.product)
      .reduce((acc, r) => acc + r.stars, 0);

    //Identify the total ratings received so far
    const totalRating = reviews.filter(
      (review) => review.product.name === props.product
    ).length;

    //calculate the new overall rating after successful review
    const newOverallRating = (
      (totalStars + +stars) /
      (totalRating + 1)
    ).toFixed(2);

    const updateProductRating = {
      ...reviewedProduct,
      rating: newOverallRating,
    };
    //update the new rating in db
    try {
      const response = await fetch(
        `https://mj-product-ratings.herokuapp.com/products/${reviewedProduct[0].id}`,
        {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(updateProductRating),
        }
      );

      if (response.ok) {
        setSubmitSuccess(true);
        // setProducts([...reviews, customerReview]);
      }
    } catch (error) {
      setError(true);
    }
  };

  //Validates the form and updates the db with the star rating and review comments
  const reviewFormHandler = async (e) => {
    e.preventDefault();
    if (stars === 0) {
      setError(true);
      return;
    }
    postReview();
    updateProductOverallRating();
  };

  const closeModalWindow = () => {
    //closes the modal window
    setNewData(!newData);
    props.modalState(!props.showModal);
  };

  return (
    <div className="modal-bg">
      <div className="add-review-modal">
        {submitSuccess ? (
          <div className="successWindow">
            <p>Thanks for the feedback</p>
            <button onClick={closeModalWindow}>Close</button>
          </div>
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
    </div>
  );
};
