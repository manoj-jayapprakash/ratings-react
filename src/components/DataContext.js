import { useState, useEffect, createContext } from 'react';

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:1337/products`);
      const data = await response.json();

      setProducts(data);
    };

    fetchData();
  }, [setProducts]);

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:1337/reviews`);
      const data = await response.json();

      setReviews(data);
    };

    fetchData();
  }, [setReviews]);

  return (
    <DataContext.Provider value={[products, setProducts, reviews, setReviews]}>
      {props.children}
    </DataContext.Provider>
  );
};
