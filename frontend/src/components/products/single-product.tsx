import { useQuery } from '@apollo/client';
import { ErrorMessage } from 'components/ErrorMessage';
import { PRODUCT_QUERY } from 'components/products/queries/product.query';
import { ProductQuery, ProductQueryVariables } from 'graphql/types';
import Head from 'next/head';
import styled from 'styled-components';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  gap: 2rem;
  min-width: var(--maxWidth);

  img {
    width: 100%;
    object-fit: contain;
  }
`;

type Props = {
  id: string;
};

export const SingleProduct = ({ id }: Props) => {
  const {
    data = {},
    loading: isLoading,
    error,
  } = useQuery<ProductQuery, ProductQueryVariables>(PRODUCT_QUERY, {
    variables: {
      id,
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { Product } = data;
  const productImageSrc = Product?.photo?.image?.publicUrlTransformed;
  const productAltText = Product?.photo?.altText;

  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {Product?.name}</title>
      </Head>
      {productImageSrc && productAltText && <img src={productImageSrc} alt={productAltText} />}
      <div className="details">
        <h2>{Product?.name}</h2>
        <p>{Product?.description}</p>
      </div>
    </ProductStyles>
  );
};
