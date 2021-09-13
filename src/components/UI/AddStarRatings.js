export const AddStarRatings = (props) => {
  return (
    <>
      <input
        type="radio"
        id={`${props.value}-stars`}
        name="rating"
        value={`${props.value}`}
        {...props}
      />
      <label htmlFor={`${props.value}-stars`} className="star">
        ★
      </label>
    </>
  );
};
