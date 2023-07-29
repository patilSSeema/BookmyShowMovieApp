import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const [submitButtonDisable, setSubmitButtonDisable] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.name || !values.email || !values.password) {
      setErr("Please fill all fields");
      return;
    }
    setErr("");
    //console.log(values);
    setSubmitButtonDisable(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        console.log(res);
        setSubmitButtonDisable(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/login");
      })
      .catch((err) => {
        setSubmitButtonDisable(false);
        setErr(err.message);
        console.log("Error-", err.message);
      });
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(
            event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, password: event.target.value }))
          }
          required
        />
        <b>{err}</b>
        <button
          type="submit"
          disabled={submitButtonDisable}
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>
      <p style={{ margin: "15px" }}>
        Alredy have account?<Link to="/login">Login</Link>{" "}
      </p>
    </div>
  );
};

export default Register;
