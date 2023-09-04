import React, { useState, useEffect, useContext } from "react";
import "./Booking.css";
import { movieSeats } from "./MovieSeatData";
import { Link } from "react-router-dom";

import Contextobj from "../Context/Context";
const Booking = () => {
  const GlobalState = useContext(Contextobj);

  const [selectedSeatIds, setSelectedSeatIds] = useState([]);

  const handleSeatClick = (seat) => {
    if (!selectedSeatIds.includes(seat.id) && seat.status === "available") {
      setSelectedSeatIds((prevIds) => [...prevIds, seat.id]);
    }
    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds((prevIds) => prevIds.filter((id) => id !== seat.id));
    } else if (seat.status === "available") {
      setSelectedSeatIds((prevIds) => [...prevIds, seat.id]);
    }
  };
  const handleSubmit = () => {
    const NoSeat = selectedSeatIds.length / 2;
    GlobalState.SetNoMovieTickets(NoSeat);
  };

  return (
    <>
      <h3>Book Tickets</h3>
      <div>
        <div class="movieName">
          <div>
            <span>Movie Name: </span>
            <p>{GlobalState.movieTitle}</p>
          </div>
          <div>
            <span>Date:</span> <input className="input-sty" type="date" />
          </div>
          <div>
            Time:-
            <select>
              <option>11.30pm</option>
              <option>12.00 pm</option>
              <option>1.00 pm</option>
              <option>12 pm</option>
            </select>
          </div>
        </div>
        <center>
          <img className="img-style" src="./screen.png" />
        </center>
        <div class="flex-container">
          {movieSeats.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              <div className="column">
                {row.map((seat) => {
                  if (
                    seat.number.charAt(0) === String.fromCharCode(65 + rowIndex)
                  ) {
                    return (
                      <>
                        <button
                          key={seat.id}
                          className={`seat ${
                            selectedSeatIds.includes(seat.id)
                              ? "selected"
                              : seat.status
                          }`}
                          onClick={() => handleSeatClick(seat)}
                          disabled={seat.status === "booked"}
                        >
                          {seat.number}
                        </button>
                      </>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          ))}
        </div>

        {selectedSeatIds.length > 0 && (
          <center>
            
            <Link to="/checkout">
              <button onClick={handleSubmit} className="submit-button">
                Submit
              </button>
            </Link>
          </center>
        )}
      </div>
    </>
  );
};

export default Booking;
