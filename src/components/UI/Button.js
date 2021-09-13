import './Button.css';

export const Button = (props) => {
  return <button {...props}>{props.value}</button>;
};
