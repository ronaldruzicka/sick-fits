import { SingleProduct } from 'components/products/single-product';
import { useRouter } from 'next/router';

export default function ProductDetail() {
  const { query } = useRouter();

  return typeof query.id === 'string' ? <SingleProduct id={query.id} /> : null;
}
