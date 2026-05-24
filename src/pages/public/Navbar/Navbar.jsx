import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Navbar.scss"
import { useSelector } from 'react-redux';
import { authActions } from '../../../store/authReducer/authActions';

const Navbar = () => {

  const navigate = useNavigate();

  const { logoutUser } = authActions();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  }

  return (
    <div className='navbar'>
      <div className="left-part">
        <h4>ATLANTA</h4>
      </div>
      <div className="right-part">
        <h4><Link className='menu' to={"/"}>Home</Link></h4>
        <h4><Link className='menu' to={"/book-now"}>Book Now</Link></h4>
        <h4><Link className='menu' to={"/about"}>About Us</Link></h4>
        <h4><Link className='menu' to={"/contact"}>Contact Us</Link></h4>
        {user?.role == "CUSTOMER" ? <h4><Link className='menu' to={"/my-bookings"}>My-Bookings</Link></h4> : ""}
        {user?.role == "CUSTOMER" ? <h4><Link className='menu' to={"/profile"}>Profile</Link></h4> : ""}
        {user ? <button className='btn' onClick={handleLogout} type="button">Logout</button> :
          <button className='btn' onClick={() => navigate("/login")} type="button">Login</button>}
      </div>
    </div>
  )
}

export default Navbar