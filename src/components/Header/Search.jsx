import { useContext, useRef } from "react";
import s from "./Header.module.css";
import { SearchContext } from "../../App";

function Search() {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  return (
    <div className={s.search}>
      <input
        ref={inputRef}
        onChange={(event) => setSearchValue(event.target.value)}
        value={searchValue}
        className={s.search_input}
        type="text"
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <p
          onClick={() => {
            setSearchValue("");
            inputRef.current.focus();
          }}
        >
          X
        </p>
      )}
    </div>
  );
}
export default Search;
