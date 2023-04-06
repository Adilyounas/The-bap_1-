import React, { useState } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    if (keyword.trim()) {
      window.history.pushState("", "", `/products/${keyword}`);
    } else {
      window.history.pushState("", "", `/products`);
    }
    navigate(`/products/${keyword}`);
  };

  return (
    <>
      <form className="searchBox">
        <input
          type="text"
          value={keyword}
          placeholder="Search a Product..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={submitHandler} type="submit">Search</button>
      </form>
    </>
  );
};

export default Search;
