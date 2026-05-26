import React, { lazy } from 'react'
import { createBrowserRouter, Route, Routes } from 'react-router-dom'
import App from '../App';
import Home from '../pages/public/Home/Home';
import Login from '../components/auth/pages/Login/Login';
import Register from '../components/auth/pages/Register/Register';
import CustomerLayout from '../layouts/CustomerLayout';
import CustomerRoute from './CustomerRoute';
import About from '../pages/public/About/About'
import Contact from '../pages/public/Contact/Contact'
import BookNow from '../pages/customer/Book-now/BookNow';
import MyBookings from '../pages/customer/MyBookings/MyBookings';
import Profile from '../pages/customer/Profile/Profile';
import BookingPage from '../pages/customer/Book-now/BookingPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <CustomerLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/book-now",
                element: (
                    <CustomerRoute>
                        <BookNow/>
                    </CustomerRoute>
                )
            },
            {
                path: "/my-bookings",
                element: (
                    <CustomerRoute>
                        <MyBookings />
                    </CustomerRoute>
                )
            },
            {
                path: "/profile",
                element: (
                    <CustomerRoute>
                        <Profile />
                    </CustomerRoute>
                )
            },
            {
                path: "/booking",
                element: (
                    <CustomerRoute>
                        <BookingPage />
                    </CustomerRoute>
                )
            }
        ]
    },

    // {
    //     path: "/admin",
    //     element: (
    //         <AdminRoute>
    //             <AdminLayout />
    //         </AdminRoute>
    //     ),
    //     children: [
    //         {
    //             path: "dashboard",
    //             element: <Dashboard />
    //         },
    //         {
    //             path: "rooms",
    //             element: <Rooms />
    //         },
    //         {
    //             path: "bookings",
    //             element: <Bookings />
    //         },
    //         {
    //             path: "users",
    //             element: <Users />
    //         }
    //     ]
    // }

]);

export default router