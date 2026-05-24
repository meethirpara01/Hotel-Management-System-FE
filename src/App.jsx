import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Navbar from './pages/public/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { authActions } from './store/authReducer/authActions.js';

const App = () => {

  const currentUser = useSelector((state) => state.auth.user);

  const { fetchUserData } = authActions();

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <div>
      {/* <Navbar />
      <Outlet /> */}
      {currentUser}
    </div>
  )
}

export default App