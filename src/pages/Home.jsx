import { useState, useEffect } from "react";
import ContentTop from "../components/ContentTop/ContentTop";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    fetch(
      `https://65c3f08257a483fcb1432b4f.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((response) => response.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <>
      <ContentTop
        categoryId={categoryId}
        onClickCategory={(index) => setCategoryId(index)}
        sortType={sortType}
        onClickSortType={(i) => setSortType(i)}
      />
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((obj) => {
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
