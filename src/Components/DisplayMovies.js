import React from "react";
import "./DisplayMovies.css";
import TransitionsModal from "./TransitionsModal";
const img_300 = "https://image.tmdb.org/t/p/w300";
const DisplayMovies = ({
  id,
  title,
  poster,
  original_language,
  vote_average,
}) => {
  return (
    <TransitionsModal id={id}>
      <div className="media">
        <img className="poster" src={`${img_300}/${poster}`} alt={title} />
        <b className="title">{title}</b>
        <p className="subtitle">
          <span>{original_language}</span>
          <span>{vote_average}</span>
        </p>
      </div>
    </TransitionsModal>
  );
};

export default DisplayMovies;