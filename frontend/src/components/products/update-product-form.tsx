import { useMutation, useQuery } from '@apollo/client';
import { ErrorMessage } from 'components/ErrorMessage';
import { PRODUCT_QUERY } from 'components/products/queries/product.query';
import { Form } from 'components/styles/Form';
import {
  ProductQuery,
  ProductQueryVariables,
  UpdateProductMutation,
  UpdateProductMutationVariables,
} from 'graphql/types';
import { useForm } from 'lib/useForm';
import React, { FormEvent } from 'react';

import { UPDATE_PRODUCT_MUTATION } from './mutations/update-product.mutation';

type Props = {
  id: string;
};

export const UpdateProductForm = ({ id }: Props) => {
  const {
    data = {},
    loading: isLoadingProduct,
    error: errorProduct,
  } = useQuery<ProductQuery, ProductQueryVariables>(PRODUCT_QUERY, {
    variables: {
      id,
    },
  });

  const { Product } = data;

  const defaultValues = {
    id,
    name: Product?.name || '',
    price: Product?.price || 0,
    description: Product?.description || '',
  };

  const { values, handleInputChange, clearForm } = useForm(defaultValues);

  const [updateProduct, { loading: isUpdating, error: errorUpdate }] = useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(UPDATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: PRODUCT_QUERY }],
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await updateProduct({
      variables: values,
    });

    clearForm();
  };

  if (isLoadingProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <ErrorMessage error={errorProduct || errorUpdate} />
      <fieldset disabled={isUpdating} aria-busy={isUpdating}>
        <label htmlFor="name">
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={values.name}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Price"
            value={values.price}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <input
            id="description"
            name="description"
            type="textarea"
            placeholder="Description"
            value={values.description}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
};
