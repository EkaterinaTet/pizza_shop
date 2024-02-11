import { useState, useEffect, useContext } from "react";
import ContentTop from "../components/ContentTop/ContentTop";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { SearchContext } from "../App";
import axios from "axios";

import { setCategoryId, setSortType } from "../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const { searchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sortType);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    axios
      .get(
        `https://65c3f08257a483fcb1432b4f.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType.sortProperty, searchValue]);

  return (
    <>
      <ContentTop
        categoryId={categoryId}
        onClickCategory={(index) => dispatch(setCategoryId(index))}
        sortType={sortType}
        onClickSortType={(i) => dispatch(setSortType(i))}
      />
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items
              .filter((obj) => {
                if (
                  obj.title.toLowerCase().includes(searchValue.toLowerCase())
                ) {
                  return true;
                }
                return false;
              })
              .map((obj) => {
                return (
                  <PizzaBlock
                    key={obj.id}
                    {...obj}
                    // title={obj.title}
                    // price={obj.price}
                    // imageUrl={obj.imageUrl}
                    // sizes={obj.sizes}
                    // types={obj.types}
                  />
                );
              })}
      </div>
    </>
  );
}

export default Home;
