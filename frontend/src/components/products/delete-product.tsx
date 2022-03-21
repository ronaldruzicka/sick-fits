import { useMutation } from '@apollo/client';
import { DeleteProductMutation, DeleteProductMutationVariables } from 'graphql/types';
import { ReactNode } from 'react';

import { DELETE_PRODUCT_MUTATION } from './mutations/delete-product.mutation';

type Props = {
  children: ReactNode;
  id: string;
};

export const DeleteProduct = ({ id, children }: Props) => {
  const [deleteProduct, { loading: isDeleting }] = useMutation<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update: (cache, result) => {
      if (result.data?.deleteProduct) {
        cache.evict({ id: cache.identify(result.data.deleteProduct) });
      }
    },
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteProduct();
    }
  };

  return (
    <button disabled={isDeleting} onClick={handleDelete} type="button">
      {children}
    </button>
  );
};
