import s from "./ContentTop.module.css";

function Categories({ categoryId, onClickCategory }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className={s.categories}>
      <ul>
        {categories.map((value, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={categoryId === index ? s.active : ""}
            >
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Categories;
