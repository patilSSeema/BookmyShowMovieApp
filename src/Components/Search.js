import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import "./Search.css";
import axios from "axios";

import { Link } from "react-router-dom";
import DisplayMovies from "./DisplayMovies";
import "./DisplayMovies.css";
const API_KEY = "7f46651666f1ca68e4cf0cb150551f07";
const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [movie, setMovie] = useState([]);

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=${API_KEY}`
      );
      setMovie(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="main-search">
        <Link to="/">
          <div className="back">
            <IoIosArrowBack size={30} color="white" />
          </div>
        </Link>
        <div className="input-style">
          <input
            type="text"
            placeholder="Search Movie"
            autoFocus
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div>
          <button className="searchbtn" onClick={fetchSearch}>
            Search
          </button>
        </div>
        <Link to="/">
          <div className="close">
            <AiOutlineClose size={30} color="gray" />
          </div>
        </Link>
      </div>
      <div className="displayResult">
        {movie?.length ? (
          movie.map((c) => (
            <DisplayMovies
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title}
              vote_average={c.vote_average}
            />
          ))
        ) : (
          <h2 style={{ margin: "60px" }}>No Movies Found</h2>
        )}
      </div>
    </>
  );
};

export default Search;
