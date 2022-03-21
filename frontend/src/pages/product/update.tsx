import { UpdateProductForm } from 'components/products/update-product-form';
import { useRouter } from 'next/router';

export default function UpdateProduct() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <h1>Update product</h1>
      {typeof id === 'string' && <UpdateProductForm id={id} />}
    </>
  );
}
