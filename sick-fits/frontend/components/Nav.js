import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => (
  <NavStyles>
    {/* <Link href="/">
      <a>Home</a>
    </Link> */}
    <Link href="/products">
      <a>Products</a>
    </Link>
    <Link href="/sales">
      <a>Sales</a>
    </Link>
    <Link href="/reports">
      <a>Reports</a>
    </Link>
    <Link href="/signup">
      <a>Signup</a>
    </Link>
    <Link href="/account">
      <a>Account</a>
    </Link>
  </NavStyles>
);
export default Nav;
