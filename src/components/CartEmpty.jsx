import { Link } from "react-router-dom";
import cartEmptyImage from "../assets/img/emptyCart.png";
import s from "../pages/Cart/Cart.module.css";

function CartEmpty() {
  return (
    <div className={`${s.cart} ${s.cart__empty}`}>
      <h2>
        Корзина пустая <i>😕</i>
      </h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={cartEmptyImage} alt="Empty cart" />
      <Link to="/" className={s.button}>
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
}
export default CartEmpty;
