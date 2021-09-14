import { useContext } from 'react';

import { ProductRatings } from './ProductRatings';
import { DataContext } from './DataContext';

export const AllProductRatings = () => {
  const [products, , , , isLoading, isError] = useContext(DataContext);

  return (
    <div className="all-ratings">
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <>
          {products.map((product) => (
            <ProductRatings
              key={product.id}
              name={product.name}
              rating={product.rating}
            />
          ))}
        </>
      )}
    </div>
  );
};
