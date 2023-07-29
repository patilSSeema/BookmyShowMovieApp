import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";

import { BiRupee } from "react-icons/bi";
import "./DisplayMovies.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "./DisplayMovies.css";
import { Link } from "react-bootstrap-icons";
import Booking from "./Booking";
import { useNavigate } from "react-router-dom";
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
function generateRandomPrice() {
  const randomPrice = Math.floor(Math.random() * 101) + 200; // Random integer between 200 and 300 (inclusive)
  return randomPrice;
}

export default function TransitionsModal({ children, id }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [content, setContent] = useState();
  const randomPrice = generateRandomPrice();
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
          <Box sx={style}>
            <div className="display">
              <div className="sty1">
                {content && content.poster_path && (
                  <img src={`${img_300}/${content.poster_path}`} />
                )}
              </div>
              <div className="sty">
                <h3>{content && content.title}</h3>
                <p>{content && content.original_language}</p>
                {/* <p>{parseInt(content.vote_average)}/10</p> */}
                <p>{content && content.runtime} min</p>
                <p>{content && content.overview}</p>
                <p>
                  <BiRupee />
                  {randomPrice}
                </p>
              </div>
            </div>
            <div className="btnMain">
              {/* {console.log(content && content.title)} */}
                {content && content.title && (
                  <Booking movieTitle={content.title} />
                )}
              <Button
                className="btn btn-info w-40 mb-4"
                onClick={() => navigate("/booking")}
              >
                Book Tickets
              </Button>
              <button className="btn btn-info w-40 mb-4">Wishlist</button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
