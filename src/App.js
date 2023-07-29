import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Search from "./Components/Search";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Wishlist from "./Components/Wishlist";
import Register from "./Components/Register";
import Booking from "./Components/Booking";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import PageNotFound from "./PageNotFound";
import PrivateProtected from "./ProtectedRoute/PrivateProtected";
import Profile from "./Components/Profile";
function App() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
        console.log(user.displayName);
      } else {
        setUserName("");
      }
      console.log(user);
    });
  }, []);
  return (
    <div>
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<Home name={userName} />} />
        <Route path="search" element={<Search />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="register" element={<Register />} />

        <Route path="*" element={<PageNotFound />} />
        {/* Private path */}
        <Route element={<PrivateProtected />}>
          <Route path="booking" element={<Booking />} />
        </Route>
        <Route path="wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}

export default App;
