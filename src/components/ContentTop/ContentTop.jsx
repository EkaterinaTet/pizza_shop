import s from "./ContentTop.module.css";
import Categories from "./Categories.jsx";
import Sort from "./Sort.jsx";

function ContentTop(props) {
  return (
    <div className={s.content__top}>
      <Categories
        categoryId={props.categoryId}
        onClickCategory={props.onClickCategory}
      />
      <Sort sortType={props.sortType} onClickSortType={props.onClickSortType} />
    </div>
  );
}
export default ContentTop;
