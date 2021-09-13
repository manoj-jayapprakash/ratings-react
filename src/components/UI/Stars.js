import './Stars.css';

export const Stars = (props) => {
  return (
    <div
      className="stars"
      style={{ '--rating': props.rating }}
      aria-label={`Rating of this product is ${props.rating} out of 5.`}
    ></div>
  );
};
