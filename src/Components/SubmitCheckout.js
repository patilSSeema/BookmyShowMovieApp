import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Checkout.css";
function SubmitCheckout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time with a setTimeout
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <div className="submitsCSS">
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <div>
          <h4>Ticket booked sucessfully</h4>
          <Link to="/" className="linkc">
            <div>click here to continue...</div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default SubmitCheckout;
