import React, { useEffect } from 'react'
import Navbar from '../pages/public/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { authActions } from '../store/authReducer/authActions';
import { bookingActions } from '../store/bookingReducer/bookingActions';

const CustomerLayout = () => {

  const currentUser = useSelector((state) => state.auth.user);

  const { fetchUserData } = authActions();

  useEffect(() => {
    fetchUserData();
  }, []);


  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const { userBookings, loading } = useSelector(state => state.bookings);
  const { myBookings } = bookingActions();

  useEffect(() => {
    myBookings();
  }, []);

  useEffect(() => {
    console.log(userBookings);
  }, [userBookings]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default CustomerLayout