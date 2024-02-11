import s from "./Header.module.css";
import logo from "../../assets/img/logo.svg";
import cart from "../../assets/img/cart.svg";
import { Link } from "react-router-dom";
import Search from "./Search";

function Header() {
  return (
    <div className={s.header}>
      <div className={s.container}>
        <Link to="/" className={s.header__logo}>
          <img className={s.header__img} src={logo} alt="logo" />
          <div>
            <h1>Yum pizza</h1>
          </div>
        </Link>
        <Search />
        <div className={s.header__cart}>
          <Link to="/cart" className={`${s.button} ${s.button_cart}`}>
            <span className={s.button_cart_sum}>520 ₽</span>
            <div className={s.button__delimiter}></div>
            <img className={s.header__cart} src={cart} alt="cart" />
            <span className={s.button_cart_num}>3</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
