import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Contextobj from "../Context/Context";
import { BiRupee } from "react-icons/bi";
import "./DisplayMovies.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./DisplayMovies.css";
import { Link } from "react-router-dom";
const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";

const unavailableLandscape =
  "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg";

const API_KEY = "7f46651666f1ca68e4cf0cb150551f07";
const img_300 = "https://image.tmdb.org/t/p/w200";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const responsiveStyle = {
  width: "70%",
};
function generateRandomPrice() {
  const randomPrice = Math.floor(Math.random() * 101) + 200; // Random integer between 200 and 300 (inclusive)
  return randomPrice;
}

export default function TransitionsModal({ children, id }) {
  const GlobalState = useContext(Contextobj);
  const [content, setContent] = useState();
  const randomPrice = generateRandomPrice();
  const [open, setOpen] = useState(false);
  const { wishlist, setWishlist } = useContext(Contextobj);

  const handleOpen = () => {
    setOpen(true);
    GlobalState.SetTitle(content.title);
    GlobalState.SetPrice(randomPrice);
  };
  const handleClose = () => setOpen(false);

  const handleAddToWishlist = () => {
    setWishlist([...wishlist, content]);
  };

  const isMovieInWishlist = wishlist.some((item) => item.id === content?.id);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      setContent(data);
      // console.log(data); Log the data to check if poster_path exists in it
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <div>
        <Button onClick={handleOpen} className="media">
          {children}
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={{ ...style, ...responsiveStyle }}>
              <div className="display">
                <div>
                  {content && content.poster_path && (
                    <img
                      className="ContentModal__portrait"
                      src={`${img_300}/${content.poster_path}`}
                    />
                  )}
                  {content && content.backdrop_path && (
                    <img
                      className="ContentModal__landscape"
                      src={`${img_300}/${content.backdrop_path}`}
                    />
                  )}
                </div>

                <div className="details">
                  <b>{content && content.title}</b>
                  <p>{content && content.original_language}</p>
                  <p>{content && content.runtime} min</p>
                  <p className="overview">{content && content.overview}</p>
                  <p>
                    <BiRupee />
                    {randomPrice}
                  </p>
                </div>
              </div>
              {/* <p>{parseInt(content.vote_average)}/10</p> */}
              <div className="btnMain">
                <Link to="/booking">
                  <button className="btn btn-info w-40 mb-4">
                    Book Tickets
                  </button>
                </Link>

                <button
                  disabled={isMovieInWishlist}
                  onClick={handleAddToWishlist}
                  className="btn btn-info w-40 mb-4"
                >
                  {isMovieInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
