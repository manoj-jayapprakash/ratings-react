import { useContext } from 'react';

import { ProductRatings } from './ProductRatings';
import { DataContext } from './DataContext';

export const AllProductRatings = () => {
  const [products] = useContext(DataContext);
  return (
    <div className="all-ratings">
      {products.map((product) => (
        <ProductRatings
          key={product.id}
          name={product.name}
          rating={product.rating}
        />
      ))}
    </div>
  );
};
