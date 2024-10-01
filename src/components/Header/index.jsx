import styles from "./styles.module.css";
import logoIcon from "../../assets/icons/logo.svg";
import cartIcon from "../../assets/icons/cart.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <header>
      <div className={styles.headerContainer}>
        <Link to="/">
          <img src={logoIcon} alt="Logo" />
        </Link>
        <nav className={styles.navContainer}>
          <ul>
            <li>
              <Link to="/" className={styles.navLink}>
                Main Page
              </Link>
            </li>
            <li>
              <Link to="/categories" className={styles.navLink}>
                Categories
              </Link>
            </li>
            <li>
              <Link to="/products" className={styles.navLink}>
                All products
              </Link>
            </li>
            <li>
              <Link to="/discounted-products" className={styles.navLink}>
                All sales
              </Link>
            </li>
          </ul>
        </nav>
        <Link to="/cart" className={styles.cartLink}>
          <img src={cartIcon} alt="Cart" />
          {cartItemsCount > 0 && (
            <span className={styles.cartBadge}>{cartItemsCount}</span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
