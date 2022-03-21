import { gql } from 'graphql-tag';

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: ID!, $name: String, $description: String, $price: Int) {
    updateProduct(id: $id, data: { name: $name, description: $description, price: $price }) {
      id
      name
      description
      price
    }
  }
`;
