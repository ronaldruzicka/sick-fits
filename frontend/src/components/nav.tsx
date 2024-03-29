import { NavStyles } from 'components/styles/NavStyles';
import Link from 'next/link';

export const Nav = () => (
  <NavStyles>
    <Link href="/products">Products</Link>
    <Link href="/sell">Sell</Link>
    <Link href="/orders">Orders</Link>
    <Link href="/account">Account</Link>
  </NavStyles>
);
