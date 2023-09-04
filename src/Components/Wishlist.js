import React, { useContext } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Contextobj from "../Context/Context";
import WishlistDisplay from "./WishlistDisplay";
import "./WishList.css";
const Wishlist = () => {
  const { wishlist } = useContext(Contextobj);
  console.log(wishlist);
  return (
    <>
      <div >
        <Link to="/">
          <div className="back">
            <IoIosArrowBack size={30} color="white" />
          </div>
        </Link>
        <h3 style={{color:"blue"}}>WishList</h3>
      </div>

      <div className="wishlist-body">
        {wishlist.map((prod) => (
          <WishlistDisplay prod={prod} key={prod.id} />
        ))}
      </div>
    </>
  );
};

export default Wishlist;
