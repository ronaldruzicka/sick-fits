import { useMutation } from '@apollo/client';
import { ErrorMessage } from 'components/ErrorMessage';
import { CREATE_PRODUCT_MUTATION } from 'components/products/mutations/create-product.mutation';
import { ALL_PRODUCTS_QUERY } from 'components/products/queries/all-products.query';
import { Form } from 'components/styles/Form';
import { CreateProductMutation, CreateProductMutationVariables } from 'graphql/types';
import { useForm } from 'lib/useForm';
import { useRouter } from 'next/router';
import React, { FormEvent } from 'react';

export const ProductForm = () => {
  const router = useRouter();
  const defaultValues = {
    description: '',
    image: '',
    name: '',
    price: 0,
  };

  const { values, handleInputChange, clearForm } = useForm(defaultValues);

  const [createProduct, { loading: isLoading, error }] = useMutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >(CREATE_PRODUCT_MUTATION, {
    variables: values,
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await createProduct();

    clearForm();

    router.push(`/product/${response.data?.createProduct?.id}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ErrorMessage error={error} />
      <fieldset disabled={isLoading} aria-busy={isLoading}>
        <label htmlFor="image">
          Image
          <input id="image" name="image" type="file" onChange={handleInputChange} />
        </label>
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

        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
};
