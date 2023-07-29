import React, { useEffect, useState } from "react";
import { getGenre, getMoviesWithGenreId } from "../API/movies";
import DisplayMovies from "./DisplayMovies";
import styles from "./Home.module.css";
import Navbar from "./Navbar";

// import Navbar from "./Components/Navbar";

function Home(props) {
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");

  const fetchAllGenres = () => {
    getGenre().then((res) => {
      if (!res) return;
      setAllGenres(res.genres);
      setSelectedGenres([res.genres[0]]);
    });
  };

  const fetchMovies = (page) => {
    if (selectedGenres.length === 0) return;
    const ids = selectedGenres.map((item) => item.id).join(",");

    getMoviesWithGenreId(ids, page).then((res) => {
      if (!res) return;
      if (page === 1) {
        setMovies(res.results);
      } else {
        setMovies((prev) => [...prev, ...res?.results]);
      }
    });
  };

  const handleGenreClick = (genre) => {
    const tempGenres = [...selectedGenres];
    const currIndex = tempGenres.findIndex((item) => item.id === genre.id);

    if (currIndex < 0) {
      tempGenres.push(genre);
    } else {
      if (selectedGenres.length > 1) tempGenres.splice(currIndex, 1);
    }

    setSelectedGenres(tempGenres);
  };

  useEffect(() => {
    fetchMovies(1);
    // eslint-disable-next-line
  }, [selectedGenres]);

  useEffect(() => {
    fetchAllGenres();
  }, []);

  return (
    <>
      <Navbar name={props.name} />
      <div className={styles.container}>
        <div className={styles.header}>
          {allGenres.map((item) => (
            <div
              key={item.id + item.name}
              className={`${styles.chip} ${
                selectedGenres.find((elem) => elem.id === item.id)
                  ? styles.activeChip
                  : ""
              }`}
              onClick={() => handleGenreClick(item)}
            >
              {item.name}
            </div>
          ))}
        </div>

        <p className={styles.title}>Now Playing</p>
        <div className={styles.body}>
          {movies.map((movie) => (
            <DisplayMovies
              setSelectedMovie={setSelectedMovie}
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              original_language={movie.original_language}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
