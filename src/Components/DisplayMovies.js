import React from "react";
import "./DisplayMovies.css";
import TransitionsModal from "./TransitionsModal";
import Booking from "./Booking";
const img_300 = "https://image.tmdb.org/t/p/w300";
const unavailable =
  "https://www.movienewz.com/img/films/poster-holder.jpg";

 const unavailableLandscape =
  "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg";
  
const DisplayMovies = ({
  id,
  title,
  poster,
  original_language,
  vote_average,
}) => {
  return (
    <>
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

      {/* <TransitionsModal id={id}>
        <div className="media">
          <img className="poster" src={`${img_300}/${poster}`} alt={title} />
          <b className="title">{title}</b>
          <p className="subtitle">
            <span>{original_language}</span>
            <span>{vote_average}</span>
          </p>
        </div>
      </TransitionsModal> */}
    </>
  );
};

export default DisplayMovies;
