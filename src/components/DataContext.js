import { useState, useEffect, createContext } from 'react';

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [newData, setNewData] = useState(false);
  //Get product details from db
  useEffect(() => {
    // let mounted = true;

    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      // if (mounted)
      // {
      try {
        const response = await fetch(
          `https://mj-product-ratings.herokuapp.com/produucts`
        );
        const data = await response.json();

        setProducts(data);
      } catch (e) {
        setIsError(true);
      }
      setIsLoading(false);
      // }
    };
    fetchData();

    //return () => (mounted = false);
  }, [newData]);

  //Get review details from db
  useEffect(() => {
    // let mounted = true;
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      // if (mounted) {
      try {
        const response = await fetch(
          `https://mj-product-ratings.herokuapp.com/reviews`
        );
        const data = await response.json();
        setReviews(data);
      } catch (e) {
        setIsError(true);
      }
      setIsLoading(false);
      // }
    };
    fetchData();

    // return () => (mounted = false);
  }, [newData]);

  return (
    <DataContext.Provider
      value={[
        products,
        setProducts,
        reviews,
        setReviews,
        isLoading,
        isError,
        newData,
        setNewData,
      ]}
    >
      {props.children}
    </DataContext.Provider>
  );
};
