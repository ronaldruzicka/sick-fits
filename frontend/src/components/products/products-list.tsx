import { useQuery } from '@apollo/client';
import { Product } from 'components/products/product';
import { ALL_PRODUCTS_QUERY } from 'components/products/queries/all-products.query';
import { AllProductsQuery, AllProductsQueryVariables } from 'graphql/types';
import styled from 'styled-components';

const ProductsListSC = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export const ProductsList = () => {
  const {
    data,
    error,
    loading: isLoading,
  } = useQuery<AllProductsQuery, AllProductsQueryVariables>(ALL_PRODUCTS_QUERY);

  if (isLoading) {
    return <p>Loading producst...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <h2>No products available</h2>;
  }

  const { allProducts } = data;

  return (
    <ProductsListSC>
      {allProducts?.map((product) => (
        <Product key={product?.id} data={product} />
      ))}
    </ProductsListSC>
  );
};
