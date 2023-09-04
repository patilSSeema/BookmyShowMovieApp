import React from "react";
import Contextobj from "../Context/Context";
import { useContext } from "react";
import TransitionsModal from "./TransitionsModal";
import "./DisplayMovies.css";
const img_300 = "https://image.tmdb.org/t/p/w300/";

const WishlistDisplay = ({ prod }) => {
  const { wishlist, setWishlist } = useContext(Contextobj);
  return (
    <div>
      <TransitionsModal id={prod.id}>
        <div className="media">
          <img
            className="poster"
            src={`${img_300}${prod.poster_path}`}
            alt={prod.title}
          />
          <b className="title">{prod.title}</b>
          <p className="subtitle">
            <span>{prod.original_language}</span>
            <span>{prod.vote_average}</span>
          </p>
        </div>
      </TransitionsModal>
      <button
        onClick={() => setWishlist(wishlist.filter((c) => c.id !== prod.id))}
      >
        Remove Wishlist
      </button>
    </div>
  );
};

export default WishlistDisplay;
