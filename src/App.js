import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart/Cart";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import React from "react";

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="App">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pizza_shop" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </SearchContext.Provider>
      </div>
    </>
  );
}

export default App;
