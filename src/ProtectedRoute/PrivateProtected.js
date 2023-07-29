import { Outlet,useLocation,Navigate } from "react-router-dom"
import { auth } from "../firebase"

const PrivateProtected = () => {
    const location=useLocation();

  return auth.currentUser ? (<Outlet/>):(<Navigate to="/login" state={{from:location}} replace/>)
}

export default PrivateProtected