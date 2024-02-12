import { addItem } from "../../redux/slices/cartSlice";
import s from "./PizzaBlock.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const typeName = ["тонкое", "традиционное"];

function PizzaBlock({ id, imageUrl, price, title, sizes, types }) {
  const [activeSize, setActiveSize] = useState(1);
  const [activeType, setActiveType] = useState(0);

  const cartItem = useSelector((state) =>
    state.cart.items.filter((obj) => obj.id === id)
  );
  const addedCount = cartItem.reduce((sum, item) => sum + item.count, 0);

  const dispatch = useDispatch();

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeName[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
  };

  return (
    <div className={s.pizza__block}>
      <img className={s.pizza__block_image} src={imageUrl} alt="Pizza" />
      <h4 className={s.pizza__block_title}>{title}</h4>
      <div className={s.pizza__block_selector}>
        <ul>
          {types.map((type, i) => (
            <li
              onClick={() => setActiveType(i)}
              key={type}
              className={activeType === i ? s.active : ""}
            >
              {typeName[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              onClick={() => setActiveSize(index)}
              key={size}
              className={activeSize === index ? s.active : ""}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className={s.pizza__block_bottom}>
        <div className={s.pizza__block_price}>от {price} ₽</div>
        <button
          onClick={onClickAdd}
          className={`${s.button} ${s.button_outline} ${s.button_add}`}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i className={s.button_num}>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
}
export default PizzaBlock;
