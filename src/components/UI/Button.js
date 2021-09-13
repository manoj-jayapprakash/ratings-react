import './Button.css';

export const Button = (props) => {
  return (
    <button type="button" className="add-review">
      {props.value}
    </button>
  );
};
