import React, { useState } from "react";
import "./Login.css";

import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const [submitButtonDisable, setSubmitButtonDisable] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      setErr("Please fill all fields");
      return;
    }
    setErr("");
    //console.log(values);
    setSubmitButtonDisable(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        console.log(res);
        setSubmitButtonDisable(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisable(false);
        setErr(err.message);
        console.log("Error-", err.message);
      });
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
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
          disabled={submitButtonDisable}
          onClick={handleSubmit}
          type="submit"
        >
          Login
        </button>
      </form>
      <p style={{ margin: "10px" }}>
        Dont't have account?<Link to="/register">SignUp</Link>
      </p>
    </div>
  );
};

export default Login;
