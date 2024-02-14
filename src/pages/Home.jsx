import { useEffect, useContext, useRef } from "react";
import ContentTop from "../components/ContentTop/ContentTop";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { SearchContext } from "../App";

import qs from "qs";
import { useNavigate } from "react-router-dom";
import { sortList } from "../components/ContentTop/Sort";

import {
  setCategoryId,
  setSortType,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const { searchValue } = useContext(SearchContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // const [items, setItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sortType);
  const { items, status } = useSelector((state) => state.pizza);

  const getPizzas = async () => {
    // setIsLoading(true);

    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        category,
        order,
      })
    );
  };

  useEffect(() => {
    // window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, searchValue]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, navigate]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sortType = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sortType,
        })
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <>
      <ContentTop
        categoryId={categoryId}
        onClickCategory={(index) => dispatch(setCategoryId(index))}
        sortType={sortType}
        onClickSortType={(i) => dispatch(setSortType(i))}
      />
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div>
          <h2>Произошла ошибка</h2>
          <p>Не удалось получить пиццы, попробуйте позже</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? skeletons
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
      )}
    </>
  );
}

export default Home;
