import { useEffect, useState, useContext } from "react";
import Contextobj from "../Context/Context";
import "./Checkout.css";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const GlobalState = useContext(Contextobj);
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      password: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, navigate to the next page
      navigate("/submitcheckout");
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = "Name is required.";
    }
    if (!formData.upi) {
      errors.upi = "UPI Number is required.";
    }
    if (!formData.Edate) {
      errors.Edate = "Expiry Date is required.";
    }
    if (!formData.cardNo) {
      errors.cardNo = "Card Number is required.";
    }
    if (!formData.card) {
      errors.card = "Card holder Name is required.";
    }
    if (!formData.cvv) {
      errors.cvv = "CVV holder Name is required.";
    }
    
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email format.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    // You can use a regular expression or any other validation logic
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  let formFields;

  if (selectedOption === "option1") {
    formFields = (
      <div>
        <input
          type="text"
          placeholder="Card Holder Name:"
          name="card"
          value={formData.card}
          onChange={handleChange}
        />
        {errors.card && <span className="error">{errors.card}</span>}
        <input
          type="text"
          placeholder="Expiry Date"
          name="Edate"
          value={formData.Edate}
          onChange={handleChange}
        />
        {errors.Edate && <span className="error">{errors.Edate}</span>}

        <input
          type="text"
          placeholder="Credit Card Number"
          name="cardNo"
          value={formData.cardNo}
          onChange={handleChange}
        />
        {errors.cardNo && <span className="error">{errors.cardNo}</span>}
        <input
          type="text"
          placeholder="CVV"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
        />
        {errors.cvv && <span className="error">{errors.cvv}</span>}
      </div>
    );
  } else if (selectedOption === "option2") {
    formFields = (
      <div>
        <input
          type="text"
          placeholder="Card Holder Name:"
          name="card"
          value={formData.card}
          onChange={handleChange}
        />
        {errors.card && <span className="error">{errors.card}</span>}
        <input
          type="text"
          placeholder="Expiry Date"
          name="Edate"
          value={formData.Edate}
          onChange={handleChange}
        />
        {errors.Edate && <span className="error">{errors.Edate}</span>}
        <input
          type="text"
          placeholder="Debit Card Number"
          name="cardNo"
          value={formData.cardNo}
          onChange={handleChange}
        />
        {errors.cardNo && <span className="error">{errors.cardNo}</span>}
        <input
          type="text"
          placeholder="CVV"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
        />
        {errors.cvv && <span className="error">{errors.cvv}</span>}
      </div>
    );
  } else if (selectedOption === "option3") {
    formFields = (
      <div>
        <input
          type="text"
          placeholder="UPI Number"
          name="upi"
          value={formData.upi}
          onChange={handleChange}
        />
        {errors.upi && <span className="error">{errors.upi}</span>}
      </div>
    );
  }

  return (
    <>
      <h2>Checkout</h2>
      <div className="MainDiv">
        <div className="Info1">
          <h4>Summary</h4>

          <h5>{GlobalState.movieTitle}</h5>
          <p>Number Of Tickets :-{GlobalState.noOfTickets} </p>
          <p>Classic Ticket :- {GlobalState.price}</p>
          <p>
            Convenience Fee (1.75%) :-
            <span>
              {(GlobalState.price * GlobalState.noOfTickets * 1.75) / 100}
            </span>
          </p>
          <p>
            Sub-Total :-
            {GlobalState.price * GlobalState.noOfTickets +
              (GlobalState.price * GlobalState.noOfTickets * 1.75) / 100}
          </p>
        </div>
        <div className="Info2">
          <h4>Payment</h4>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="user-details">
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                  />
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    value="option1"
                    checked={selectedOption === "option1"}
                    onChange={handleOptionChange}
                    auto
                  />
                  Credit Card
                </label>
                <label>
                  <input
                    type="radio"
                    value="option2"
                    checked={selectedOption === "option2"}
                    onChange={handleOptionChange}
                  />
                  Debit Card
                </label>
                <label>
                  <input
                    type="radio"
                    value="option3"
                    checked={selectedOption === "option3"}
                    onChange={handleOptionChange}
                  />
                 
                  UPI
                </label>
              </div>
              {formFields}
             
            </div>
            <button type="submit">Checkout</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
