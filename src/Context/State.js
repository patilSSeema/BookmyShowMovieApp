import Contextobj from "./Context";
import React, { useState } from 'react'

const State = (props) => {
    const [movieTitle,setMovieTitle]=useState("Movie");
   const [noOfTickets, setNoOfTickets] = useState(0);
     const [price, setPrice] = useState(0);
      const [wishlist, setWishlist] = useState([]);
   function SetTitle(title){
        setMovieTitle(title)
    }
     function SetNoMovieTickets(no) {
       setNoOfTickets(no);
     }
      function SetPrice(TicketPrice) {
        setPrice(TicketPrice);
      }
      
  return (
    <Contextobj.Provider
      value={{
        movieTitle,
        SetTitle,
        noOfTickets,
        SetNoMovieTickets,
        price,
        SetPrice,
        wishlist,
        setWishlist
      }}
    >
      {props.children}
    </Contextobj.Provider>
  );
}

export default State