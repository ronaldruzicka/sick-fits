import { gql } from 'graphql-tag';

export const PRODUCT_QUERY = gql`
  query Product($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;
