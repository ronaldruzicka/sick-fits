import { gql } from 'graphql-tag';

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($name: String!, $description: String!, $price: Int!, $image: Upload) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
    }
  }
`;
